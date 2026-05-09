import {Player, Gameboard, Ship} from "./game.js";
import { createBoard, renderPlayersBoards, render } from "./ui.js";

const gameContainer = document.getElementById("game-container");

const controller = {
    currentPlayer: null,
    winner: null,
    phase: "setup",
    players: {
        player1: new Player("Human"),
        player2: new Player("Computer"),
    },
};

function actions(payload) {
    if (!payload){return};
    if (controller.winner) {
        console.log("game already won"); 
        return
    };

    if (payload.type === "start-battle") {
        let shipsCheck1 = controller.players.player1.gameboard.allPlaced();
        let shipCheck2 = controller.players.player2.gameboard.allPlaced();
        if (shipsCheck1 && shipCheck2) {
            controller.phase = "battle";
        }
    }

    if (payload.type === "ship-placement") {
        const shipOwner = controller.players[payload.shipOwner];
        const player = controller.players[payload.player];
        const ship = player.gameboard.ships[payload.index];
        const direction = payload.shipDirection;
        if (shipOwner !== player) {return};
        player.gameboard.placeShip(ship, payload.cord, direction);
    };

    if (payload.type === "start-game") {
        if (payload.playersValues) {
            controller.players.player1 = new Player(payload.playersValues.player1Value);
            controller.players.player2 = new Player(payload.playersValues.player2Value);
            controller.phase = "ship-placement";
            controller.currentPlayer = controller.players.player1;
            controller.winner = null;

            let player1 = controller.players.player1;
            let player2 = controller.players.player2;

            if (player1.playerType === "computer") {
                player1.gameboard.computerPlaceAllShips();
            };
            if (player2.playerType === "computer") {
                console.log("im a computer 2")
                player2.gameboard.computerPlaceAllShips();
            }
        };
    };

    if (payload.type === "attack" && controller.phase === "battle") {
        const defender = controller.players[payload.player];
        const attacker = controller.currentPlayer;
        let cell = defender.gameboard.board[payload.cords[0]][payload.cords[1]];

        // currentPlayer is defending and the clicked cell hasn't been clicked before
        if (defender !== controller.currentPlayer && !cell?.isHit) {
            controller.phase = "battle";
            defender.gameboard.receiveAttack(payload.cords);
            controller.currentPlayer = controller.currentPlayer === controller.players.player1 ? controller.players.player2 : controller.players.player1;
            if (defender.gameboard.allSunk()) {
                controller.phase = "game-over";
                render({phase: controller.phase, root: gameContainer, players: controller.players});
                return
            }
        };

        if (defender?.playerType === "computer" && defender === controller.currentPlayer) {
            console.log(defender.playerType)
            controller.phase = "battle";
            let attackCord = defender.computerMove();
            attacker.gameboard.receiveAttack(attackCord);
            controller.currentPlayer = controller.currentPlayer === controller.players.player1 ? controller.players.player2: controller.players.player1;
            if (attacker.gameboard.allSunk()) {
                controller.phase = "game-over";
                render({phase: controller.phase, root: gameContainer, players: controller.players});
                return;
            }
        };

        if (defender.gameboard.allSunk()) {
            console.log("game over");
        };
    };

    render({players: controller.players, phase: controller.phase, root: gameContainer});
};
 
// may want to refactor extra vars
document.addEventListener("click", (e) => {
    const cords = e.target.closest(".grid-cell")?.dataset.cord.split("");
    let finalCords;
    if (cords) {
        cords.splice(1, 1)
        finalCords = cords.map((str) => {return Number(str)})
    };
    // convert cords string to numbers

    const player = e.target.closest(".board")?.dataset.player;
    const startBtn = e.target.closest("#start-game-button");

    if (cords && player) {
        console.log("attack sent")
        actions({cords: finalCords, player, type: "attack"})
    };
    if (startBtn) {
        console.log("start button clicked");
        actions({type: "start-battle"})
        // Once phase is refactored finish here
    }
});

// double click ship to switch direction attribute
document.addEventListener("dblclick", (e) => {
    const ship = e.target.closest(".ship");
    if (ship) {
        let direction = ship.dataset.direction;
        if (!direction) {ship.setAttribute("data-direction", "vertical")};
        direction = direction === "horizontal" ? "vertical" : "horizontal";
        ship.setAttribute("data-direction", direction)
    };
})

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

document.addEventListener("dragstart", (e) => {
    e.dataTransfer.clearData();
    e.dataTransfer.setData("text/plain", e.target.closest(".ship")?.dataset.index);

    const shipContainer = e.target.closest(".ship-container");
    const shipsPlayer = shipContainer?.dataset.player;
    const ship = e.target.closest(".ship");
    e.dataTransfer.setData("ship-owner", shipsPlayer);
    e.dataTransfer.setData("direction", ship?.dataset.direction);
});

document.addEventListener("dragover", (e) => {
    if (e.target.closest(".grid-cell")) {
        e.preventDefault();
    }
})

document.addEventListener("drop", (e) => {
    console.log("drop");
    e.preventDefault();
    console.log("element dropped");
    const cord = e.target.closest(".grid-cell")?.dataset.cord?.split(",").map(Number);
    const player = e.target.closest(".board")?.dataset.player;
    const index = e.dataTransfer.getData("text/plain");
    const shipOwner = e.dataTransfer.getData("ship-owner");
    const shipDirection = e.dataTransfer.getData("direction");
    actions({index, player, type: "ship-placement", cord, shipOwner, shipDirection}) 
});

//start-game in actions intializes everything, only thing you
//need to carry forward is the playerType
function resetRound() {
    const player1Type = controller.players.player1.playerType;
    const player2Type = controller.players.player1.playerType;
    actions({
        playersValues: {
            player1Value: player1Type,
            player2Value: player2Type,
        },
        type: "start-game",
    });
}

function startGame() {
    render({root: gameContainer, phase: controller.phase})
}
startGame();

//After player type selection switch to ship placement.
//After ship placement confirmed carry over the board data
//into the players boards
//Render boards, then render ships below them

// Drag and drop listeners set up
// Placing ships is set up

// Need to have a rotate ship button
// Need to not allow attacks during ship placments
// Need to have random ship placements for computers
// Need a start game button after all ships placed

// Double click unplaced ship to change direction
// Need to rerender each ship

// TODO: Refactor ship direction into state instead of mutating DOM dataset directly