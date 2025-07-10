function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    // Create a 2d array, populating each row and column with a cell we create
    for(let i = 0; i < rows; i++) {
        board[i] = rows;
        for(let j = 0; j < columns; j++) {
            board[i].push(cell());
        }
    }
    
    // A method to get the status of the board
    const getBoard = () => board;

    const fillCell = (row, column, player) => {
        // Look for all the cells that are not filled yet
        const availableCells = board.filter((row) => row[column].getValue() === "").map((row) => row[column]);
        // If no cell is available, return early
        if(!availableCells.length) return;
        // Otherwise fill the cell with the player's symbol
        board[row][column].addSymbol(player);
    }
}

function cell() {
    let value = "";

    // Take a valid player to populate our symbol
    const addSymbol = (player) => {
        value = player;
    };

    // Retrieve the token 
    const getValue = () => value;

    return {
        addToken,
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
}