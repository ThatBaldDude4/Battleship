function render(payload) {
    if (payload.view = "in-progress") {
        payload.root.innerHTML = `
        <div id="player1-container">
            <h2>Player 1</h2>
            <div id="player1-board" class="board" data-player="player1"></div>
            <div id="player1-ships"></div>
        </div>
        <div id="player2-container">
            <h2>Player 2</h2>
            <div id="player2-board" class="board" data-player="player2"></div>
            <div id="player2-ships"></div>
        </div>
        `
    };
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

//may refactor so 2 container limit is removed
function renderPlayersBoards(players, container1, container2) {
    let boardStr1 = createBoard(players.player1.gameboard.board);
    let boardStr2 = createBoard(players.player2.gameboard.board);
    container1.innerHTML = boardStr1;
    container2.innerHTML = boardStr2;
}

export {createBoard, renderPlayersBoards};