const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString();

const board = input.split('\n').map((row) => row.split(''));

const directions = {
  up: {
    id: 'up',
    rotateId: 'right',
    next: (x, y) => [x, y - 1, y < 0],
  },
  right: {
    id: 'right',
    rotateId: 'down',
    next: (x, y) => [x + 1, y, x >= board[0].length - 1],
  },
  down: {
    id: 'down',
    rotateId: 'left',
    next: (x, y) => [x, y + 1, y >= board.length - 1],
  },
  left: {
    id: 'left',
    rotateId: 'up',
    next: (x, y) => [x - 1, y, x < 0],
  },
};

const startingPoint = input.match(/\^/).index;

let x = startingPoint % (board[0].length + 1);
let y = Math.floor(startingPoint / (board[0].length + 1));
let dir = directions.up;

let i = 0;
do {
  board[y][x] = '-';
  const [nextX, nextY, escaped] = dir.next(x, y);
  if (escaped) break;
  if (board[nextY][nextX] === '#') {
    dir = directions[dir.rotateId];
  } else {
    [x, y] = [nextX, nextY];
  }
  i++;
} while (true);

const answer = Array.from(
  board
    .map((row) => row.join(''))
    .join('\n')
    .matchAll('-')
).length;

console.log(answer);
