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

// Day eight part two
startNodes = Object.keys(network).filter((node) => node.endsWith('A'));

minSteps = startNodes.map((node) => {
  let currInstr = (stepCount = 0);
  let currNode = node;

  while (!currNode.endsWith('Z')) {
    currNode = network[currNode][instructions[currInstr]];
    currInstr = (currInstr + 1) % instrLen;
    stepCount += 1;
  }

  return stepCount;
});

const gcd = (a, b) => (b == 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a / gcd(a, b)) * b;
const lcmAll = (ns) => ns.reduce(lcm, 1);

console.log(lcmAll(minSteps));
