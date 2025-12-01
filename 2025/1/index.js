const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n');

const dirObj = { L: -1, R: 1 };

let cur = 50;
let count = 0;

input.forEach((row) => {
  const dir = dirObj[row[0]];
  const dist = Number(row.slice(1));

  cur = (cur + dir * dist + 100) % 100;

  if (cur === 0) count++;
});

console.log(count);
