const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();

/********** Day six part one **********/

const board = input.split('\n').map((row) => row.split(''));

const directions = {
  up: {
    id: 'up',
    rotateId: 'right',
    next: (x, y) => [x, y - 1, y <= 0],
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
    next: (x, y) => [x - 1, y, x <= 0],
  },
};

const startingPoint = input.match(/\^/).index;

let x = startingPoint % (board[0].length + 1);
let y = Math.floor(startingPoint / (board[0].length + 1));
let dir = directions.up;
let walkedPath = {};

do {
  walkedPath[x]
    ? walkedPath[x][y]
      ? walkedPath[x][y].push(dir.id)
      : (walkedPath[x][y] = [dir.id])
    : (walkedPath[x] = { [y]: [dir.id] });

  const [nextX, nextY, escaped] = dir.next(x, y);
  if (escaped) break;
  if (board[nextY][nextX] === '#') {
    dir = directions[dir.rotateId];
  } else {
    [x, y] = [nextX, nextY];
  }
} while (true);

const answer = Object.values(walkedPath).reduce(
  (res, xs) => res + Object.keys(xs).length,
  0
);

console.log(answer);

/********** Day six part two **********/

x = startingPoint % (board[0].length + 1);
y = Math.floor(startingPoint / (board[0].length + 1));
dir = directions.up;
walkedPath = {};
let loopCount = 0;

do {
  walkedPath[x]
    ? walkedPath[x][y]
      ? walkedPath[x][y].push(dir.id)
      : (walkedPath[x][y] = [dir.id])
    : (walkedPath[x] = { [y]: [dir.id] });

  const [nextX, nextY, escaped] = dir.next(x, y);
  if (escaped) break;
  if (board[nextY][nextX] === '#') {
    dir = directions[dir.rotateId];
  } else {
    if (!walkedPath?.[nextX]?.[nextY]) {
      // place obstacle and check
      board[nextY][nextX] = '#';

      let checkDir = directions[dir.rotateId];
      let checkX = x,
        checkY = y;
      let checkSteps = 0;
      let checkWalkedPath = {};
      do {
        checkSteps++;
        checkWalkedPath[checkX]
          ? checkWalkedPath[checkX][checkY]
            ? checkWalkedPath[checkX][checkY].push(checkDir.id)
            : (checkWalkedPath[checkX][checkY] = [checkDir.id])
          : (checkWalkedPath[checkX] = { [checkY]: [checkDir.id] });

        const [checkNextX, checkNextY, checkEscaped] = checkDir.next(
          checkX,
          checkY
        );
        if (checkEscaped) break;

        if (
          (walkedPath?.[checkNextX]?.[checkNextY] &&
            walkedPath[checkNextX][checkNextY].includes(checkDir.id)) ||
          (checkWalkedPath?.[checkNextX]?.[checkNextY] &&
            checkWalkedPath[checkNextX][checkNextY].includes(checkDir.id))
        ) {
          loopCount++;
          break;
        }
        if (board[checkNextY][checkNextX] === '#') {
          checkDir = directions[checkDir.rotateId];
        } else {
          [checkX, checkY] = [checkNextX, checkNextY];
        }
      } while (true);
      board[nextY][nextX] = '.';
    }

    [x, y] = [nextX, nextY];
  }
} while (true);

const answer2 = loopCount;
console.log(answer2);
