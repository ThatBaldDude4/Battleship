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
        this.board = Array.from({length:10}, () => Array(10).fill({isHit: false}));
    }

    placeShip(ship, cord, direction) {

    };

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

console.log(game.getCordSet(4, [3, 4], "vertical"));

export {Gameboard};
