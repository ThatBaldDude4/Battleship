import {Player, Gameboard, Ship} from "./game.js";

const gameContainer = document.getElementById("game-container");
const player1Container = document.getElementById("player1-container");
const player2Container = document.getElementById("player2-container");
const player1Board = document.getElementById("player1-board");
const player2Board = document.getElementById("player2-board");
const player1Ships = document.getElementById("player1-ships");
const player2Ships = document.getElementById("player2-ships");

const controller = {
    currentPlayer: null,
    winner: "null",
    players: {
        player1: new Player("Human"),
        player2: new Player("Computer"),
    }
};

function actions(payload) {
    const oppPlayer = controller.currentPlayer === controller.players.player1 ?
        controller.players.player2 :
        controller.players.player1;
}

function createBoard(board) {
    let html = "";
    board.forEach((row, x) => {
        row.forEach((cell, y) => {
            let ship = cell.ship ? "occupied" : "";
            let hit = cell.isHit ? "hit" : "";
            html += `<div class="grid-cell ${ship} ${hit}" data-cord="${[x, y]}"></div>`;
        })
    })
    return html;
};

document.addEventListener("click", (e) => {
    console.log("test")
    const cords = e.target.closest(".grid-cell")?.dataset.cord
    const board = e.target.closest(".board")?.dataset.player;

    if (cords && board) {
        console.log(cords, board);
    }
})

const player1 = new Player("person");
const player2 = new Player();

player1.gameboard.placeShip(player1.gameboard.ships[0], [9,5])
player1.gameboard.placeShip(player1.gameboard.ships[1], [8,3])
player1.gameboard.placeShip(player1.gameboard.ships[2], [2,3]);
player1.gameboard.placeShip(player1.gameboard.ships[3], [6,5])
player1.gameboard.placeShip(player1.gameboard.ships[4], [5,5])

player1.gameboard.receiveAttack([9, 5])
player1.gameboard.receiveAttack([9, 6])
player1.gameboard.receiveAttack([9, 7])
player1.gameboard.receiveAttack([9, 1])
console.log(player1.gameboard.board[9][5])
let string1 = createBoard(player1.gameboard.board);
let string2 = createBoard(player2.gameboard.board);

player1Board.innerHTML = string1;
player2Board.innerHTML = string2;

(() => {
    controller.currentPlayer = controller.players.player1
})()