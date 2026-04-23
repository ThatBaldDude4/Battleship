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
        let cordinates = this.validateCord(this.getCordSet(ship.length, cord, direction));
        if (cordinates.length === 0) {return}; // no valid cordinates, early exit
        cordinates.forEach((pair) => {
            this.board[pair[0]][pair[1]].ship = ship;
        });
    };


    // need to validate cordinates to make sure they dont go off board / aren't already occupied
    // getCordSet is coupled with validation logic, seperate out the functions
    // validation also needs to check if spot is already occupied
    getCordSet(shipLength, intialCord, direction = "vertical") {
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
                return num + offset[index];;
            })
        };
        return set;
    };

    // checks that cords are in board range
    // makes sure each cell isnt occupied 
    validateCord(cordSet) {
        let intialLength = cordSet.length;
        let filtered = cordSet.filter(([x, y]) => {
            return x <= 9 && y <= 9;
        });
        filtered = filtered.filter(([x, y]) => {
            let cell = this.board[x][y];
            return !Object.hasOwn(cell, "ship");
        })
        return filtered.length === intialLength ? filtered : [];
    }
};

let game = new Gameboard();
let ship1 = new Ship(5)
game.placeShip(ship1, [8, 5], "vertical")
game.placeShip(ship1, [8, 3], "vertical")
console.log(game.board);

export {Gameboard};
