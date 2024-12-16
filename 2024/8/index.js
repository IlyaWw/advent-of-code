const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n');

const nodesObj = {};

input.forEach((row, y) =>
  row.split('').forEach((cell, x) => {
    if (cell !== '.') {
      nodesObj[cell]
        ? nodesObj[cell].push({ y, x })
        : (nodesObj[cell] = [{ y, x }]);
    }
  })
);

const antinodesObj = {};
const height = input.length;
const width = input[0].length;

const addAntinode = (x, y) => {
  if (x >= 0 && x < width && y >= 0 && y < height)
    if (antinodesObj[y]) {
      antinodesObj[y].add(x);
    } else {
      antinodesObj[y] = new Set([x]);
    }
};

Object.values(nodesObj).forEach((nodes) => {
  for (let i = 0; i < nodes.length - 1; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      addAntinode(nodes[i].x + dx, nodes[i].y + dy);
      addAntinode(nodes[j].x - dx, nodes[j].y - dy);
    }
  }
});

const answer = Object.values(antinodesObj).reduce(
  (res, cur) => res + cur.size,
  0
);

console.log(answer);
