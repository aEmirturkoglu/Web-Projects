import requests
from bs4 import BeautifulSoup
import json
import os
from dotenv import load_dotenv
import random

load_dotenv()

# --- Configuration ---
GOOGLE_AI_STUDIO_API_KEY = os.getenv("GOOGLE_AI_STUDIO_API_KEY")

if not GOOGLE_AI_STUDIO_API_KEY:
    print("Error: GOOGLE_AI_STUDIO_API_KEY not found in .env file.")
    exit()

# --- Scraping Functions ---
import time

def scrape_amazon_reviews(product_url):
    print(f"Scraping Amazon reviews from: {product_url}")
    try:
        user_agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 14.4; rv:123.0) Gecko/20100101 Firefox/123.0',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        ]
        headers = {
            'User-Agent': random.choice(user_agents),
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': 'https://www.amazon.com.tr/',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Cache-Control': 'max-age=0',
        }
        response = requests.get(product_url, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        # Amazon's HTML structure
        review_containers = soup.find_all('div', attrs={'data-hook': 'review-collapsed'})
        reviews = []
        for container in review_containers:
            review_element = container.find('div', attrs={'class': 'a-row', 'data-hook': 'review-body'})
            if review_element:
                reviews.append(review_element.get_text(strip=True))
        if len(reviews) > 24:
            reviews = random.sample(reviews, 24)
        time.sleep(2)  # Increased delay to 2 seconds
        return reviews
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        return []
    except AttributeError as e:
        print(f"Attribute error: {e}")
        return []

# --- Summarization Function ---
def summarize_reviews_google_ai(reviews):
    if not reviews:
        return "No reviews to summarize."

    prompt_text = "Please summarize the following user reviews in two sentences or less:\\n\\n" + "\\n".join(reviews)

    # Replace with actual Google AI Studio API call
    try:
        response = requests.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent",
            headers={"Content-Type": "application/json"},
            params={"key": GOOGLE_AI_STUDIO_API_KEY},
            json={
                "contents": [{"parts": [{"text": prompt_text}]}],
                "generationConfig": {
                    "temperature": 0.7,
                    "maxOutputTokens": 100
                }
            }
        )
        response.raise_for_status()
        try:
            summary = response.json()["candidates"][0]["content"]["parts"][0]["text"]
        except (KeyError, IndexError):
            print(f"Unexpected JSON structure: {response.text}")
            return "Could not summarize reviews due to unexpected JSON structure."
        return summary
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        return "Could not summarize reviews due to a request error."
    except json.JSONDecodeError as e:
        print(f"JSONDecodeError: {e}. Response text: {response.text}")
        return "Could not summarize reviews due to a JSON decode error."

# --- Main Function ---
def main():
    product_urls = {
        "amazon": {
            "samsung-galaxy-s24-ultra": "https://www.amazon.com.tr/Samsung-Telefonu-Titanyum-T%C3%BCrkiye-Garantili/dp/B0CR6S7BRM/ref=sr_1_3?__mk_tr_TR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&sr=8-3",
            "apple-iphone-16-pro-max": "https://www.amazon.com.tr/Apple-iPhone-16-Pro-Max/dp/B0DGJQCLCR/ref=sr_1_5?__mk_tr_TR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&sr=8-5"
        }
    }

    all_reviews = {}

    for website, urls in product_urls.items():
        if website == "amazon":
            for name, url in urls.items():
                reviews = scrape_amazon_reviews(url)
                all_reviews[name] = reviews

    for name, reviews in all_reviews.items():
        if reviews:
            print(f"Reviews for {name}:")
            for review in reviews:
                print(f"- {review}")
            summary = summarize_reviews_google_ai(reviews)
            print(f"Summary for {name}: {summary}")
        else:
            print(f"No reviews found for {name}")

if __name__ == "__main__":
    main()
