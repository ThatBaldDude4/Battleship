// payload = {players, root, view}
function render(payload) {
    if (payload.view === "start-game") {
        payload.root.innerHTML = createPlayerContainers();
        renderPlayersBoards(payload.players, payload.root);
    };
    if (payload.view === "playing") {
        renderPlayersBoards(payload.players, payload.root);
    };
    if (payload.view === "won") {
        renderPlayersBoards(payload.players, payload.root);
        renderWinner(payload.root)
    };
    if (payload.view === "home") {
        renderHome(payload.root);
    };
    if (payload.view === "place-ships") {
        payload.root.innerHTML = createPlayerContainers();
        renderPlayersBoards(payload.players, payload.root);
        renderShipPlacement(payload.players);
    }
};

function createPlayerContainers() {
    return `
        <div id="player1-container">
            <h2>Player 1</h2>
            <div id="player1-board" class="board" data-player="player1"></div>
            <div id="player1-ships" class="ship-container"></div>
        </div>
        <div id="player2-container">
            <h2>Player 2</h2>
            <div id="player2-board" class="board" data-player="player2"></div>
            <div id="player2-ships" class="ship-container"></div>
        </div>
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
    root.innerHTML += `<h1>THERE HAS BEEN A WINNER</h1>`;
}

//may refactor so 2 container limit is removed
function renderPlayersBoards(players, root) {
    let boardStr1 = createBoard(players.player1.gameboard.board);
    let boardStr2 = createBoard(players.player2.gameboard.board);
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

    if (players.player1.playerType === "human") {
        players.player1.gameboard.ships.forEach((ship, index) => {
            if (ship.isPlaced) {return};
            let shipStr = document.createElement("div");
            shipStr.className = `ship`;
            shipStr.setAttribute("draggable", "true");
            shipStr.setAttribute("data-index", index);
            for (let i = 0; i < ship.length; i++) {
                let shipCell = document.createElement("div");
                shipCell.className = `ship-cell`;
                shipStr.appendChild(shipCell);
            };
            player1ShipsContainer.appendChild(shipStr);
        });
    };

    if (players.player2.playerType === "human") {
        players.player2.gameboard.ships.forEach((ship, index) => {
            if (ship.isPlaced){return};
            let shipStr = document.createElement("div");
            shipStr.className = `ship`;
            shipStr.setAttribute("draggable", "true");
            shipStr.setAttribute("data-index", index);
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

