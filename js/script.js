const gameBoard = (() => {
    const board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
    const placeSymbol = (position, symbol) => {
        board[position[0]][position[1]] = symbol;
    };
    const print = () => {
        console.log(board);
    };
    return { placeSymbol, print };
})();
