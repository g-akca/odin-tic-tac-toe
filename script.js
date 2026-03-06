const Gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;

    const resetBoard = () => board = ["", "", "", "", "", "", "", "", ""];

    const fillBoard = (index, mark) => {
        if (index >= 0 && index <= 8 && board[index] == "") {
            board[index] = mark;
            return true;
        }

        return false;
    }

    return { getBoard, resetBoard, fillBoard };
})();

const Player = (name, marker) => {
    return { name, marker };
}

const GameController = (() => {
    let player1, player2, currentPlayer;
    let gameOver = false;

    const startGame = (player1Name, player1Mark, player2Name, player2Mark, starter) => {
        player1 = Player(player1Name, player1Mark);
        player2 = Player(player2Name, player2Mark);

        currentPlayer = starter == "1" ? player1 : player2;
        
        gameOver = false;
        Gameboard.resetBoard();
    }

    return { startGame };
})();

const DisplayController = (() => {

})();