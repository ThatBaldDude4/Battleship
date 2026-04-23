import { Gameboard } from "./game";

test('board has 10 rows', () => {
    let board = new Gameboard();
    expect(board.board.length).toBe(10)
});

test('board has 10 columns', () => {
    let game = new Gameboard();
    expect(game.board.every((row) => {
        return row.length === 10;
    })).toBe(true);
});

test('Each cell is an object that contains isHit key', () => {
    let game = new Gameboard();
    expect(game.board.every((row) => {
        return row.every((cell) => {
            return cell.hasOwnProperty("isHit");
        })
    })).toBe(true);
})