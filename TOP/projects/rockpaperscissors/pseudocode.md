# HTML

> Have a title with the description of the game and who made it
> Have a button that says "Play" and becomes restart once you've played at least one time

# CSS

> Background color probably baby blue
> Text and buttons are centered
> Font probably typewriter or something cool and vintage

# JS 

## Game must have two players, one will be the computer, the other is a human
> Create a new funtion called `getPlayerChoice()`
  > Use `prompt()`
  > Valid inputs are "rock", "paper", "scissors"
  > Values must not be case-sensitive
  > Invalid values will force the user to retry the prompt
  >> Must show an alert that hints the correct words

## Must write a function that randomly returns string values: "rock", "paper", "scissors"
> Create a new function called `getComputerChoice()`
  > Use `Math.random()`
    > This gives us a random number between 0(inclusive) and 1(non-inclusive)
    > Assign these odds to the aforementioned strings, equally distributed
    >> There might be a bias with `Math.random()` never hitting 1, so i have to think how to solve that 
> Return a string of randomly selected "rock", "paper", "scissors"

## Keep a track of player's score
> Initialize the variables for computer and user scores

## Game must have a max of 5 rounds before ending 
> Create a new function `playGame()`
  > Called when pressed the `Play!` button
  > Create a new function `playRound()`

## Whoever wins the most rounds(at least 3) wins the game 
> Display a message saying that either you won the game or lost it
