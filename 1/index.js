const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n');

// Day one part one
const answer = input.reduce((res, line) => {
  const digits = [...line.matchAll(/\d/g)];
  const [[firstDigit]] = digits.slice(0, 1);
  const [[lastDigit]] = digits.slice(-1);

  return res + firstDigit * 10 + Number(lastDigit);
}, 0);

console.log(answer);

// Day one part two
const digitsObj = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const toNum = (str) => digitsObj[str] || Number(str);

const reverse = (str) => str.split('').reverse().join('');

const answer2 = input.reduce((res, line) => {
  const pattern = new RegExp(`(${Object.keys(digitsObj).join('|')}|[0-9])`);
  const [firstDigit] = line.match(pattern);

  // I am not proud of this hack
  const reversePattern = new RegExp(
    `(${Object.keys(digitsObj)
      .map((d) => reverse(d))
      .join('|')}|[0-9])`,
    'g'
  );

  const [lastDigit] = reverse(line).match(reversePattern);

  return res + toNum(firstDigit) * 10 + toNum(reverse(lastDigit));
}, 0);

console.log(answer2);
