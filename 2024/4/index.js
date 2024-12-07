const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();

const countXmasMatches = (str) =>
  Array.from(str.matchAll(/(?=(XMAS|SAMX))/g)).length;

const getPivot90 = (str) => {
  let pivot90 = [];

  str.split('\n').forEach((row) =>
    row.split('').forEach((ch, j) => {
      if (pivot90.length === j) {
        pivot90.push(ch);
      } else {
        pivot90[j] += ch;
      }
    })
  );

  return pivot90.join('\n');
};

const getPivot45 = (str) => {
  let pivot45 = [];

  str.split('\n').forEach((row, i) =>
    row.split('').forEach((ch, j) => {
      if (pivot45.length === i + j) {
        pivot45.push(ch);
      } else {
        pivot45[i + j] += ch;
      }
    })
  );

  return pivot45.join('\n');
};

const getPivot135 = (str) => {
  let pivot135 = [];

  str.split('\n').forEach((row, i) =>
    row
      .split('')
      .reverse()
      .forEach((ch, j) => {
        if (pivot135.length === i + j) {
          pivot135.push(ch);
        } else {
          pivot135[i + j] += ch;
        }
      })
  );

  return pivot135.join('\n');
};

const xmasVert = countXmasMatches(input);
const xmasHor = countXmasMatches(getPivot90(input));
const xmasDiag = countXmasMatches(getPivot45(input));
const xmasDiagReversed = countXmasMatches(getPivot135(input));

const answer = xmasVert + xmasHor + xmasDiag + xmasDiagReversed;
console.log(answer);
