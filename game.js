class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    };

    hit() {
        this.hits += 1;
    }

    isSunk() {
        let result = this.hits >= this.length
        this.sunk = result;
        return result;
    }
}

class Gameboard {
    constructor() {
        this.board = Array.from({length: 10}, () => {
            return Array.from({length: 10}, () => {
                return {isHit: false};
            })
        });
    }

    placeShip(ship, cord, direction) {
        let cordinates = this.getCordSet(ship.length, cord, direction);
        if (!cordinates) {throw new Error("invalid ship placement")};
        console.log(cordinates);
        cordinates.forEach((pair) => {
            this.board[pair[0]][pair[1]].ship = ship;
        });
    };


    // need to validate cordinates to make sure they dont go off board / aren't already occupied
    getCordSet(shipLength, intialCord, direction) {
        if (intialCord[0] > 9 || intialCord[1] > 9) {throw new Error("Cordinate outside board range")};
        let set = [];
        let offset;
        let startCord = [...intialCord];
        if (direction.toLowerCase() === "vertical") {
            offset = [0, 1];
        };
        if (direction.toLowerCase() === "horizontal") {
            offset = [1, 0];
        };

        for (let i = 0; i < shipLength; i++) {
            set.push(startCord);
            startCord = startCord.map((num, index) => {
                let cord = num + offset[index];
                if (cord > 9) {throw new Error("Cordinate outside board range")}
                return cord;
            })
        };

        return set.length === shipLength ? set : null;
    }
};

let game = new Gameboard();
let ship1 = new Ship(5)
game.placeShip(ship1, [8, 5], "vertical")
console.log(game.board);

export {Gameboard};
