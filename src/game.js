class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.isPlaced = false;
    };

    hit() {
        this.hits += 1;
    };

    isSunk() {
        let result = this.hits >= this.length
        this.sunk = result;
        return result;
    };

    markPlaced() {
        this.isPlaced = true;
    };

    markUnplaced() {
        this.isPlaced = false;
    }
}

class Gameboard {
    constructor() {
        this.board = Array.from({length: 10}, () => {
            return Array.from({length: 10}, () => {
                return {isHit: false, ship: null};
            })
        });
        this.ships = [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];
    };

    allPlaced() {
        return this.ships.every(ship => ship.isPlaced);
    }

    placeShip(ship, cord, direction = "horizontal") {
        let cordinates = this.getCordSet(ship.length, cord, direction)
        if (!this.validateCord(cordinates)) {return}

        cordinates.forEach((pair) => {
            this.board[pair[0]][pair[1]].ship = ship;
        });

        ship.markPlaced();
    };

    computerPlaceAllShips() {
        this.ships.forEach((ship) => {
            while (!ship.isPlaced) {
                let direction = Math.random > 0.5 ? "horizontal" : "vertical";
                this.placeShip(ship, this.getRandomCoordinate(), direction)
            }
        })
    };

    getRandomCoordinate() {
        let possibleMoves = [];
        this.board.forEach((array, y) => {
            array.forEach((cell, x) => {
                possibleMoves.push([x, y]);
            })
        })
        let randomIndex = Math.floor(Math.random() * ((possibleMoves.length - 1) - 0 + 1)) + 0;
        return possibleMoves[randomIndex];
    };

    getCordSet(shipLength, intialCord, direction = "horizontal") {
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
            let cellCheck = !cell?.ship
            let rangeCheck = x <= 9 && x >= 0 && y <= 9 && y >= 0;
            return cellCheck && rangeCheck;
        });
        return checked;
    }

    receiveAttack(cord) {
        let cell = this.board[cord[0]][cord[1]];
        if (!cell.isHit) {
            cell.isHit = true;
            if (cell.ship) {
                cell.ship.hit();
                cell.ship.isSunk();
            }
        }
    }

    allSunk() {
        let result = this.ships.every((ship) => {
            return ship.sunk;
        })
        return result;
    }
};

class Player {
    constructor(playerType = "computer") {
        this.gameboard = new Gameboard();
        this.playerType = playerType.toLowerCase();
        this.possibleMoves = this.getAllMoves();
    };

    // get all possible coordinates from 2d array
    getAllMoves() {
        let possibleMoves = [];
        this.gameboard.board.forEach((array, y) => {
            array.forEach((cell, x) => {
                possibleMoves.push([x, y]);
            })
        })
        return possibleMoves;
    };

    // Grab all stored possibleMoves, select one and remove it from the list
    computerMove() {
        let randomIndex = Math.floor(Math.random() * ((this.possibleMoves.length - 1) - 0 + 1)) + 0;
        let randomMove = this.possibleMoves[randomIndex];
        this.possibleMoves.splice(randomIndex, 1);
        return randomMove;
    }
};

export {Player, Gameboard, Ship}