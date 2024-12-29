const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();

/********** Day ten part one **********/

const board = input
  .split('\n')
  .map((row) => row.split('').map((cell) => Number(cell)));

const ortho = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const searchSummits = (x, y) => {
  const res = new Set();

  ortho.forEach((neighbor) => {
    const [dx, dy] = neighbor;
    const nx = x + dx;
    const ny = y + dy;
    if (board?.[ny]?.[nx]) {
      if (board[ny][nx] - 1 === board[y][x]) {
        if (board[ny][nx] === 9) {
          res.add(`${nx},${ny}`);
        } else {
          searchSummits(nx, ny).forEach((val) => res.add(val));
        }
      }
    }
  });

  return res;
};

const answer = board.reduce(
  (res, row, i) =>
    res +
    row.reduce((res, point, j) => {
      if (point === 0) {
        return res + searchSummits(j, i).size;
      }
      return res;
    }, 0),
  0
);

console.log(answer);

/********** Day ten part two **********/

const countTrails = (x, y) => {
  let res = 0;

  ortho.forEach((neighbor) => {
    const [dx, dy] = neighbor;
    const nx = x + dx;
    const ny = y + dy;
    if (board?.[ny]?.[nx]) {
      if (board[ny][nx] - 1 === board[y][x]) {
        if (board[ny][nx] === 9) {
          res++;
        } else {
          res += countTrails(nx, ny);
        }
      }
    }
  });

  return res;
};

const answer2 = board.reduce(
  (res, row, i) =>
    res +
    row.reduce((res, point, j) => {
      if (point === 0) {
        return res + countTrails(j, i);
      }
      return res;
    }, 0),
  0
);

console.log(answer2);
