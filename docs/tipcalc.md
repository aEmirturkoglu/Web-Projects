# Tip Calculator Documentation

## Overview

The Tip Calculator is a web application designed to help you easily calculate the tip amount and the total bill when dining out, or for any service where tipping is customary. It allows you to enter the bill amount and choose a tip percentage to calculate these values.

## How to Use

1.  **Open the Application:** Navigate to the `tipcalc` folder in the repository. Open the `index.html` file in your web browser.

2.  **Enter Bill Amount:** On the webpage, you will see an input field labeled "Bill Amount". Enter the total amount of your bill in this field. You can use the number keys on your keyboard or the on-screen number buttons if provided.

3.  **Select Tip Percentage:** Choose a tip percentage. You might see predefined percentage buttons (e.g., 10%, 15%, 20%) or a slider to select a custom percentage. Click on a percentage button or adjust the slider to your desired tip amount.

4.  **View Calculated Tip and Total:** The application will automatically calculate and display:
    *   **Tip Amount:** The exact amount of the tip based on the bill and selected percentage.
    *   **Total Amount:** The sum of the bill amount and the calculated tip amount.

5.  **Adjust and Recalculate:** You can change the bill amount or the tip percentage at any time. The tip amount and total amount will automatically update to reflect your changes.

## Diagram

```mermaid
graph LR
    A[Open index.html in Browser] --> B(Enter Bill Amount in Input Field);
    B --> C(Select Tip Percentage (e.g., 10%, 15%, 20% or custom));
    C --> D{Calculation Automatically Triggered};
    D --> E[View Calculated Tip Amount and Total Bill Amount];
    E --> B{Adjust Bill or Tip % to Recalculate};
```

This diagram illustrates how to use the Tip Calculator. Open `index.html`, enter the bill amount, select a tip percentage, and the application will display the calculated tip and total. You can easily adjust the inputs to recalculate.
