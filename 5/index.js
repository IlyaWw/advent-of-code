const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString();

// Day four part one
const [seedsStr, ...convertersArr] = input.split('\n\n');

const [, ...seeds] = seedsStr.split(/: | /).map(Number);
const converters = convertersArr.map((str) => {
  const [, ...row] = str.split('\n');
  return row.map((rule) => rule.split(' ').map(Number));
});

const answer = seeds.reduce((res, seed) => {
  const location = converters.reduce((num, converterArr) => {
    const converterFound = converterArr.find((converter) => {
      return converter[1] <= num && converter[1] + converter[2] >= num;
    });
    return converterFound ? converterFound[0] + num - converterFound[1] : num;
  }, seed);
  return Math.min(res, location);
}, Infinity);

console.log(answer);
