function createPlayer(name, token) {
    return { name, token }
}

const gameBoard = (() => {
    const board = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

    const placeToken = (index, token) => {
        if (board[index] < 0) {
            board[index] = token;
            return true;
        }

        return false;
    };

    const getBoard = () => {
        return board;
    };

    return { placeToken, getBoard };
})();

const visualsController = (() => {
    const board = document.querySelector(".board");
    const cells = Array.from(board.children);
    const paragraphs = document.querySelectorAll("main p")

    const root = document.querySelector(":root");
    const THEMES = [["#070707", "#F5F0F6"], ["#F5F0F6", "#070707"], ["#101820", "#FEE715"], ["#070952", "#ef4da0"], ["#FBEAEB", "#2E3C7E"]];

    // Each cell has 2 children elements
    // First child element is the "O" symbol svg and the second is the "X" symbol
    const updatePreviewSymbol = (playerToken) => {
        cells.forEach(cell => {
            if (cell.classList.contains("empty")) {
                cell.children[playerToken].style.display = "block";
                cell.children[playerToken === 0 ? 1 : 0].style.display = "none";
            }
        });
    };

    const disablePreviewSymbol = () => {
        cells.forEach(cell => {
            if (cell.classList.contains("empty")) {
                for (child of cell.children) {
                    child.style.display = "none";
                }
            }
        });
    };

    const updateTexts = (text) => {
        paragraphs.forEach(p => {
            p.innerText = text;
        });
    };

    const switchColorScheme = (themeIndex) => {
        root.style.setProperty('--bg-color', THEMES[themeIndex][0]);
        root.style.setProperty('--main-color', THEMES[themeIndex][1]);
    };

    const showToken = (index, playerToken) => {
        const cell = cells[index];
        const svg = cell.children[playerToken];
        cell.classList.toggle("empty");
        svg.style.display = "block";
        console.log("Place token");
    };

    const initializeCells = () => {
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                if (cell.classList.contains("empty") && !gameController.victoryAchieved())
                    gameController.playRound(cells.indexOf(cell));
            });
        });
    };

    return { showToken, updateTexts, updatePreviewSymbol, initializeCells, disablePreviewSymbol }
})();

const gameController = (() => {
    const players = [createPlayer("Player 1", 1), createPlayer("Player 2", 0)];

    let activePlayer = players[0];

    //Initialization
    visualsController.updatePreviewSymbol(activePlayer.token);
    visualsController.updateTexts(`${activePlayer.name} turn`)

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const victoryAchieved = () => {
        const board = gameBoard.getBoard();

        // Sorry for this abomination
        if (
            // Check diagonals
            (board[0] === activePlayer.token
                && board[4] === activePlayer.token
                && board[8] === activePlayer.token) ||
            (board[2] === activePlayer.token
                && board[4] === activePlayer.token
                && board[6] === activePlayer.token) ||

            // Check horizontals
            (board[0] === activePlayer.token
                && board[1] === activePlayer.token
                && board[2] === activePlayer.token) ||
            (board[3] === activePlayer.token
                && board[4] === activePlayer.token
                && board[5] === activePlayer.token) ||
            (board[6] === activePlayer.token
                && board[7] === activePlayer.token
                && board[8] === activePlayer.token) ||

            // Check verticals
            (board[0] === activePlayer.token
                && board[3] === activePlayer.token
                && board[6] === activePlayer.token) ||
            (board[1] === activePlayer.token
                && board[4] === activePlayer.token
                && board[7] === activePlayer.token) ||
            (board[2] === activePlayer.token
                && board[5] === activePlayer.token
                && board[8] === activePlayer.token)
        ) {
            return true;
        }

        return false;
    };

    const playRound = (index) => {
        visualsController.updateTexts(`${activePlayer.name} turn`)

        if (gameBoard.placeToken(index, activePlayer.token)) {
            visualsController.showToken(index, activePlayer.token);
        }

        if (victoryAchieved()) {
            visualsController.updateTexts(`${activePlayer.name} won!`);
            visualsController.disablePreviewSymbol();
        }
        else {
            switchActivePlayer();
            visualsController.updatePreviewSymbol(activePlayer.token);
        }
    };

    return { playRound, victoryAchieved };
})();

visualsController.initializeCells();
