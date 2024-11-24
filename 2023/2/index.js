const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'example.txt'))
  .toString()
  .split('\n');

// Day two part one
const maxPossible = {
  red: 12,
  green: 13,
  blue: 14,
};

const answer = input.reduce((res, line) => {
  const [game] = line.match(/(?<=Game )\d+/);

  const isImpossible = Object.keys(maxPossible).some((color) => {
    const pattern = new RegExp(`\\d+(?= ${color})`, 'g');
    const matchedArr = [...line.matchAll(pattern)];

    return matchedArr.some(
      ([revealedCount]) => maxPossible[color] < revealedCount
    );
  });

  return res + Number(!isImpossible && game);
}, 0);

console.log(answer);

// Day two part two
const initialCubes = {
  red: 0,
  green: 0,
  blue: 0,
};

const answer2 = input.reduce((res, line) => {
  requiredCubes = Object.keys(initialCubes).reduce(
    (acc, color) => {
      const pattern = new RegExp(`\\d+(?= ${color})`, 'g');
      const matchedArr = [...line.matchAll(pattern)];
      const max = matchedArr.reduce((max, val) => Math.max(max, val[0]), 0);
      acc[color] = max;
      return acc;
    },
    { ...initialCubes }
  );

  gameValue = Object.values(requiredCubes).reduce((prod, mult) => prod * mult);

  return res + gameValue;
}, 0);

console.log(answer2);
