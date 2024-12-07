const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();

/********** Day four part one **********/

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

/********** Day four part two **********/

const lettersMatrix = input.split('\n').map((row) => row.split(''));

let answer2 = 0;

for (let i = 1; i < lettersMatrix.length - 1; i++) {
  for (let j = 1; j < lettersMatrix[i].length - 1; j++) {
    if (lettersMatrix[i][j] === 'A') {
      const xCross =
        lettersMatrix[i - 1][j - 1] +
        lettersMatrix[i + 1][j + 1] +
        lettersMatrix[i + 1][j - 1] +
        lettersMatrix[i - 1][j + 1];

      if ((xCross.match(/MS|SM/g) || []).length === 2) answer2++;
    }
  }
}

console.log(answer2);
