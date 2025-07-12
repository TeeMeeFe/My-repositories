function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    // Create a 2d array, populating each row and column with a cell we create
    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push(cell());
        };
    };
    
    // A method to get the status of the board
    const getBoard = () => board;
    // A method to fill our cells
    const fillCell = (row, column, player) => {
        // Check if the row or column is within bounds
        if(row >= rows || column >= columns) {
            console.log("The specified cell is out of bounds!");
            return false;
        };
        // Look for all the cells that are not filled yet(or are nullish)
        const availableCells = board
            .filter(row => row.some(cell => cell.getValue() === null))
            .map(row => row.filter(cell => cell.getValue() === null));
        // If no cell is available, return early
        if(!availableCells.length) {
            console.log("No cells are available anymore, game over!")
            return false;
        };
        // If that cell is occupied, escape early
        if(board[row][column].getValue() !== null) {
            console.log("That cell is already filled! Try again...")
            return false;
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

    return { getBoard, fillCell, printBoard };
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

function getPlayers() {
    // Our players with their respective names and tokens(TODO: this should be changeable from the DOM)
    const playerOne = {
        name : "Player One",
        symbol : "X",
    };
    const playerTwo = {
        name : "Player Two",
        symbol : "O",
    };

    return {
        playerOne,
        playerTwo,
    };
};

function gameController() {
    const player = getPlayers();
    const board = gameBoard();

    let winner;
    let activePlayer = player.playerOne;

    // A method to switch turns
    const changeTurn = () => activePlayer = activePlayer === player.playerOne ? player.playerTwo : player.playerOne;
    // A method to get who's currently playing
    const getActivePlayer = () => activePlayer;
    // A method to print the board
    const printNewRound = () => {
        board.printBoard();
        console.log(`It's ${activePlayer.name} turn now.`);
    };
    // A method to play the round
    const playRound = (row, column) => {
        const player = getActivePlayer();

        // Bail early if a winner was chosen!
        if(winner !== undefined) { 
            console.log(`${winner.name} was declared the winner, game over!`); 
            return winner; 
        };
        // Otherwise fill the cell
        if(board.fillCell(row, column, player.symbol)) {
            console.log(`Filling = Row: ${row}, Col: ${column}, with ${player.symbol} (${player.name})`);
            changeTurn();
            if(checkBoard(player)) {
                winner = player;
                board.printBoard(); // A little of redundancy for my sins wont hurt anyone
                console.log(`Tic Tac Toe: ${player.name} has won the game!`);
                return winner;
            };
            printNewRound();
        };
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
        getActivePlayer,
        getBoard : board.getBoard(),
        playRound,
        checkBoard,
    };
};

const screenController = () => {
    const game = gameController();
    let activePlayer = game.getActivePlayer();
    // DOM specific consts
    const playGameBtn = document.querySelector("button.play-game-btn");
    const mainMenu = document.querySelector(".main-menu");
    const inGameMenu = document.querySelector(".ingame-menu");
    const turnTellerdiv = document.querySelector("div.turn-teller");
    /*const playerDOM = {
        playerOneDivData : document.querySelector("#playerOne"),
        playerTwoDivData : document.querySelector("#playerTwo"),
    }*/ // Unused for now
    let isGamePlaying = false;
    turnTellerdiv.textContent = ""; 
    
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
        turnTellerdiv.textContent = `It's ${activePlayer.name} turn now...`;
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
        const winner = game.playRound(cellPos.row, cellPos.col, activePlayer);
        // If we got a winner
        if(winner !== undefined) {
            turnTellerdiv.textContent = `Tic Tac Toe: ${activePlayer.name} has won the game!`;
            e.target.textContent = activePlayer.symbol;
            cells.forEach(c => {c.setAttribute("disabled", "")}); // Disable our buttons!
            return;
        };
        // Populate the cell's text with the player's symbol
        e.target.textContent = activePlayer.symbol;
        updateBoard();
    };
    
    // Event listeners
    // Switch the display state of our menus when we click the button
    playGameBtn.addEventListener("click", () => switchGameState());
    // Update the board when we click on a cell
    inGameMenu.addEventListener("click", e => gameStateHandler(e));
};

console.log("Script loaded successfully...");
screenController();
