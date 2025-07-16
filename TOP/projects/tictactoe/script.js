function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    // Create a 2d array, populating each row and column with a cell we create
    function populateBoard() {
        for(let i = 0; i < rows; i++) {
            board[i] = [];
            for(let j = 0; j < columns; j++) {
                board[i].push(cell());
            };
        };
    };populateBoard();

    // A method to get the status of the board
    const getBoard = () => board;
    // A method to reset the board
    const resetBoard = () => {
        board.forEach(e => board.pop(e));
        populateBoard();
    };
    // A method to fill our cells
    const fillCell = (row, column, player) => {
        
        const reason = {
            outOfBounds : false, 
            notAvailable : false, 
            alreadyFilled : false,
        };
        // Look for all the cells that are not filled yet(or are nullish)
        const availableCells = board
            .filter(r => r.some(cell => cell.getValue() === null))
            .map(r => r.filter(cell => cell.getValue() === null));
        // Check if the row or column is within bounds
        if(row >= rows || column >= columns) {
            reason.outOfBounds = true;
            return reason;
        };
        // If no cell is available
        if(!availableCells.length) {
            reason.notAvailable = true;
            return reason;
        };
        // If that cell is occupied
        if(board[row][column].getValue() !== null) {
            reason.alreadyFilled = true;
            return reason; 
        };
        // Otherwise fill the cell with the player's symbol
        board[row][column].addSymbol(player);

        return true;
    };
    
    // Print in console our board
    const printBoard = () => {
        const arrayBoard = board.map((row) => row.map((cell) => cell.getValue()));
        arrayBoard.forEach(row => {
            console.log(...row);
        });
    };

    return { getBoard, resetBoard, fillCell, printBoard };
};

function cell() {
    let value = null;

    // Take a valid player to populate our symbol
    const addSymbol = (player) => value = player;
    // Retrieve the token 
    const getValue = () => value;

    return {
        addSymbol,
        getValue,
    };
};

function textMessage(string) {
    console.log(string);
    return string;
};

function getPlayers() {
    // Our players with their respective names and tokens(TODO: this should be changeable from the DOM)
    const playerOne = {
        name : "Player One",
        symbol : "X",
        score : 0,
    };
    const playerTwo = {
        name : "Player Two",
        symbol : "O",
        score : 0,
    };
    const resetPlayersScore = () => {
        playerOne.score = playerTwo.score = 0;
    }

    return {
        playerOne,
        playerTwo,
        resetPlayersScore,
    };
};

