# Rock Paper Scissors Remake Documentation

## Overview

This is a web-based remake of the classic game Rock Paper Scissors. You can play against the computer and see who wins each round. It's a simple and fun game to play in your browser.

## How to Use

1.  **Open the Application:** Navigate to the `RPS-Remake` folder in the repository. Open the `index.html` file in your web browser.

2.  **Make Your Choice:** On the webpage, you will see images representing "Rock", "Paper", and "Scissors". Click on the image that represents your choice for the round.

3.  **Computer's Turn:** After you make your choice, the computer will randomly choose "Rock", "Paper", or "Scissors".

4.  **View the Result:** The application will display both your choice and the computer's choice. It will then determine the winner of the round based on the rules of Rock Paper Scissors (Rock beats Scissors, Scissors beats Paper, Paper beats Rock) and display the result (You Win, Computer Wins, or Tie).

5.  **Play Again:** To play another round, simply make your choice again by clicking on "Rock", "Paper", or "Scissors". You can play as many rounds as you like.

## Diagram

```mermaid
graph LR
    A[Open index.html in Browser] --> B(Click on "Rock", "Paper", or "Scissors" Image (Your Choice));
    B --> C{Computer Randomly Chooses Rock, Paper, or Scissors};
    C --> D[Display Your Choice and Computer's Choice];
    D --> E{Determine Round Winner based on RPS Rules};
    E --> F[Display Round Result (Win, Lose, or Tie)];
    F --> B{Choose Again to Play Another Round};
```

This diagram shows the game flow. Open `index.html`, choose Rock, Paper, or Scissors, and the computer will make its choice. The result of the round is then displayed, and you can play again by making another choice.
