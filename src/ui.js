// payload = {players, root, phase}
function render(payload) {
    if (payload.phase === "battle") {
        renderPlayersBoards(payload.players, payload.root);
        renderStatus(payload.root, "Battle");
    };
    if (payload.phase === "setup") {
        renderHome(payload.root);
    };
    if (payload.phase === "ship-placement") {
        payload.root.innerHTML = createPlayerContainers(payload.direction, "Place Ship");
        renderPlayersBoards(payload.players, payload.root);
        renderShipPlacement(payload.players, payload.direction);
        renderStatus(payload.root, "Place Ships");
    };
    if (payload.phase === "game-over") {
        renderWinner(payload.root, payload.winner);
    };
    if (payload.phase === "add-ship-preview") {
        
        addClassToCells(payload.cords, payload.playerId);
    };
    if (payload.phase === "remove-ship-preview") {

    }
};

function addClassToCells(cords, playerId) {
    const root = document.querySelector(`#${playerId}-board`);
    
    cords.forEach(([x, y]) => {
        console.log(x, y)
        const element = root.querySelector(`[data-cord="${x},${y}"]`);
        element.classList.add("drop-preview");
    });
};

function removeClassFromCells(cords, playerId) {
    const root = document.querySelector(`#${playerId}-board`);
    cords.forEach(([x, y]) => {
        console.log(cords)
        const element = root.querySelector(`[data-cord="${x},${y}"]`);
        element.classList.remove("drop-preview");
    });
}

function createPlayerContainers(direction, status = "") {
    return `
    <div id="game-controls">
        <button id="direction-button">${direction.toUpperCase()}</button>
        <button id="start-game-button">START</button>
        <button id="reset-ship-placement">RESET</button>
        <div id="status-container"></div>
    </div>
    <div id="players-container">
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
    </div>
    `;
};

function renderStatus(root, status) {
    let container = root.querySelector("#status-container");
    if (!container) {return};

    container.textContent = `STATUS: ${status}`;
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

function renderWinner(root, winner) {
    root.innerHTML = `
    <h1>THERE HAS BEEN A WINNER</h1>
    <div>
        <h2>${winner.playerId.toUpperCase()} WON</h2>
        <button class="reset-button">RESET GAME</button>
        <button class="new-game-button">NEW GAME</button>
    </div>
    `;
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

function renderShipPlacement(players, direction) {
    let player1ShipsContainer = document.getElementById("player1-ships");
    let player2ShipsContainer = document.getElementById("player2-ships");

    if (players[0].playerType === "human") {
        players[0].gameboard.ships.forEach((ship, index) => {
            if (ship.isPlaced) {return};
            let shipStr = document.createElement("div");
            shipStr.className = `ship`;
            shipStr.setAttribute("draggable", "true");
            shipStr.setAttribute("data-index", index);
            shipStr.setAttribute("data-direction", `${direction}`);
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
            shipStr.setAttribute("data-direction", `${direction}`);
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

