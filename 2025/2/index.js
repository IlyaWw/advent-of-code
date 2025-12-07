const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .replace(/\n/g, '')
  .split(',');

/********** Day two part one **********/

const isInvalid = (num) => {
  const str = String(num);
  if (str.slice(0, str.length / 2) === str.slice(str.length / 2)) return true;
};

const result = input.reduce((res, interval) => {
  const [start, end] = interval.split('-');

  for (let num = Number(start); num <= Number(end); num++) {
    if (isInvalid(num)) res += num;
  }

  return res;
}, 0);

console.log(result);

/********** Day two part two **********/

const isInvalid2 = (num) => {
  const str = String(num);
  let invalid = false;

  patternLengthLoop: for (
    let patternLength = 1;
    patternLength <= str.length / 2;
    patternLength++
  ) {
    if (str.length % patternLength > 0) continue patternLengthLoop;

    const pattern = str.slice(0, patternLength);

    for (let i = 1; i < str.length / patternLength; i++) {
      if (pattern !== str.slice(patternLength * i, patternLength * (i + 1)))
        continue patternLengthLoop;
    }
    invalid = true;
  }

  return invalid;
};

const result2 = input.reduce((res, interval) => {
  const [start, end] = interval.split('-');

  for (let num = Number(start); num <= Number(end); num++) {
    if (isInvalid2(num)) res += num;
  }

  return res;
}, 0);

console.log(result2);
