const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n');

// Day ten part one
const neighborByDir = {
  up: (x, y) => ({ x, y: y - 1, from: 'down' }),
  down: (x, y) => ({ x, y: y + 1, from: 'up' }),
  left: (x, y) => ({ x: x - 1, y, from: 'right' }),
  right: (x, y) => ({ x: x + 1, y, from: 'left' }),
};

const dirByPipe = {
  '|': ['up', 'down'],
  '-': ['left', 'right'],
  L: ['up', 'right'],
  J: ['up', 'left'],
  7: ['left', 'down'],
  F: ['right', 'down'],
  S: ['up', 'down', 'left', 'right'],
};

// find starting tile
const startY = input.findIndex((line) => line.includes('S'));
const startX = input[startY].indexOf('S');

// find any attached pipe
const startDir = Object.keys(neighborByDir).find((dir) => {
  const neighbor = neighborByDir[dir](startX, startY);
  const neighborDirs = dirByPipe[input[neighbor.y][neighbor.x]];
  return neighborDirs && neighborDirs.includes(neighbor.from);
});

// follow the pipe counting steps to 'S'
const cur = { x: startX, y: startY, pipe: '', nextDir: startDir, steps: 0 };

while (cur.pipe !== 'S') {
  const next = neighborByDir[cur.nextDir](cur.x, cur.y);
  cur.pipe = input[next.y][next.x];
  cur.nextDir = dirByPipe[cur.pipe].filter((dir) => dir !== next.from);
  cur.x = next.x;
  cur.y = next.y;
  cur.steps += 1;
}

// divide by 2
console.log(cur.steps / 2);
