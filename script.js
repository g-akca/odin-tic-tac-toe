const Gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;

    return { getBoard };
})();

const Player = (name, marker) => {
    return { name, marker };
}

const GameController = (() => {

})();

const DisplayController = (() => {

})();