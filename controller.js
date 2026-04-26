import {Player, Gameboard, Ship} from "./game.js";

const gameContainer = document.getElementById("game-container");
const player1Container = document.getElementById("player1-container");
const player2Container = document.getElementById("player2-container");
const player1Ships = document.getElementById("player1-ships");
const player2Ships = document.getElementById("player2-ships");

function controller(pack) {
    
}

function createBoard(board) {
    let html = "";
    board.forEach((row, y) => {
        row.forEach((cell, x) => {
            html += `<div class="grid-cell" data-cord="${[x, y]}"></div>`;
        })
    })
    return html;
};
let game = new Gameboard()
let string = createBoard(game.board)
console.log(string);