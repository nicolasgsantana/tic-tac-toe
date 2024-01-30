function createPlayer(name, token) {
    return { name, token }
}

const gameBoard = (() => {
    const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    const placeToken = (x, y, token) => {
        if (board[y][x] === 0) {
            board[y][x] = token;
        }
        else {
            console.log(`Invalid position`);
        }
    };

    const getBoard = () => {
        return board;
    };

    return { placeToken, getBoard };
})();

const gameController = (() => {
    const players = [createPlayer("Player 1", 1), createPlayer("Player 2", 2)];

    let activePlayer = players[0];

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => {
        return activePlayer;
    };

    const victoryAchieved = () => {
        const board = gameBoard.getBoard();

        if (
            (board[0][0] === activePlayer.token
                && board[1][1] === activePlayer.token
                && board[2][2] === activePlayer.token) ||
            (board[0][2] === activePlayer.token
                && board[1][1] === activePlayer.token
                && board[2][0] === activePlayer.token)
        ) {
            return true;
        }

        for (let i = 0; i < board.length; i++) {
            if (board[i].every((value => value === activePlayer.token))) {
                return true;
            }
            else if (board[0][i] === activePlayer.token && board[1][i] === activePlayer.token
                && board[2][i] === activePlayer.token) {
                return true;
            }
        }

        return false;
    };

    const playRound = () => {
        console.log(`${activePlayer.name} turn`);
        const x = Number(prompt("Enter X position: "));
        const y = Number(prompt("Enter Y position: "));

        gameBoard.placeToken(x, y, activePlayer.token);

        if (victoryAchieved()) {
            console.log(`${activePlayer.name} won!`);
        }

        console.log(gameBoard.getBoard());

        switchActivePlayer();
    };

    return { getActivePlayer, playRound };
})();

const visualsController = (() => {
    const board = document.querySelector(".board");
    const cells = Array.from(board.children);

    // Each cell has 2 children elements
    // First child element is the "O" symbol svg and the second is the "X" symbol

    cells.forEach(cell => {
        cell.children[1].style.display = "block";
    });
})();
