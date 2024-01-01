const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n');

// Day nine part one
const getDiffs = (seq) => seq.slice(0, -1).map((a, idx) => seq[idx + 1] - a);

const getNext = (seq) => {
  const diffs = getDiffs(seq);
  nextDiff = diffs.every((num) => num === 0) ? 0 : getNext(diffs);
  return seq[seq.length - 1] + nextDiff;
};

const answer = input.reduce((sum, line) => {
  const history = line.split(' ').map(Number);
  return sum + getNext(history);
}, 0);

console.log(answer);
