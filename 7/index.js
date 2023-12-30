const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n');

// Day seven part one
const cardLabels = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'J',
  'Q',
  'K',
  'A',
];

const compareLabels = (a, b) => {
  let res = 0;
  while (!res) {
    const aLabel = a.shift();
    const bLabel = b.shift();
    res = cardLabels.indexOf(aLabel) - cardLabels.indexOf(bLabel);
  }
  return res;
};

const sortHands = (a, b) => {
  comparedCombos = a.combos.localeCompare(b.combos);
  return comparedCombos || compareLabels(a.hand.split(''), b.hand.split(''));
};

const hands = input
  .map((str) => {
    const [hand, bid] = str.split(' ');

    const distribution = hand.split('').reduce((res, card) => {
      if (res[card]) res[card] += 1;
      else res[card] = 1;
      return res;
    }, {});

    return {
      hand,
      bid: Number(bid),
      combos: Object.values(distribution)
        .sort((a, b) => b - a)
        .join(''),
    };
  })
  .sort(sortHands);

const answer = hands.reduce((res, hand, idx) => res + hand.bid * (idx + 1), 0);

console.log(answer);

// Day seven part two
cardLabels.unshift('J');

const handsWithJokers = input
  .map((str) => {
    const [hand, bid] = str.split(' ');

    const distribution = hand.split('').reduce((res, card) => {
      if (res[card]) res[card] += 1;
      else res[card] = 1;
      return res;
    }, {});

    // wildcard handling
    const jokerCount = distribution['J'] || 0;
    distribution['J'] = 0;
    const sortedDistribution = Object.values(distribution).sort(
      (a, b) => b - a
    );
    sortedDistribution[0] += jokerCount;

    return {
      hand,
      bid: Number(bid),
      combos: sortedDistribution.join(''),
    };
  })
  .sort(sortHands);

const answer2 = handsWithJokers.reduce(
  (res, hand, idx) => res + hand.bid * (idx + 1),
  0
);

console.log(answer2);
