function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    // Create a 2d array, populating each row and column with a cell we create
    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push(cell());
        }
    }
    
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
            console.log("No cells are available anymore, game over?")
            return false;
        };
        // If that cell is occupied, escape early
        if(board[row][column].getValue() !== null) {
            console.log("That cell is already filled! Try again...")
            return false;
        }
        // Otherwise fill the cell with the player's symbol
        board[row][column].addSymbol(player);

        return true;
    }
    // Print in console our board
    const printBoard = () => {
        const arrayBoard = board.map((row) => row.map((cell) => cell.getValue()));
        arrayBoard.forEach(row => {
            console.log(...row);
        })
    } 

    return { getBoard, fillCell, printBoard }
}

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
}

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
}

function gameController() {
    const player = getPlayers();
    const board = gameBoard();

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

        if(board.fillCell(row, column, player.symbol)) {
            console.log(`Filling = Row: ${row}, Col: ${column}, with ${player.symbol} (${player.name})`);
            changeTurn();
            if(checkBoard(player)) {
                console.log(`Tic Tac Toe: ${player.name} has won the game!`)
                return;
            }
            printNewRound();
        }
    };
    // A method to check if multiple elements of the same symbol exist on a line or diagonal
    const checkBoard = (player) => {
        const brd = board.getBoard()
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
                    }
                }
                if(isLine) return true;
            }
        }
        // Check columns
        for(let c = 0; c < cols; c++) {
            for(let r = 0; r <= rows - len; r++) {
                isLine = true;
                for(let i = 0; i < len; i++) {
                    if(brd[r + i][c].getValue() !== symbol) {
                        isLine = false;
                        break;
                    }
                }
                if(isLine) return true;
            }
        }
        // Check main diagonal
        for(let r = 0; r <= rows - len; r++) {
            for(let c = 0; c <= cols - len; c++) {
                isDiag = true;
                for(i = 0; i < len; i++) {
                    if(brd[r + i][c + i].getValue() !== symbol) {
                        isDiag = false;
                        break;
                    }
                }
                if(isDiag) return true;
            }
        }
        // Check anti-diagonal
        for(let r = 0; r <= rows - len; r++) {
            for(let c = len - 1; c < cols; c++) {
                isDiag = true;
                for(i = 0; i < len; i++) {
                    if(brd[r + i][c - i].getValue() !== symbol) {
                        isDiag = false;
                        break;
                    }
                }
                if(isDiag) return true;
            }
        }

        return false;
    }
   
    return {
        getActivePlayer,
        getBoard : board.getBoard(),
        playRound,
        checkBoard,
    };
}

console.log("Script loaded successfully...");
const game = gameController();