function gameController() {
    const players = getPlayers();
    const board = gameBoard();
    // A method to get who's currently playing
    const getActivePlayer = () => activePlayer;
    // A method to get all the players 
    const getAllPlayers = () => players;

    let winner = {
        player : undefined,
    };
    let activePlayer = players.playerOne;
    let textBoard = ""; // Redundant but important for the front-end

    // A method to manipulate some text to be returned
    const getTextBoard = () => textBoard;
    // A method to reset the board
    const resetGameState = (type) => {
        board.resetBoard();
        winner.player = undefined;
        activePlayer = players.playerOne;
        textBoard = "";
        // Wipe everything
        if(type == 1) players.resetPlayersScore();
    };
    // A method to switch turns
    const changeTurn = () => activePlayer = activePlayer === players.playerOne ? players.playerTwo : players.playerOne;
    // A method to print the board
    const printNewRound = () => {
        board.printBoard();
        textBoard = textMessage(`It's ${activePlayer.name} turn now.`);
    };
    // A method to play the round
    const playRound = (row, column) => {
        const player = getActivePlayer();
    
        // Bail early if a winner was chosen!
        if(winner.player !== undefined) { 
            textBoard = textMessage(`${winner.name} was declared the winner, game over!`);
            return winner.player; 
        };
        // Otherwise fill the cell
        const fillCell = board.fillCell(row, column, player.symbol);
        // Return the reasons it failed to do so
        if(fillCell.outOfBounds === true) {
            textBoard = textMessage("The selected cell is out of bounds!");
            return fillCell;
        }
        else if(fillCell.alreadyFilled === true) {
            textBoard = textMessage("That cell is already filled! Try again...");
            return fillCell;
        }
        else if(fillCell.notAvailable === true) {
            textBoard = textMessage("No cells are available anymore, game over!");
            return fillCell;
        }
        // Otherwise continue...
        else {
            console.log(`Filling = Row: ${row}, Col: ${column}, with ${player.symbol} (${player.name})`);
            changeTurn();
            if(checkBoard(player)) {
                winner.player = player;
                player.score += 1;
                board.printBoard(); // A little of redundancy for my sins wont hurt anyone
                textBoard = textMessage(`Tic Tac Toe: ${player.name} has won the game!`);
                return winner.player;
            };
            printNewRound();
        };
        return true;
    };
    // A method to check if multiple elements of the same symbol exist on a line or diagonal
    const checkBoard = (player) => {
        const brd = board.getBoard();
        const rows = brd.length;
        const cols = brd[0].length;
        const symbol = player.symbol;
        const len = 3; // length of 3 for now
        let isLine;
        let isDiag;

        // Check rows
        for(let r = 0; r < rows; r++) {
            for(let c = 0; c <= cols - len; c++) { 
                isLine = true;
                for(let i = 0; i < len; i++) {
                    if(brd[r][c + i].getValue() !== symbol) {
                        isLine = false;
                        break;
                    };
                };
                if(isLine) return true;
            };
        };
        // Check columns
        for(let c = 0; c < cols; c++) {
            for(let r = 0; r <= rows - len; r++) {
                isLine = true;
                for(let i = 0; i < len; i++) {
                    if(brd[r + i][c].getValue() !== symbol) {
                        isLine = false;
                        break;
                    };
                };
                if(isLine) return true;
            };
        };
        // Check main diagonal
        for(let r = 0; r <= rows - len; r++) {
            for(let c = 0; c <= cols - len; c++) {
                isDiag = true;
                for(i = 0; i < len; i++) {
                    if(brd[r + i][c + i].getValue() !== symbol) {
                        isDiag = false;
                        break;
                    };
                };
                if(isDiag) return true;
            };
        };
        // Check anti-diagonal
        for(let r = 0; r <= rows - len; r++) {
            for(let c = len - 1; c < cols; c++) {
                isDiag = true;
                for(i = 0; i < len; i++) {
                    if(brd[r + i][c - i].getValue() !== symbol) {
                        isDiag = false;
                        break;
                    };
                };
                if(isDiag) return true;
            };
        };

        return false;
    };
   
    return {
        getTextBoard,
        getActivePlayer,
        getBoard : board.getBoard(),
        getAllPlayers,
        resetGameState,
        playRound,
        checkBoard,
    };
};

