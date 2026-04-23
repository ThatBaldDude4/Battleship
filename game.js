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
        console.log(cordinates);
        cordinates.forEach((pair) => {
            this.board[pair[0]][pair[1]].ship = ship;
        });
    };


    // need to validate cordinates to make sure they dont go off board
    getCordSet(shipLength, intialCord, direction) {
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
                return num + offset[index];
            })
        };

        return set;
    }
};

let game = new Gameboard();
let ship1 = new Ship(4)
game.placeShip(ship1, [4, 4], "vertical")
console.log(game.board);

export {Gameboard};
