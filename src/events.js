function setupEvents(actions) {
    let draggedShip = null;

    document.addEventListener("click", (e) => {
        const cords = e.target.closest(".grid-cell")?.dataset.cord.split(",").map(Number);
        
        const player = e.target.closest(".board")?.dataset.player;
        const startBtn = e.target.closest("#start-game-button");

        const resetBtn = e.target.closest(".reset-button");
        const newGameBtn = e.target.closest(".new-game-button");
        const resetBoardBtn = e.target.closest("#reset-ship-placement");
        const directionBtn = e.target.closest("#direction-button");

        if (cords && player) {
            actions({cords: cords, player, type: "attack"})
        };
        if (startBtn) {
            actions({type: "start-battle"})
        };
        if (resetBtn || resetBoardBtn) {
            actions({type: "reset-game"})
        };
        if (newGameBtn) {
            actions({type: "new-game"})
        };
        if (directionBtn) {
            actions({type: "flip-placement-direction"})
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
        e.dataTransfer.setData("text/plain", e.target.closest(".ship")?.dataset.index);

        const shipContainer = e.target.closest(".ship-container");
        const shipsPlayer = shipContainer?.dataset.player;
        const ship = e.target.closest(".ship");
        draggedShip = ship;
        e.dataTransfer.setData("ship-owner", shipsPlayer);
    });

    document.addEventListener("dragover", (e) => {
        const cell = e.target.closest(".grid-cell");
        const cords = cell?.dataset.cord.split(",").map(Number);
        const boardOwner = e.target.closest(".board")?.dataset.player; // player1, player2
        const shipIndex = draggedShip?.dataset.index;
        const shipOwner = draggedShip.closest(".ship-container")?.dataset.player;
        

        if (cords) {
            e.preventDefault();
            actions({type: "add-ship-preview", cords, boardOwner, shipIndex, shipOwner});
        };
    });

    document.addEventListener("dragleave", (e) => {
        const cell = e.target.closest(".grid-cell");
        const cords = cell?.dataset.cord.split(",").map(Number);
        const boardOwner = e.target.closest(".board")?.dataset.player; // player1, player2
        const shipIndex = draggedShip?.dataset.index;
        const shipOwner = draggedShip.closest(".ship-container")?.dataset.player;
        

        if (cords) {
            e.preventDefault();
            actions({type: "remove-ship-preview", cords, boardOwner, shipIndex, shipOwner});
        };
    })

    document.addEventListener("drop", (e) => {
        e.preventDefault();
        const cord = e.target.closest(".grid-cell")?.dataset.cord?.split(",").map(Number);
        const player = e.target.closest(".board")?.dataset.player;
        const index = e.dataTransfer.getData("text/plain");
        const shipOwner = e.dataTransfer.getData("ship-owner");
        actions({index, player, type: "ship-placement", cord, shipOwner}) 
    });
};

export { setupEvents }