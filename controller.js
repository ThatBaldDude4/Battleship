import {Player, Gameboard, Ship} from "./game.js";

const gameContainer = document.getElementById("game-container");
const player1Container = document.getElementById("player1-container");
const player2Container = document.getElementById("player2-container");
const player1Board = document.getElementById("player1-board");
const player2Board = document.getElementById("player2-board");
const player1Ships = document.getElementById("player1-ships");
const player2Ships = document.getElementById("player2-ships");

function controller(pack) {
    
}

function createBoard(board) {
    let html = "";
    board.forEach((row, y) => {
        row.forEach((cell, x) => {
            let ship = cell.ship ? "occupied" : "";
            html += `<div class="grid-cell ${ship}" data-cord="${[x, y]}"></div>`;
        })
    })
    return html;
};

player1Board.addEventListener("click", (e) => {
    const cords = e.target.dataset.cord; //e.currentTarget for parent container
    const player = e.currentTarget.dataset.player;
    console.log({cord: cords, play: player})
})

player2Board.addEventListener("click", (e) => {
    const cords = e.target.dataset.cord; //e.currentTarget for parent container
    const player = e.currentTarget.dataset.player;
    console.log({cord: cords, play: player})
})

const player1 = new Player("person");
const player2 = new Player();

player1.gameboard.placeShip(player1.gameboard.ships[0], [3,3])

let string1 = createBoard(player1.gameboard.board);
let string2 = createBoard(player2.gameboard.board);

player1Board.innerHTML = string1;
player2Board.innerHTML = string2;