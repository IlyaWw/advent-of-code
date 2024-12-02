const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n');

const MAX_SAFE_DISTANCE = 3;

const checkUnsafe = (prev, next, isInc) => {
  const diff = next - prev;
  if (diff > 0) return !isInc || Math.abs(diff) > MAX_SAFE_DISTANCE;
  if (diff < 0) return isInc || Math.abs(diff) > MAX_SAFE_DISTANCE;
  return true;
};

const answer = input.reduce((res, row) => {
  const report = row.split(' ');

  const isInc = report[1] - report[0] > 0;

  const unsafe = report.some((level, idx, arr) => {
    // skip 1st
    if (idx === 0) return false;
    // compare with previous
    return checkUnsafe(arr[idx - 1], level, isInc);
  });

  return res + !unsafe;
}, 0);

console.log(answer);
