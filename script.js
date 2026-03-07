const Gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;

    const resetBoard = () => board.fill("");

    const fillBoard = (index, mark) => {
        if (index >= 0 && index <= 8 && board[index] == "") {
            board[index] = mark;
            return true;
        }

        return false;
    }

    return { getBoard, resetBoard, fillBoard };
})();

const Player = (name, mark) => {
    return { name, mark };
}

const GameController = (() => {
    let player1, player2, currentPlayer;
    let gameOver = false;

    const isGameOver = () => gameOver;

    const startGame = (player1Name, player1Mark, player2Name, player2Mark, starter) => {
        player1 = Player(player1Name, player1Mark);
        player2 = Player(player2Name, player2Mark);

        currentPlayer = starter == "1" ? player1 : player2;
        
        gameOver = false;
        Gameboard.resetBoard();
    }

    const playRound = (index) => {
        if (gameOver) return;

        const filled = Gameboard.fillBoard(index, currentPlayer.mark);
        if (!filled) return;

        if (checkWin()) {
            console.log(`${currentPlayer.name} won!`);
            gameOver = true;
            return;
        }

        if (checkTie()) {
            console.log("Tie!");
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer == player1 ? player2 : player1;
    }

    const checkWin = () => {
        const board = Gameboard.getBoard();
        const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

        return winningCombos.some(combo => combo.every(i => board[i] == currentPlayer.mark));
    };

    const checkTie = () => Gameboard.getBoard().every(cell => cell != "");

    return { startGame, playRound, isGameOver };
})();

const DisplayController = (() => {

})();