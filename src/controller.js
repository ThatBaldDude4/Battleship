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
    view: "home",
    players: {
        player1: new Player("Human"),
        player2: new Player("Computer"),
    }
};

function actions(payload) {
    if (!payload){return};
    if (controller.winner) {
        console.log("game already won"); 
        return
    };

    if (payload.type === "start-game") {
        if (payload.playersValues) {
            controller.players.player1 = new Player(payload.playersValues.player1Value);
            controller.players.player2 = new Player(payload.playersValues.player2Value);
            controller.view = "start-game";
        };
    };

    if (payload.type === "attack") {
        const defender = controller.players[payload.player];
        const attacker = controller.currentPlayer;
        let cell = defender.gameboard.board[payload.cords[0]][payload.cords[1]];

        // currentPlayer is defending and the clicked cell hasn't been clicked before
        if (defender !== controller.currentPlayer && !cell?.isHit && defender) {
            controller.view = "playing";
            defender.gameboard.receiveAttack(payload.cords);
            controller.currentPlayer = controller.currentPlayer === controller.players.player1 ? controller.players.player2 : controller.players.player1;
            if (defender.gameboard.allSunk()) {
                controller.view = "won";
                render({view: controller.view, root: gameContainer, players: controller.players});
                return
            }
        };

        if (defender?.playerType === "computer" && defender === controller.currentPlayer && defender) {
            controller.view = "playing";
            let attackCord = defender.computerMove();
            attacker.gameboard.receiveAttack(attackCord);
            controller.currentPlayer = controller.currentPlayer === controller.players.player1 ? controller.players.player2: controller.players.player1;
            if (attacker.gameboard.allSunk()) {
                controller.view = "won";
                render({view: controller.view, root: gameContainer, players: controller.players});
                return;
            }
        }

        if (defender.gameboard.allSunk()) {
            console.log("game over");
        }
    };

    console.log(controller.players)
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
        actions({cords: finalCords, player, type: "attack"})
    }
});

document.addEventListener("submit", (e) => {
    e.preventDefault();
    const player1Value = document.getElementById("player1-selection").value;
    const player2Value = document.getElementById("player2-selection").value;
    actions({
        playersValues: {
            player1Value: player1Value,
            player2Value: player2Value,
        },
        type: "start-game",
    });
});

function startGame() {
    render({root: gameContainer, view: controller.view})
}

//intialize IIFE
// (() => {
//     const player1 = controller.players.player1;
//     const player2 = controller.players.player2

//     player1.gameboard.placeShip(player1.gameboard.ships[0], [0,5], "vertical")
//     player1.gameboard.placeShip(player1.gameboard.ships[1], [2,3])
//     player1.gameboard.placeShip(player1.gameboard.ships[2], [2,1]);
//     player1.gameboard.placeShip(player1.gameboard.ships[3], [6,5], "vertical")
//     player1.gameboard.placeShip(player1.gameboard.ships[4], [5,9]);

//     player2.gameboard.placeShip(player2.gameboard.ships[0], [0,5])
//     player2.gameboard.placeShip(player2.gameboard.ships[1], [2,3])
//     player2.gameboard.placeShip(player2.gameboard.ships[2], [2,1]);
//     player2.gameboard.placeShip(player2.gameboard.ships[3], [6,5], "vertical")
//     player2.gameboard.placeShip(player2.gameboard.ships[4], [5,9]);

//     controller.currentPlayer = controller.players.player1

//     render({players: controller.players, view: controller.view, root: gameContainer})
// })();

startGame();

//Start game loads the home form page
//Need to fix bug - 1 turn delay for computer to start working
//Form not proplery setting player type
//Need to decide how im going to display ships
//Add a type checkout in actions to detrimine start-game vs in game rendering (avoids the ?. checks)
