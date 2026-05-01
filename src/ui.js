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

function createWinScreen(winner) {
    
}

export {createBoard, renderPlayersBoards};