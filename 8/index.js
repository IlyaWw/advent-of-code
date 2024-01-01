const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n');

// Day eight part one
const startNode = 'AAA';
const endNode = 'ZZZ';

const [instructions, , ...networkArr] = input;

const network = networkArr.reduce((res, line) => {
  const [node, L, R] = line.split(/\W+/);
  res[node] = { L, R };
  return res;
}, {});

let currInstr = (stepCount = 0);
let currNode = startNode;
const instrLen = instructions.length;

while (currNode !== endNode) {
  currNode = network[currNode][instructions[currInstr]];
  currInstr = (currInstr + 1) % instrLen;
  stepCount += 1;
}

console.log(stepCount);
