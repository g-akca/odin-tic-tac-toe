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
    let player1, player2, currentPlayer, winner;
    let gameOver = false;
    let tie = false;

    const getCurrentPlayer = () => currentPlayer;
    const isGameOver = () => gameOver;
    const getWinner = () => winner;
    const isTie = () => tie;

    const startGame = (player1Name, player1Mark, player2Name, player2Mark, starter) => {
        player1 = Player(player1Name, player1Mark);
        player2 = Player(player2Name, player2Mark);

        currentPlayer = starter == "1" ? player1 : player2;
        
        gameOver = false;
        tie = false;
        winner = null;

        Gameboard.resetBoard();
    }

    const playRound = (index) => {
        if (gameOver) return;

        const filled = Gameboard.fillBoard(index, currentPlayer.mark);
        if (!filled) return;

        if (checkWin()) {
            gameOver = true;
            winner = currentPlayer;
            return;
        }

        if (checkTie()) {
            gameOver = true;
            tie = true;
            return;
        }

        currentPlayer = currentPlayer == player1 ? player2 : player1;
    }

    const checkWin = () => {
        const board = Gameboard.getBoard();
        const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

        return winningCombos.some(combo => combo.every(i => board[i] == currentPlayer.mark));
    }

    const checkTie = () => Gameboard.getBoard().every(cell => cell != "");

    return { startGame, playRound, getCurrentPlayer, isGameOver, getWinner, isTie };
})();

const DisplayController = (() => {
    const player1Marks = document.querySelectorAll('input[name="player1Mark"]');
    const player2Marks = document.querySelectorAll('input[name="player2Mark"]');

    function syncMarks(changedPlayer, mark) {
        if (changedPlayer == "1") player2Marks.forEach(radio => radio.checked = radio.value != mark);
        else player1Marks.forEach(radio => radio.checked = radio.value != mark);
    }

    player1Marks.forEach(radio => {
        radio.addEventListener("change", (e) => syncMarks("1", e.target.value));
    });

    player2Marks.forEach(radio => {
        radio.addEventListener("change", (e) => syncMarks("2", e.target.value));
    });

    const form = document.getElementById("start-form");
    const statusText = document.getElementById("status-text");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        const player1Name = formData.get("player1Name");
        const player1Mark = formData.get("player1Mark");
        const player2Name = formData.get("player2Name");
        const player2Mark = formData.get("player2Mark");
        const starter = formData.get("starter");

        GameController.startGame(player1Name, player1Mark, player2Name, player2Mark, starter);

        document.getElementById("start-div").hidden = true;
        document.getElementById("game-div").hidden = false;

        document.querySelector("#player1-name span").textContent = player1Name;
        document.querySelector("#player1-mark span").textContent = player1Mark;
        document.querySelector("#player2-name span").textContent = player2Name;
        document.querySelector("#player2-mark span").textContent = player2Mark;

        statusText.textContent = `${GameController.getCurrentPlayer().name}'s turn`;

        renderBoard();
    });

    const cells = document.querySelectorAll(".cell");

    const renderBoard = () => {
        const board = Gameboard.getBoard();
        cells.forEach((cell, index) => cell.firstElementChild.textContent = board[index]);
    }

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (GameController.isGameOver()) return;

            GameController.playRound(index);
            renderBoard();

            if (GameController.getWinner()) statusText.textContent = `${GameController.getWinner().name} wins!`;
            else if (GameController.isTie()) statusText.textContent = "It's a tie!";
            else statusText.textContent = `${GameController.getCurrentPlayer().name}'s turn`;
        });
    });

    return { renderBoard };
})();