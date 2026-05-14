import {Player, Gameboard, Ship} from "./game.js";
import { createBoard, renderPlayersBoards, render } from "./ui.js";
import { setupEvents } from "./events.js";

const gameContainer = document.getElementById("game-container");

const controller = {
    currentPlayer: null,
    winner: null,
    phase: "setup",
    players: [new Player("Human", "player1"), new Player("Computer", "player2")]
};

function actions(payload) {
    if (!payload){return};

    if (payload.type === "new-game") {
        startGame();
    }

    if (payload.type === "start-battle") {
        // check to make sure every player has all ships placed
        if (controller.players.every(player => player.gameboard.allPlaced())) {
            controller.phase = "battle";
        }
        handleComputerTurns();
    }

    if (payload.type === "ship-placement") {
        const shipOwner = getPlayersFromId(controller.players, payload.shipOwner);
        const player = getPlayersFromId(controller.players, payload.player);
        const ship = player.gameboard.ships[payload.index];
        const direction = payload.shipDirection;
        if (shipOwner !== player) {return};
        player.gameboard.placeShip(ship, payload.cord, direction);
    };

    if (payload.type === "start-game") {
        if (payload.playersValues) {
            startNewGame(payload.playersValues);
        };
    };

    if (payload.type === "reset-game") {
        if (controller.phase === "battle") {return}
        startNewGame({
            player1Value: controller.players[0].playerType,
            player2Value: controller.players[1].playerType,
        });

    }

    if (payload.type === "attack" && controller.phase === "battle") {
        const defender = getPlayersFromId(controller.players, payload.player);
        const attacker = controller.currentPlayer;
        let cell = defender.gameboard.board[payload.cords[0]][payload.cords[1]];

        // currentPlayer is defending and the clicked cell hasn't been clicked before
        if (defender !== controller.currentPlayer && !cell?.isHit) {
            let attackResult = defender.gameboard.receiveAttack(payload.cords);
            handleAttackResult(attacker, attackResult);
            switchCurrentPlayer();
            if (defender.gameboard.allSunk()) {
                handleWonGame();
                return
            };
        };

        if (defender?.playerType === "computer" && defender === controller.currentPlayer) {
            let attackCord = defender.computerMove();
            let attackResult = attacker.gameboard.receiveAttack(attackCord);
            handleAttackResult(defender, attackResult);
            switchCurrentPlayer();
            if (attacker.gameboard.allSunk()) {
                handleWonGame();
                return;
            }
        };

    };

    render({players: controller.players, phase: controller.phase, root: gameContainer, winner: controller.winner});
};

function startNewGame(playersValues) {
    if (!playersValues) {return};

    controller.players[0] = new Player(playersValues.player1Value, "player1");
    controller.players[1] = new Player(playersValues.player2Value, "player2");
    controller.phase = "ship-placement";
    controller.currentPlayer = controller.players[0];
    controller.winner = null;

    let player1 = controller.players[0];
    let player2 = controller.players[1];

    if (player1.playerType === "computer") {
        player1.gameboard.computerPlaceAllShips();
    };
    if (player2.playerType === "computer") {
        player2.gameboard.computerPlaceAllShips();
    };
};

function handleAttackResult(attacker, result) {
    if (result.isShip) {
        attacker.lastHitShipCord = result.cord;
    }else {
        attacker.lastHitShipCord = null;
    };
};

function handleComputerTurns() {
    if (controller.currentPlayer.playerType !== "computer") {return}
    const attacker = controller.currentPlayer;
    const defender = controller.players[0] === attacker ? controller.players[1] : controller.players[0];
    let attack = attacker.computerMove();
    let attackResult = defender.gameboard.receiveAttack(attack);
    handleAttackResult(attacker, attackResult);

    if (defender.gameboard.allSunk()) {
        controller.phase = "game-over";
        controller.winner = attacker;
        render({phase: controller.phase, root: gameContainer, players: controller.players, winner: controller.winner});
        return;
    };

    switchCurrentPlayer()
    render({phase: controller.phase, root: gameContainer, players: controller.players});

    if (controller.phase === "battle") {
        setTimeout(handleComputerTurns, 100);
    };
};

function handleWonGame() {
    controller.phase = "game-over";
    controller.winner = attacker;
    render({phase: controller.phase, root: gameContainer, players: controller.players, winner: controller.winner});
};

function getPlayersFromId(players, id) {
    return players.find(player => player.playerId === id);
};

// flips current player from player1 to player2 and vice versa
function switchCurrentPlayer() {
    controller.currentPlayer = controller.currentPlayer === controller.players[0] ?
    controller.players[1] :
    controller.players[0];
};

function startGame() {
    controller.phase = "setup"
    render({root: gameContainer, phase: controller.phase})
};

// intialize game
startGame();
// pass actions dispatcher into events
setupEvents(actions);