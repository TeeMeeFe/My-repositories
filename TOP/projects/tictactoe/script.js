class Cell {
    constructor(value = null) {
        this.value = value;
    }

    /**
     * @param {object} player
     * @description Take a valid player to populate a cell
     */
    set addSymbol (player) { this.value = player };

    /**
     * @description Retrieve the value of a cell
     */ 
    get getValue () { return this.value };
}

class Board extends Cell {
    static #rows = 3;
    static #columns = 3;
    #board = [];

    /**
     * @description Creates a 2d array, populating each row and column with a cell we create
     */ 
    #populateBoard() {
        for(let i = 0; i < Board.#rows; i++) {
            this.#board[i] = [];
            for(let j = 0; j < Board.#columns; j++) {
                this.#board[i].push(new Cell);
            };
        };
    };

    /**
     * @description Gets the status of the board
     */
    getBoard = () => this.#board;

    /**
     * @description Resets the board
     */ 
    resetBoard = () => {
        this.#board = [];
        this.#populateBoard();
    };

    /**
     * @params `number` row, `number` column, `string` player symbol
     * @description Fills a cell with a player's symbol at a row:column position
     * @returns `Object` with any reason as `Bool`
     */ 
    fillCell = (row, column, player) => {
        const reason = {
            notAvailable : false, 
            alreadyFilled : false,
        };

        // Look for all the cells that are not filled yet(or are nullish)
        const availableCells = this.#board
            .filter(r => r.some(() => super.getValue() === null))
            .map(r => r.filter(() => super.getValue() === null));

        // If no cell is available
        if(!availableCells.length) {
            reason.notAvailable = true;
            return reason;
        };
        // If that cell is occupied
        if(this.#board[row][column](super.getValue()) !== null) {
            reason.alreadyFilled = true;
            return reason; 
        };
        // Otherwise fill the cell with the player's symbol
        this.#board[row][column](super.addSymbol(player));

        return reason;
    };
}

class Player {
    constructor(name, symbol, score = 0){
        this.name = name;
        this.symbol = symbol;
        this.score = score;
    }

    /**
     * @description Gets the player's instance data
     */
    get getData () {
        return this;
    }

    /**
     * @param {number} value
     * @description Adds to the player's instance score
     */
    set addScore (value) {
        this.score += value;
    }
}

class Game {
    // Naive constructor
    constructor(object) {
        this.object = { 
            playerOne : new Player(object.name_player1, object.symbol_player1),
            playerTwo : new Player(object.name_player2, object.symbol_player2),
            goesFirst : object.goesfirst,
            winner : null,
        }
    }

    textBoard = "";
    activePlayer = null;

    /**
     * @description A method to get all the players 
     * @returns `Array` Array with the instance of player One and player Two
     */
    get getAllPlayers () { return [this.object.playerOne, this.object.playerTwo] };

    /**
     * @description A method to get who goes first
     * @returns `String` player that goes first
     */
    get getPlayerGoesFirst () { return this.object.goesFirst };

    /**
     * @description A method to manipulate some text to be returned, useful for the front-end
     * @returns `String` textBoard
     */
    get getTextBoard () { return this.textBoard };

    static #board = new Board;

    /**
     * @description A method to reset the board
     */
    resetGameState = () => {
        Board.resetBoard(); // Clean the board
        this.object.winner = null; // Nullify our winner
        this.textBoard = "";
        activePlayer = players.playerOne;
        
    };

    /**
     * @description A method to switch turns
     */
    changeTurn = () => activePlayer = activePlayer === this.object.playerOne ? this.object.playerTwo : this.object.playerOne;

    /**
     * @description A method to play the rounds
     * @returns `Boolean` = `False` if failed to play, otherwise `True`; `Object` if a winner was found
     */ 
    playRound = (row, column) => {
        const player = this.activePlayer = this.activePlayer == null ? 
                       this.getPlayerGoesFirst == "player1" ? this.object.playerOne : this.object.playerTwo : this.object.playerOne;

        // Otherwise fill the cell
        const fillCell = Board.fillCell(row, column, player.symbol);
        // Return the reasons it failed to do so
        if(fillCell.alreadyFilled === true) {
            this.textBoard = textMessage("That cell is already filled! Try again...");
            return false;
        }
        else if(fillCell.notAvailable === true) {
            this.textBoard = textMessage("No cells are available anymore, game over!");
            return false;
        }
        // Otherwise continue...
        else {
            console.log(`Filling = Row: ${row}, Col: ${column}, with ${player.symbol} (${player.name})`);
            this.changeTurn();
            if(this.checkBoard(player)) {
                this.object.winner = player;
                this.textBoard = textMessage(`Tic Tac Toe: ${player.name} has won the game!`);
                player.addScore(1);
                return this.object.winner;
            };
        };
        return true;
    };

    checkBoard = (player) => {
        const brd = Game.#board.getBoard();
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
}

const textMessage = (string) => {
    console.log(string);
    return string;
};

const screenController = () => {
    let isGamePlaying = false;

    // A method to handle form data
    const submitFormHandler = () => { 
        const playerFormData = document.querySelector(".player-form");

        playerFormData.addEventListener("submit", e => {
            // Prevent our form from doing a http POST method and instead we handle the data ourselves
            e.preventDefault();
            new FormData(playerFormData);
        });

        playerFormData.addEventListener("formdata", e => {
            console.log("FormData fired");

            // Get the form data
            const data = e.formData;
            const arr = [];

            // Push our datae into an array
            data.forEach((value, key) => {
                arr.push([key, value]);
            });

            // Convert our array into an object
            const obj = [Object.fromEntries(arr),][0];
            switchGameMenu();
            // Render the board 
            renderBoard(obj);
        });
    }
    // A method to toggle between the main menu and ingame menu
    const switchGameMenu = () => {
        const mainMenu = document.querySelector(".main-menu");
        const inGameMenu = document.querySelector(".ingame-menu");

        if(!isGamePlaying) {
            mainMenu.classList.add("inactive");
            inGameMenu.classList.remove("inactive");
            isGamePlaying = true;
        }
        else {
            mainMenu.classList.remove("inactive");
            inGameMenu.classList.add("inactive");
            isGamePlaying = false;
            // Delete the board
            //resetBoard(1);
        };
    };

    submitFormHandler();
    const renderBoard = (formData) => {
        const game = new Game(formData);
        console.log(`Destination reached! Game is ${game}`);
        console.log(game.getAllPlayers);
        console.log(game.getPlayerGoesFirst);
    };
    
    const playGameBtn = document.querySelector(".play-game-btn");

    console.log("Script loaded successfully...");
}

screenController();

/*
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
    /*
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
screenController();*/