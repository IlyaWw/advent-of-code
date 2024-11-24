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

console.log(answer);

// Day four part two
const guessedNumbers = input.map((card) => {
  [, strWinning, strYour] = card.split(/[:|]/);
  const arrWinning = strWinning.trim().split(/ +/);
  const guessedCount = strYour
    .trim()
    .split(/ +/)
    .filter((num) => arrWinning.includes(num)).length;

  return guessedCount;
});

const addWonCopies = (idx, relayedCopies) => {
  const wonCopies = Number(guessedNumbers[idx]);
  const nextRelayed = relayedCopies - 1;

  return (
    1 +
    (wonCopies && addWonCopies(idx + 1, wonCopies)) +
    (nextRelayed && addWonCopies(idx + 1, nextRelayed))
  );
};

const answer2 = Object.keys(guessedNumbers).reduce(
  (res, idx) => res + addWonCopies(Number(idx), 1),
  0
);

console.log(answer2);
