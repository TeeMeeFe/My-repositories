class Cell {
    constructor(value = null) {
        this.value = value;
    }

    /**
     * @param `String` player's symbol
     * @description Take a valid player to populate a cell
     */
    addSymbol(player) { this.value = player };

    /**
     * @description Retrieve the value of a cell
     */
    get getValue() { return this.value };
}

class Board {
    static #rows = 3;
    static #columns = 3;
    #board = [];

    /**
     * @description Creates a 2d array, populating each row and column with a cell we create
     */
    #populateBoard() {
        for (let i = 0; i < Board.#rows; i++) {
            this.#board[i] = [];
            for (let j = 0; j < Board.#columns; j++) {
                this.#board[i].push(new Cell);
            };
        };
    };

    // Terrible hack to deal with JS class shortcomings when it comes to recalling an IIFE from another function within the same class
    #IIFE = (() => {
        this.#populateBoard();
    })();

    /**
     * @description Gets the array with the contents of the board
     * @returns `Array` board
     */
    get getBoard() { return this.#board };

    /**
     * @description Resets the board
     */
    resetBoard = () => {
        this.#board.length = 0;
        this.#populateBoard();
    };

    /**
     * @params `number` row, `number` column, `string` player symbol
     * @description Fills a cell with a player's symbol at a row:column position
     * @returns `Object` reason = { notAvailable: `Boolean`, alreadyFilled: `Boolean` }
     */
    fillCell = (row, column, symbol) => {
        const reason = {
            notAvailable: false,
            alreadyFilled: false,
        };

        // Look for all the cells that are not filled yet(or are nullish)
        const availableCells = this.#board
            .filter(r => r.some(Cell => Cell.getValue === null))
            .map(r => r.filter(Cell => Cell.getValue === null));

        // If no cell is available
        if (!availableCells.length) {
            reason.notAvailable = true;
            return reason;
        };
        // If that cell is occupied
        if (this.#board[row][column].getValue !== null) {
            reason.alreadyFilled = true;
            return reason;
        };
        // Otherwise fill the cell with the player's symbol
        this.#board[row][column].addSymbol(symbol);

        return reason;
    };
}

class Player {
    constructor(name, symbol, score = 0) {
        this.name = name;
        this.symbol = symbol;
        this.score = score;
    }

    /**
     * @description Gets the player's instance data
     */
    get getData() {
        return this;
    }

    /**
     * @param {number} value
     * @description Adds `value` to the player's instance score
     */
    set addScore(value) {
        this.score += value;
    }
}

class Game {
    // Naive constructor
    constructor(object) {
        this.object = {
            playerOne: new Player(object.name_player1, object.symbol_player1),
            playerTwo: new Player(object.name_player2, object.symbol_player2),
            goesFirst: object.goesfirst,
            winner: null,
        }
    }

    #board = new Board;
    #textBoard = "";
    #activePlayer = null;

    /**
     * @description Gets the data of all players
     * @returns `Array` with the instance of player One and player Two
     */
    get getAllPlayers() { return [this.object.playerOne, this.object.playerTwo] };

    /**
     * @description Gets the atribute `goesFirst` in a instance of `Game`
     * @returns `String` player that goes first
     */
    get getPlayerGoesFirst() { return this.object.goesFirst };

