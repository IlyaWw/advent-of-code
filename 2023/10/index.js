const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n');

/********** Day ten part one  **********/
const gridHeight = input.length;
const gridWidth = input[0].length;

const neighborByDir = {
  n: (x, y) => y !== 0 && { x, y: y - 1, from: 's' },
  s: (x, y) => y !== gridHeight - 1 && { x, y: y + 1, from: 'n' },
  w: (x, y) => x !== 0 && { x: x - 1, y, from: 'e' },
  e: (x, y) => x !== gridWidth - 1 && { x: x + 1, y, from: 'w' },
};

const allDirs = Object.keys(neighborByDir);

const dirByPipe = {
  '|': ['n', 's'],
  '-': ['w', 'e'],
  L: ['n', 'e'],
  J: ['n', 'w'],
  7: ['w', 's'],
  F: ['e', 's'],
  S: ['n', 's', 'w', 'e'],
};

// find starting tile
const startY = input.findIndex((line) => line.includes('S'));
const startX = input[startY].indexOf('S');

// find any attached pipe
const startDir = allDirs.find((dir) => {
  const neighbor = neighborByDir[dir](startX, startY);

  // if starting tile is on the edge
  if (!neighbor) return false;

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
const answer = cur.steps / 2;
console.log(answer);

/********** Day ten part two  **********/
const areasByPipe = {
  '|': { area1: ['w'], area2: ['e'] },
  '-': { area1: ['n'], area2: ['s'] },
  L: { area1: ['w', 's'], area2: [] },
  J: { area1: ['e', 's'], area2: [] },
  7: { area1: ['n', 'e'], area2: [] },
  F: { area1: ['n', 'w'], area2: [] },
};

// find starting tile
const startDirs = allDirs.filter((dir) => {
  const neighbor = neighborByDir[dir](startX, startY);

  // if starting tile is on the edge
  if (!neighbor) return false;

  const neighborDirs = dirByPipe[input[neighbor.y][neighbor.x]];
  return neighborDirs && neighborDirs.includes(neighbor.from);
});

// find pipe type of starting tile
const startPipe = Object.keys(areasByPipe).find((pipe) =>
  dirByPipe[pipe].every((dir) => startDirs.includes(dir))
);

// find neighbor areas for starting tile
const { area1: startA, area2: startB } = areasByPipe[startPipe];

// new grid where inside/outside areas are determined
const paintedGrid = new Array(gridHeight);
for (let i = 0; i < paintedGrid.length; i++) {
  paintedGrid[i] = new Array(gridWidth).fill('.');
}

paintedGrid[startY][startX] = startPipe;

// info about previous tile is passed between loops
let cursor = {
  x: startX,
  y: startY,
  pipe: startPipe,
  from: startDirs[0],
  A: startA,
  B: startB,
};

// inside and outside areas are named as A and B before any of them touches edge
let outsideArea;
const getOppositeArea = (area) => (area === 'A' ? 'B' : 'A');

const paintNeighbors = (x, y, dirs, sym) =>
  dirs.forEach((dir) => {
    const nei = neighborByDir[dir](x, y);
    if (nei) {
      if (paintedGrid[nei.y][nei.x] === '.') {
        paintedGrid[nei.y][nei.x] = sym;
      }
    } else {
      outsideArea = sym;
    }
  });

while (cursor.pipe !== 'S') {
  const { area1, area2 } = areasByPipe[cursor.pipe];

  // continue previosly painted areas
  let area1Symbol;
  if (cursor.A.length > 0) {
    area1Symbol = area1.some((dir) => cursor.A.includes(dir)) ? 'A' : 'B';
  } else {
    area1Symbol = area1.some((dir) => cursor.B.includes(dir)) ? 'B' : 'A';
  }
  const area2Symbol = getOppositeArea(area1Symbol);

  paintNeighbors(cursor.x, cursor.y, area1, area1Symbol);
  paintNeighbors(cursor.x, cursor.y, area2, area2Symbol);

  // define next pipe on the path
  const dir = dirByPipe[cursor.pipe].filter((dir) => dir !== cursor.from);
  const { x, y, from } = neighborByDir[dir](cursor.x, cursor.y);
  const pipe = input[y][x];
  paintedGrid[y][x] = pipe;

  cursor = { x, y, pipe, from, [area1Symbol]: area1, [area2Symbol]: area2 };
}

// expand painted areas
paintedGrid.forEach((line, y) =>
  line.forEach((tile, x) => {
    if (['A', 'B'].includes(tile)) paintNeighbors(x, y, allDirs, tile);
  })
);

// count inside tiles
const insideArea = getOppositeArea(outsideArea);
const answer2 = paintedGrid
  .map((line) => line.filter((tile) => tile === insideArea).length)
  .reduce((a, b) => a + b);

console.log(answer2);
