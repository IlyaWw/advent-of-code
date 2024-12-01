const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n');

/********** Day one part one **********/

const leftList = [],
  rightList = [];

input.forEach((row) => {
  const [left, right] = row.split('   ');
  leftList.push(Number(left));
  rightList.push(Number(right));
});

leftList.sort();
rightList.sort();

const answer = leftList.reduce(
  (acc, cur, idx) => acc + Math.abs(cur - rightList[idx]),
  0
);

console.log(answer);

/********** Day one part two **********/

const similarityObj = rightList.reduce((acc, cur) => {
  acc[cur] = (acc[cur] || 0) + 1;
  return acc;
}, {});

const answer2 = leftList.reduce(
  (acc, cur) => acc + cur * (similarityObj[cur] || 0),
  0
);

console.log(answer2);
