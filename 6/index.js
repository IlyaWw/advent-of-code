const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n');

// Day six part one
const parseStr = (str) => [...str.matchAll(/\d+/g)].map((m) => Number(m[0]));
const [times, distances] = input.map(parseStr);

const getWinCount = (time, distance) => {
  // Solving quadratic equation
  const x1 = (time - Math.sqrt(time ** 2 - 4 * distance)) / 2;
  const x2 = (time + Math.sqrt(time ** 2 - 4 * distance)) / 2;

  const firstWin = x1 === Math.ceil(x1) ? x1 + 1 : Math.ceil(x1);
  const lastWin = x2 === Math.floor(x2) ? x2 - 1 : Math.floor(x2);

  return lastWin - firstWin + 1;
};

const answer = times.reduce(
  (res, time, idx) => res * getWinCount(time, distances[idx]),
  1
);

console.log(answer);