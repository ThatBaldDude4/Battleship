import {Player, Gameboard, Ship} from "./game.js";
import { createBoard, renderPlayersBoards, render } from "./ui.js";

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
    view: "playing",
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

    if (defender.playerType === "computer" && defender === controller.currentPlayer) {
        console.log("computer fired")
        let attackCord = defender.computerMove();
        attacker.gameboard.receiveAttack(attackCord);
        controller.currentPlayer = controller.currentPlayer === controller.players.player1 ? controller.players.player2: controller.players.player1;
    }

    if (defender.gameboard.allSunk()) {
        console.log("game over");
    }
    render({players: controller.players, view: controller.view, root: gameContainer})
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
});

//intialize IIFE
(() => {
    const player1 = controller.players.player1;
    const player2 = controller.players.player2

    player1.gameboard.placeShip(player1.gameboard.ships[0], [0,5])
    player1.gameboard.placeShip(player1.gameboard.ships[1], [2,3])
    player1.gameboard.placeShip(player1.gameboard.ships[2], [2,1]);
    player1.gameboard.placeShip(player1.gameboard.ships[3], [6,5], "vertical")
    player1.gameboard.placeShip(player1.gameboard.ships[4], [5,9]);

    player2.gameboard.placeShip(player2.gameboard.ships[0], [0,5])
    player2.gameboard.placeShip(player2.gameboard.ships[1], [2,3])
    player2.gameboard.placeShip(player2.gameboard.ships[2], [2,1]);
    player2.gameboard.placeShip(player2.gameboard.ships[3], [6,5], "vertical")
    player2.gameboard.placeShip(player2.gameboard.ships[4], [5,9]);

    controller.currentPlayer = controller.players.player1
    render({players: controller.players, view: controller.view, root: gameContainer})
})();  