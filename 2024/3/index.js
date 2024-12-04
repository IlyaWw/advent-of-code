const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();

/********** Day three part one **********/

const calculateMuls = (str) => {
  const muls = str.matchAll(/mul\(\d+,\d+\)/g);

  return Array.from(muls).reduce((res, [mul]) => {
    const product = Array.from(mul.matchAll(/\d+/g)).reduce(
      ([a], [b]) => a * b
    );

    return res + product;
  }, 0);
};

const answer = calculateMuls(input);

console.log(answer);

/********** Day three part two **********/

const disabledOps = input.split(`don't()`);
const enabledOps = [
  disabledOps[0],
  ...disabledOps
    .slice(1)
    .flatMap((disabledPart) => disabledPart.split('do()').slice(1)),
];

const answer2 = calculateMuls(enabledOps.join(''));

console.log(answer2);
