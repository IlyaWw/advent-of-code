const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();

/********** Day three part one **********/

const muls = input.matchAll(/mul\(\d+,\d+\)/g);

const answer = Array.from(muls).reduce((res, [mul]) => {
  const product = Array.from(mul.matchAll(/\d+/g)).reduce(([a], [b]) => a * b);

  return res + product;
}, 0);

console.log(answer);
