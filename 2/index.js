// const input = require('./example');
const input = require('./input');

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