    /**
     * @description Gets the player that's on turn
     * @return `null` | `Player`
     */
    get getActivePlayer() { return this.#activePlayer };

    /**
     * @description A method to get the board's data
     * @returns `Board` class
     */
    get getBoard() { return this.#board.getBoard };

    /**
     * @description A method to manipulate some text to be returned, useful for the front-end
     * @returns `String` textBoard
     */
    get getTextBoard() { return this.#textBoard };

    /**
     * @description Swaps the goesFirst atribute of the instance Game
     */
    #swapGoesFirst = () => this.object.goesFirst = this.object.goesFirst === "player1" ? "player2" : "player1";

    /**
     * @description A method to reset the game
     */
    resetGameState = () => {
        this.#board.resetBoard(); // Clean the board
        this.object.winner = null; // Nullify the instance of winner 
        this.#textBoard = "";
        this.#swapGoesFirst(); // Swap turn so the opposite player can go first on next round
        this.#activePlayer = this.#parsePlayer();
    };

    #parsePlayer() {
        return this.getPlayerGoesFirst == "player1" ? this.object.playerOne : this.object.playerTwo;
    };

    /**
     * @description A method to switch turns
     */
    changeTurn = () => this.#activePlayer = this.#activePlayer === this.object.playerOne ? this.object.playerTwo : this.object.playerOne;

    /**
     * @description A method to play the rounds
     * @returns `Boolean` = `False` if failed move to next round, otherwise `True`; `Player` if a winner was found
     */
    playRound = (row, column, player) => {
        if (player === null) {
            player = this.#parsePlayer();
            this.#activePlayer = player;
        }

        // Fill the cell
        const fillCell = this.#board.fillCell(row, column, player.symbol);
        // If it failed to do so, return the reasons why
        if (fillCell.alreadyFilled === true) {
            this.#textBoard = textMessage("That cell is already filled! Try again...");
            return fillCell;
        }
        else if (fillCell.notAvailable === true) {
            this.#textBoard = textMessage("No cells are available anymore, game over!");
            return fillCell;
        }
        // Otherwise continue...
        else {
            console.log(`Filling = Row: ${row}, Col: ${column}, with ${player.symbol} (${player.name})`);
            if (this.checkBoard(player)) {
                this.object.winner = player;
                this.#textBoard = textMessage(`Tic Tac Toe: ${player.name} has won the game!`);
                player.addScore = 1;
                return this.object.winner;
            };

            // Abysmal workaround to get this to display correctly, i know!
            this.changeTurn();
            this.#textBoard = `It's ${this.#activePlayer.name} turn now.`;
            this.changeTurn();
        };
        return fillCell;
    };

    checkBoard = (player) => {
        const brd = this.#board.getBoard;
        const rows = brd.length;
        const cols = brd[0].length;
        const symbol = player.symbol;
        const len = 3; // length of 3 for now
        let isLine;
        let isDiag;

        // Check rows
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c <= cols - len; c++) {
                isLine = true;
                for (let i = 0; i < len; i++) {
                    if (brd[r][c + i].getValue !== symbol) {
                        isLine = false;
                        break;
                    };
                };
                if (isLine) return true;
            };
        };
        // Check columns
        for (let c = 0; c < cols; c++) {
            for (let r = 0; r <= rows - len; r++) {
                isLine = true;
                for (let i = 0; i < len; i++) {
                    if (brd[r + i][c].getValue !== symbol) {
                        isLine = false;
                        break;
                    };
                };
                if (isLine) return true;
            };
        };
        // Check main diagonal
        for (let r = 0; r <= rows - len; r++) {
            for (let c = 0; c <= cols - len; c++) {
                isDiag = true;
                for (let i = 0; i < len; i++) {
                    if (brd[r + i][c + i].getValue !== symbol) {
                        isDiag = false;
                        break;
                    };
                };
                if (isDiag) return true;
            };
        };
        // Check anti-diagonal
        for (let r = 0; r <= rows - len; r++) {
            for (let c = len - 1; c < cols; c++) {
                isDiag = true;
                for (let i = 0; i < len; i++) {
                    if (brd[r + i][c - i].getValue !== symbol) {
                        isDiag = false;
                        break;
                    };
                };
                if (isDiag) return true;
            };
        };
        return false;
    };
}

// A function to print in console a message that can get shown on screen
const textMessage = (string) => {
    console.log(string);
    return string;
};