function screenController() {
    const game = gameController();
    let activePlayer = game.getActivePlayer();
    // DOM specific consts
    const playGameBtn = document.querySelector("button.play-game-btn");
    const playMenuBtns = document.querySelector("div.play-menu-btns");
    const mainMenu = document.querySelector(".main-menu");
    const inGameMenu = document.querySelector(".ingame-menu");
    const viewScoreDialog = document.querySelector(".view-score-dialog");
    const updateTurnDiv = () => { 
        const turnTellerdiv = document.querySelector("div.turn-teller");
        const turnDiv = game.getTextBoard();
        turnTellerdiv.textContent = turnDiv;         
    }; 
    /*const playerDOM = {
        playerOneDivData : document.querySelector("#playerOne"),
        playerTwoDivData : document.querySelector("#playerTwo"),
    }*/ // Unused for now
    let isGamePlaying = false;
    
    const createBoard = () => {
        const gameBoard = game.getBoard;
        const boardDiv = document.querySelector(".board-container");
        const boardSize = {
            rows : gameBoard.length,
            cols : gameBoard[0].length,
        };
        // Clear the board
        boardDiv.textContent = "";
        // Populate the board with cells as buttons
        let indexCell = 1;
        for(let i = 0; i < boardSize.rows; i++) {
            for(let j = 0; j < boardSize.cols; j++) {
                // For every cell the board has, we create a button!
                const cellButton = document.createElement("button");
                // Add classes and its content
                cellButton.classList.add("cell");
                cellButton.dataset.row = i;
                cellButton.dataset.column = j;
                cellButton.dataset.index = indexCell;
                cellButton.textContent = cell().getValue();
                indexCell++;
                // Append it to the DOM element
                boardDiv.appendChild(cellButton);
            };
        };
        updateBoard(); 
    };

    // A method to render the board and update it 
    const updateBoard = () => {
        // Update our active player too
        activePlayer = game.getActivePlayer();
        // Show whose turn is...
        updateTurnDiv();
    };

    // A method to delete the contents of the board(most likely too overkill)
    const resetBoard = (softOrHard) => {
        // Reset the board DOM
        document.querySelector(".board-container").innerHTML = "";
        // Reset the game controller and re-create the board
        game.resetGameState(softOrHard);
        createBoard();
    };

    // A method to toggle between the main menu and ingame menu
    const switchGameState = () => {
        if(!isGamePlaying) {
            mainMenu.classList.add("inactive");
            inGameMenu.classList.remove("inactive");
            isGamePlaying = true;
            // Render the board 
            createBoard();
        }
        else {
            mainMenu.classList.remove("inactive");
            inGameMenu.classList.add("inactive");
            isGamePlaying = false;
            // Delete the board
            resetBoard(1);
        };
    };

    const gameStateHandler = (e) => {
        // Get our cells
        const cellBtn = e.target.classList.contains("cell"); // Target only our cell buttons
        const cells = document.querySelectorAll("button.cell");
        const cellPos = {
            row : e.target.dataset.row,
            col : e.target.dataset.column,
        };
        // Return early if we didn't click any buttons;
        if(!cellBtn) return;
        // Play a round and update the board with the results
        const round = game.playRound(cellPos.row, cellPos.col, activePlayer);
        // If our clicked cell is either out of bounds(through the console) or is already filled
        if(round.outOfBounds === true || round.alreadyFilled === true) {
            updateBoard();
        }
        else {
            // Populate the cell's text with the player's symbol
            e.target.textContent = activePlayer.symbol;
            updateBoard();
        };
        // Round is over, disable our buttons!
        if(round.notAvailable === true || round.name !== undefined) {
            cells.forEach(c => {c.setAttribute("disabled", "")}); 
            return;
        };
    };

    // A method to handle a dialog(specific to view score for now)
    const dialogHandler = () => {
        viewScoreDialog.showModal();

        const dialog = viewScoreDialog;
        const playerData = game.getAllPlayers();
        
        const playerOneScore = dialog.querySelector(".playerOne");
        const playerTwoScore = dialog.querySelector(".playerTwo");
        const closeBtn = dialog.querySelector("#close-btn");

        playerOneScore.textContent = dialog.open ? `${playerData.playerOne.name} score: ${playerData.playerOne.score}` : "";
        playerTwoScore.textContent = dialog.open ? `${playerData.playerTwo.name} score: ${playerData.playerTwo.score}` : "";

        closeBtn.addEventListener("click", () => viewScoreDialog.close()); // Close the dialog upon clicking it
    };
    
    // Event listeners
    // Switch the display state of our menus when we click the button
    playGameBtn.addEventListener("click", () => switchGameState());
    playMenuBtns.addEventListener("click", e => {
        const button = e.target;
        if(button.classList.contains("main-menu-btn")) {
            switchGameState();
        }
        else if(button.classList.contains("reset-game-btn")) {
            resetBoard(0);
        }
        else if(button.classList.contains("view-score-btn")) {
            dialogHandler();
        };
    });    
    // Update the board when we click on a cell
    inGameMenu.addEventListener("click", e => gameStateHandler(e));
};

console.log("Script loaded successfully...");
screenController();
