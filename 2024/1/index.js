const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n');

/********** Day one part one **********/
const aList = [],
  bList = [];

input.forEach((row) => {
  const [a, b] = row.split('   ');
  aList.push(Number(a));
  bList.push(Number(b));
});

aList.sort();
bList.sort();

const answer = aList.reduce(
  (acc, cur, idx) => acc + Math.abs(cur - bList[idx]),
  0
);

console.log(answer);
