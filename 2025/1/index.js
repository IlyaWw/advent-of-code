const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n');

const dirObj = { L: -1, R: 1 };

/********** Day one part one **********/

let cur = 50;
let count = 0;

input.forEach((row) => {
  const dir = dirObj[row[0]];
  const dist = Number(row.slice(1));

  cur = (cur + dir * dist + 100) % 100;

  if (cur === 0) count++;
});

console.log(count);

/********** Day one part two **********/

cur = 50;
count = 0;

const checkIntersections = (pos, count, startsWithZero) => {
  if (pos < 0) {
    const isZeroCrossed = !(startsWithZero && pos + 100 > 0);
    return checkIntersections(
      pos + 100,
      count + (isZeroCrossed ? 1 : 0),
      startsWithZero
    );
  }

  if (pos > 100) {
    return checkIntersections(pos - 100, count + 1);
  }

  if (pos === 0 || pos === 100) {
    return [0, count + 1];
  }

  return [pos, count];
};

input.forEach((row, i) => {
  const dir = dirObj[row[0]];
  const dist = Number(row.slice(1));

  [cur, count] = checkIntersections(cur + dir * dist, count, cur === 0);
});

console.log(count);
