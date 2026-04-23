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
                return {isHit: false, ship: null};
            })
        });
    }

    placeShip(ship, cord, direction) {
        let cordinates = this.getCordSet(ship.length, cord)
        if (!this.validateCord(cordinates)) {return}

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
        let checked = cordSet.every(([x, y]) => {
            let cell = this.board[x][y];
            let cellCheck = !cell.ship
            let rangeCheck = x <= 9 && x >= 0 && y <= 9 && y >= 0;
            return cellCheck && rangeCheck;
        });
        return checked;
    }
};

let game = new Gameboard();
let ship1 = new Ship(5)
game.placeShip(ship1, [8, 5], "vertical")
game.placeShip(ship1, [8, 0], "vertical")
console.log(game.board);

export {Gameboard};
