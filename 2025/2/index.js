const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .replace(/\n/g, '')
  .split(',');

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