// The brain of this, whose imaginary gets captured on your browser's screen 
const screenController = () => {
    let game;
    let isGamePlaying = false;

    // DOM specific consts
    const mainMenu = document.querySelector(".main-menu");
    const inGameMenu = document.querySelector(".ingame-menu");
    const playMenuBtns = document.querySelector("div.play-menu-btns");
    const viewScoreDialog = document.querySelector(".view-score-dialog");

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
        if (!isGamePlaying) {
            mainMenu.classList.add("inactive");
            inGameMenu.classList.remove("inactive");
            isGamePlaying = true;
        }
        else {
            mainMenu.classList.remove("inactive");
            inGameMenu.classList.add("inactive");
            isGamePlaying = false;
            // Delete the board
            wipeBoard();
            delete Game;
        };
    };

    submitFormHandler();

    // A method to render a board on screen
    const renderBoard = (formData) => {
        game = new Game(formData);
        const gameBoard = game.getBoard;
        const boardDiv = document.querySelector(".board-container");
        const boardSize = {
            rows: gameBoard.length,
            cols: gameBoard[0].length,
        };
        // Clear the board
        boardDiv.textContent = "";
        // Populate the front-end board with cells as buttons
        let indexCell = 1;
        for (let i = 0; i < boardSize.rows; i++) {
            for (let j = 0; j < boardSize.cols; j++) {
                // For every cell the board has, we create a button!
                const cellButton = document.createElement("button");
                // Add classes and its content
                cellButton.classList.add("cell");
                cellButton.dataset.row = i;
                cellButton.dataset.column = j;
                cellButton.dataset.index = indexCell;
                cellButton.textContent = Cell.getValue;
                indexCell++;
                // Append it to the DOM element
                boardDiv.appendChild(cellButton);
            };
        };
        updateTurnDiv();
    };

    // A method to update just the textContent of a div
    const updateTurnDiv = () => {
        const turnTellerdiv = document.querySelector("div.turn-teller");
        const turnDiv = game.getTextBoard;
        turnTellerdiv.textContent = turnDiv;
    };

    // A method to delete the board 
    const wipeBoard = () => {
        // Reset the board DOM
        const cellsBtns = document.querySelectorAll("button.cell");
        cellsBtns.forEach(e => {
            e.textContent = "";
            e.removeAttribute("disabled");
        });
        // Reset the game controller and update the DOM
        game.resetGameState();
        updateTurnDiv();
    };

    // The most important method to marry our front-end with its back-end
    const gameStateHandler = (e) => {
        // Get our cells
        const cellBtn = e.target.classList.contains("cell"); // Target only our cell buttons
        const cells = document.querySelectorAll("button.cell");
        const cellPos = {
            row: e.target.dataset.row,
            col: e.target.dataset.column,
        };
        // Return early if we didn't click any buttons;
        if (!cellBtn) return;
        // Play a round and update the board with the results
        const round = game.playRound(cellPos.row, cellPos.col, game.getActivePlayer);
        // If our clicked cell is already filled
        if (round.alreadyFilled !== true) {
            // Populate the cell's text with the player's symbol
            e.target.textContent = game.getActivePlayer.symbol;
        }
        // End of turn for this player!
        updateTurnDiv();
        game.changeTurn(); 
        // Game over, disable our buttons!
        if (round.notAvailable === true || round.name !== undefined) {
            cells.forEach(c => { c.setAttribute("disabled", "") });
            return;
        };
    };

    // A method to handle a dialog(specific to view score for now)
    const dialogHandler = () => {
        viewScoreDialog.showModal();

        const dialog = viewScoreDialog;
        const playerData = game.getAllPlayers;

        const playerOneScore = dialog.querySelector(".playerOne");
        const playerTwoScore = dialog.querySelector(".playerTwo");
        const closeBtn = dialog.querySelector("#close-btn");

        playerOneScore.textContent = dialog.open ? `${playerData[0].name} score: ${playerData[0].score}` : "";
        playerTwoScore.textContent = dialog.open ? `${playerData[1].name} score: ${playerData[1].score}` : "";

        closeBtn.addEventListener("click", () => viewScoreDialog.close()); // Close the dialog upon clicking it
    };

    // Event listeners
    // Switch the display state of our menus when we click any button
    playMenuBtns.addEventListener("click", e => {
        const button = e.target;
        if (button.classList.contains("main-menu-btn")) {
            switchGameMenu();
        }
        else if (button.classList.contains("reset-game-btn")) {
            wipeBoard();
        }
        else if (button.classList.contains("view-score-btn")) {
            dialogHandler();
        };
    });
    // Update the board when we click on a cell
    inGameMenu.addEventListener("click", e => gameStateHandler(e));

    console.log("Script loaded successfully...");
}

screenController();
