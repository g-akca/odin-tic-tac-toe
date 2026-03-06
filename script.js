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

})();

const DisplayController = (() => {

})();