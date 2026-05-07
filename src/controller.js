import {Player, Gameboard, Ship} from "./game.js";
import { createBoard, renderPlayersBoards, render } from "./ui.js";

const gameContainer = document.getElementById("game-container");

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

    if (payload.type === "place-ship") {
        const shipOwner = controller.players[payload.shipOwner];
        const player = controller.players[payload.player];
        const ship = player.gameboard.ships[payload.index];
        if (shipOwner !== player) {return};
        player.gameboard.placeShip(ship, payload.cord, "vertical");
    };

    if (payload.type === "start-game") {
        if (payload.playersValues) {
            controller.players.player1 = new Player(payload.playersValues.player1Value);
            controller.players.player2 = new Player(payload.playersValues.player2Value);
            controller.view = "place-ships";
            controller.currentPlayer = controller.players.player1;
            controller.winner = null;
        };
    };

    if (payload.type === "attack" && controller.view !== "place-ships") {
        const defender = controller.players[payload.player];
        const attacker = controller.currentPlayer;
        let cell = defender.gameboard.board[payload.cords[0]][payload.cords[1]];

        // currentPlayer is defending and the clicked cell hasn't been clicked before
        if (defender !== controller.currentPlayer && !cell?.isHit) {
            controller.view = "playing";
            defender.gameboard.receiveAttack(payload.cords);
            controller.currentPlayer = controller.currentPlayer === controller.players.player1 ? controller.players.player2 : controller.players.player1;
            if (defender.gameboard.allSunk()) {
                controller.view = "won";
                render({view: controller.view, root: gameContainer, players: controller.players});
                return
            }
        };

        if (defender?.playerType === "computer" && defender === controller.currentPlayer) {
            console.log(defender.playerType)
            controller.view = "playing";
            let attackCord = defender.computerMove();
            attacker.gameboard.receiveAttack(attackCord);
            controller.currentPlayer = controller.currentPlayer === controller.players.player1 ? controller.players.player2: controller.players.player1;
            if (attacker.gameboard.allSunk()) {
                controller.view = "won";
                render({view: controller.view, root: gameContainer, players: controller.players});
                return;
            }
        };

        if (defender.gameboard.allSunk()) {
            console.log("game over");
        };
    };

    render({players: controller.players, view: controller.view, root: gameContainer});
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
        // Once view is refactored finish here
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

document.addEventListener("dragstart", (e) => {
    e.dataTransfer.clearData();
    e.dataTransfer.setData("text/plain", e.target.closest(".ship").dataset.index);

    const shipContainer = e.target.closest(".ship-container");
    const shipsPlayer = shipContainer?.dataset.player;
    e.dataTransfer.setData("ship-owner", shipsPlayer);
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
    actions({index, player, type: "place-ship", cord, shipOwner}) 
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
    render({root: gameContainer, view: controller.view})
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

// Need to rename "views" so that they are more descriptive and accurate

// Load form ->
// Load boards to place ships ->
// After ship placements finalized -> 
// Allow attacks ->
// Once player wins -> 
// display win screen ->

// If new game selected go to form
// If continue selected go to ship placements

// Form (player type)
// Place Ships (board + ships)
// Battle (attacks)
// Game Over (player won)
// Reset Game -> go to place ships
// New game -> go to player form
