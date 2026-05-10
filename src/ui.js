// payload = {players, root, phase}
function render(payload) {
    if (payload.phase === "start-game") {
        payload.root.innerHTML = createPlayerContainers();
        renderPlayersBoards(payload.players, payload.root);
    };
    if (payload.phase === "battle") {
        renderPlayersBoards(payload.players, payload.root);
    };
    if (payload.phase === "setup") {
        renderHome(payload.root);
    };
    if (payload.phase === "ship-placement") {
        payload.root.innerHTML = createPlayerContainers();
        renderPlayersBoards(payload.players, payload.root);
        renderShipPlacement(payload.players);
    };
    if (payload.phase === "game-over") {
        renderWinner(payload.root);
    }
};

function createPlayerContainers() {
    return `
        <div id="player1-container">
            <h2>Player 1</h2>
            <div id="player1-board" class="board" data-player="player1"></div>
            <div id="player1-ships" class="ship-container" data-player="player1"></div>
        </div>
        <div id="player2-container">
            <h2>Player 2</h2>
            <div id="player2-board" class="board" data-player="player2"></div>
            <div id="player2-ships" class="ship-container" data-player="player2"></div>
        </div>
        <button id="start-game-button">START</button>
    `;
};

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

function renderWinner(root) {
    root.innerHTML = `<h1>THERE HAS BEEN A WINNER</h1>`;
    // eventually add reset/new game buttons here
}

//may refactor so 2 container limit is removed
function renderPlayersBoards(players, root) {
    let boardStr1 = createBoard(players[0].gameboard.board);
    let boardStr2 = createBoard(players[1].gameboard.board);
    root.querySelector("#player1-board").innerHTML = boardStr1;
    root.querySelector("#player2-board").innerHTML = boardStr2;
}

function renderHome(root) {
    root.innerHTML = `
    <form id="home-form">
        <label id="player1-selection-label">
            Player One Type:
            <select id="player1-selection">
                <option value="human">Human</option>
                <option value="computer">Computer</option>
            </select>
        </label>
        <label id="player2-selection-label">
            Player Two Type:
            <select id="player2-selection">
                <option value="human">Human</option>
                <option value="computer">Computer</option>
            </select>
        </label>
        <button>Submit</button>
    </form>
    `
};

function renderShipPlacement(players) {
    let player1ShipsContainer = document.getElementById("player1-ships");
    let player2ShipsContainer = document.getElementById("player2-ships");

    if (players[0].playerType === "human") {
        players[0].gameboard.ships.forEach((ship, index) => {
            if (ship.isPlaced) {return};
            let shipStr = document.createElement("div");
            shipStr.className = `ship`;
            shipStr.setAttribute("draggable", "true");
            shipStr.setAttribute("data-index", index);
            shipStr.setAttribute("data-direction", "vertical");
            for (let i = 0; i < ship.length; i++) {
                let shipCell = document.createElement("div");
                shipCell.className = `ship-cell`;
                shipStr.appendChild(shipCell);
            };
            player1ShipsContainer.appendChild(shipStr);
        });
    };

    if (players[1].playerType === "human") {
        players[1].gameboard.ships.forEach((ship, index) => {
            if (ship.isPlaced){return};
            let shipStr = document.createElement("div");
            shipStr.className = `ship`;
            shipStr.setAttribute("draggable", "true");
            shipStr.setAttribute("data-index", index);
            shipStr.setAttribute("data-direction", "vertical");
            for (let i = 0; i < ship.length; i++) {
                let shipCell = document.createElement("div");
                shipCell.className = `ship-cell`;
                shipStr.appendChild(shipCell);
            };
            player2ShipsContainer.appendChild(shipStr);
        });
    };
};

export {createBoard, renderPlayersBoards, render};

