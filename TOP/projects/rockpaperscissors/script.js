// Initialize the variables for computer, user scores and some other
let playerScore;
let computerScore;
let roundWinner;
let visible = false;

// Add menu and a button to the DOM
const menuContainer = document.body.appendChild(document.createElement("div"))
      menuContainer.setAttribute("class", "menu-container");
const playBtn = menuContainer.appendChild(document.createElement("button"));
      playBtn.setAttribute("class", "playButton")
      playBtn.textContent = "Play!";
// Another div that contains the rest of the buttons
const gameContainer = menuContainer.appendChild(document.createElement("div"));
      gameContainer.setAttribute("class", "gameDiv");
const rockBtn = gameContainer.appendChild(document.createElement("button"));
      rockBtn.setAttribute("class", "rockButton");
      rockBtn.textContent = "Rock";
const paperBtn = gameContainer.appendChild(document.createElement("button"));
      paperBtn.setAttribute("class", "paperButton");
      paperBtn.textContent = "Paper";
const scissorsBtn = gameContainer.appendChild(document.createElement("button"));
      scissorsBtn.setAttribute("class", "scissorsButton");
      scissorsBtn.textContent = "Scissors";

const scorePara = document.querySelector("#score");

playBtn.addEventListener("click", () => { playGame() });

// A naive function to toggle the rock, paper and scissor buttons as well as the play button
function toggleElementDisplay() {
    if( visible === false ) {
        playBtn.style.visibility = "hidden";
        gameContainer.style.visibility = "visible"; 
        visible = true;
    } else {
        playBtn.style.visibility = "visible";
        gameContainer.style.visibility = "hidden";
        visible = false;
    }
};

// Lets listen to a click in the div block
gameContainer.addEventListener("click", (event) => {
    let button = event.target;
    let buttonClass = button.classList.value;

    switch (buttonClass) {
        case "rockButton": 
            playerChoice = "rock";
            return playRound(playerChoice);
        case "paperButton":
            playerChoice = "paper";
            return playRound(playerChoice);
        case "scissorsButton":
            playerChoice = "scissors";
            return playRound(playerChoice);
        default: 
            break;
    }
});

// A function to get a randomized string 
function getComputerChoice() { 
    let rand = Math.floor(Math.random() * 3);
    let str = rand < 1 ? "rock" : rand < 2 ? "paper" : "scissors";

    return str;
};

// Lets have a round!
function playRound(playerChoice) {
    const computerChoice = getComputerChoice();

    roundWinner = (playerChoice === "rock" && computerChoice === "scissors") ? "Player" :
                    (playerChoice === "rock" && computerChoice === "paper") ? "Computer" :
                    (playerChoice === "paper" && computerChoice === "rock") ? "Player" :
                    (playerChoice === "paper" && computerChoice === "scissors") ? "Computer" :
                    (playerChoice === "scissors" && computerChoice === "paper") ? "Player" : 
                    (playerChoice === "scissors" && computerChoice === "rock") ? "Computer" : "Tie";

    switch(roundWinner) {
        case "Player":
            scorePara.textContent = `You won! ${playerChoice} beats ${computerChoice}.`;
            playerScore += 1;
            break;
        case "Computer":
            scorePara.textContent = `You lose! ${computerChoice} beats ${playerChoice}.`;
            computerScore += 1;
            break;
        case "Tie":
            scorePara.textContent = `You were on a tie. Must try again!`;
            break;
    }

    // Once either the player or computer scores 5, the game ends
    if( Math.max(playerScore, computerScore) >= 5 ) {
        toggleElementDisplay();
        playBtn.textContent = "Try again!";

        let msg = playerScore > computerScore ? "You won the game! " : "You lost the game! ";
        scorePara.textContent = msg + `You scored ${playerScore} vs ${computerScore}.`;
    }

    return roundWinner;
};

// Lets play a game!
function playGame() {
    // Reset the scores 
    playerScore = 0;
    computerScore = 0;

    toggleElementDisplay();

    scorePara.textContent = "Choose either rock, paper or scissors";
    return ;
};
