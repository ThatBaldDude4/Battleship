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
    winner: null,
    players: {
        player1: new Player("Human"),
        player2: new Player("Computer"),
    }
};

function actions(payload) {
    if (!payload || !payload.player || !payload.cords){return};
    if (controller.winner) {
        console.log("game already won"); 
        return
    };

    const defender = controller.players[payload.player];
    const attacker = controller.currentPlayer;
    let cell = defender.gameboard.board[payload.cords[0]][payload.cords[1]];

    // currentPlayer is defending and the clicked cell hasn't been clicked before
    if (defender !== controller.currentPlayer && !cell.isHit) {
        //if payload has coordiantes and the defender is the same as the board that got clicked:
        defender.gameboard.receiveAttack(payload.cords);
        controller.currentPlayer = controller.currentPlayer === controller.players.player1 ? controller.players.player2 : controller.players.player1;
        
    };

    if (defender.playerType === "computer") {
        let attackCord = defender.computerMove();
        attacker.gameboard.receiveAttack(attackCord);
        controller.currentPlayer = controller.currentPlayer === controller.players.player1 ? controller.players.player2: controller.players.player1;
    }

    if (attacker.playerType === "computer") {

    }

    if (defender.gameboard.allSunk()) {
        console.log("game over");
    }

    renderPlayersBoards(controller.players);
}

// may want to make modular
function renderPlayersBoards(players) {
    let string1 = createBoard(players.player1.gameboard.board);
    let string2 = createBoard(players.player2.gameboard.board);
    player1Board.innerHTML = string1;
    player2Board.innerHTML = string2;
}

function createBoard(board) {
    let html = "";
    let container = [];
    board.forEach((column, x) => {
        column.forEach((cell, y) => {
            let ship = cell.ship ? "occupied" : "";
            let hit = cell.isHit ? "hit" : "";
            html += `<div class="grid-cell ${ship} ${hit}" data-cord="${[x, y]}"></div>`;
        })
    })
    return html;
};
 
// may want to refactor extra vars
document.addEventListener("click", (e) => {
    const cords = e.target.closest(".grid-cell")?.dataset.cord.split("");
    let finalCords;
    if (cords) {
        cords.splice(1, 1)
        finalCords = cords.map((str) => {return Number(str)})
    }
    // convert cords string to numbers

    const player = e.target.closest(".board")?.dataset.player;

    if (cords && player) {
        actions({cords: finalCords, player})
    }
})

const player1 = controller.players.player1;
const player2 = controller.players.player2

player1.gameboard.placeShip(player1.gameboard.ships[0], [0,5])
player1.gameboard.placeShip(player1.gameboard.ships[1], [2,3])
player1.gameboard.placeShip(player1.gameboard.ships[2], [2,1]);
player1.gameboard.placeShip(player1.gameboard.ships[3], [6,5], "vertical")
player1.gameboard.placeShip(player1.gameboard.ships[4], [5,9]);

player2.gameboard.placeShip(player1.gameboard.ships[0], [0,5])
player2.gameboard.placeShip(player1.gameboard.ships[1], [2,3])
player2.gameboard.placeShip(player1.gameboard.ships[2], [2,1]);
player2.gameboard.placeShip(player1.gameboard.ships[3], [6,5], "vertical")
player2.gameboard.placeShip(player1.gameboard.ships[4], [5,9]);

let string1 = createBoard(player1.gameboard.board);
let string2 = createBoard(player2.gameboard.board);

player1Board.innerHTML = string1;
player2Board.innerHTML = string2;

(() => {
    controller.currentPlayer = controller.players.player1
})()