function setupEvents(actions) {
    // may want to refactor extra vars
    document.addEventListener("click", (e) => {
        // convert cords string to numbers
        const cords = e.target.closest(".grid-cell")?.dataset.cord.split(",").map(Number);
        
        const player = e.target.closest(".board")?.dataset.player;
        const startBtn = e.target.closest("#start-game-button");

        const resetBtn = e.target.closest(".reset-button");
        const newGameBtn = e.target.closest(".new-game-button");

        if (cords && player) {
            actions({cords: cords, player, type: "attack"})
        };
        if (startBtn) {
            actions({type: "start-battle"})
            // Once phase is refactored finish here
        };
        if (resetBtn) {
            actions({type: "reset-game"})
        };
        if (newGameBtn) {
            console.log("new game")
            startGame()
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
        const cord = e.target.closest(".grid-cell")?.dataset.cord?.split(",").map(Number);
        const player = e.target.closest(".board")?.dataset.player;
        const index = e.dataTransfer.getData("text/plain");
        const shipOwner = e.dataTransfer.getData("ship-owner");
        const shipDirection = e.dataTransfer.getData("direction");
        actions({index, player, type: "ship-placement", cord, shipOwner, shipDirection}) 
    });
};

export { setupEvents }