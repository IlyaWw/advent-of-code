const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n');

/********** Day three part one **********/

const getMaxBattery = (batteries) => {
  let maxJolt = 0,
    maxIdx = 0;
  batteries.forEach((battery, i) => {
    if (Number(battery) > maxJolt) {
      maxJolt = Number(battery);
      maxIdx = i;
    }
  });
  return [String(maxJolt), maxIdx];
};

const getJoltage = (bank) => {
  const [jolt1, idx1] = getMaxBattery(bank.split('').slice(0, -1));
  const [jolt2] = getMaxBattery(bank.split('').slice(idx1 + 1));
  return Number(jolt1.concat(jolt2));
};

const result = input.reduce((acc, bank) => {
  return acc + getJoltage(bank);
}, 0);

console.log(result);
