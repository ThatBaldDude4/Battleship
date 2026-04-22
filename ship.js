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