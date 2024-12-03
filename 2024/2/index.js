const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n');

/********** Day two part one **********/

const MAX_SAFE_DISTANCE = 3;

const isPairUnsafe = (prev, next, isInc) => {
  const diff = next - prev;
  if (diff > 0) return !isInc || Math.abs(diff) > MAX_SAFE_DISTANCE;
  if (diff < 0) return isInc || Math.abs(diff) > MAX_SAFE_DISTANCE;
  return true;
};

const isRowUnsafe = (report) => {
  const diff = report[1] - report[0];
  const isInc = diff > 0;

  let unsafe = false;
  for (let idx = 1; idx < report.length && !unsafe; idx++) {
    unsafe = isPairUnsafe(report[idx - 1], report[idx], isInc);
  }

  return unsafe;
};

const answer = input.reduce((ans, row) => {
  const report = row.split(' ');

  const unsafe = isRowUnsafe(report);

  return ans + !unsafe;
}, 0);

console.log(answer);

/********** Day two part two **********/

const answer2 = input.reduce((ans, row) => {
  const report = row.split(' ');

  const unsafe = isRowUnsafe(report);
  const tolerantSafe =
    !unsafe || report.some((_, idx) => !isRowUnsafe(report.toSpliced(idx, 1)));

  return ans + tolerantSafe;
}, 0);

console.log(answer2);
