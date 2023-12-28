const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n');

// Day four part one
const answer = input.reduce((res, card) => {
  [, strWinning, strYour] = card.split(/[:|]/);
  const arrWinning = strWinning.trim().split(/ +/);
  const guessedCount = strYour
    .trim()
    .split(/ +/)
    .filter((num) => arrWinning.includes(num)).length;
  return res + (guessedCount ? 2 ** (guessedCount - 1) : 0);
}, 0);

console.log(answer); // 13
