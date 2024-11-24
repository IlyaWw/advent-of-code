const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n');

/********** Day twelve part one **********/
const decToBin = (dec, len) => {
  const arrBitwise = [0];

  for (let i = 0; i < len; i++) {
    let mask = 1;

    const bit = dec & (mask << i);

    if (bit === 0) {
      arrBitwise[i] = 0;
    } else {
      arrBitwise[i] = 1;
    }
  }

  return arrBitwise.reverse().join('');
};

// naive approach
const answer = input.reduce((sum, line) => {
  const [conditionRecord, checkRecord] = line.split(' ');
  // const checkNums = checkRecord.split(',').map(Number);

  let correctRecords = 0;
  const qCount = Array.from(line.matchAll(/\?/g)).length;
  for (let i = 0; i < 2 ** qCount; i++) {
    const binTry = decToBin(i, qCount);

    const tryArr = [];
    let qIdx = 0;
    for (let j = 0; j < conditionRecord.length; j++) {
      if (conditionRecord[j] === '?') {
        tryArr.push(binTry[qIdx] === '1' ? '#' : '.');
        qIdx += 1;
      } else {
        tryArr.push(conditionRecord[j]);
      }
    }
    const springGroups = Array.from(tryArr.join('').matchAll(/#+/g));
    const repairedRecord = springGroups.map((group) => group[0].length);

    if (repairedRecord.join(',') === checkRecord) correctRecords++;
  }

  return sum + correctRecords;
}, 0);

console.log(answer); // 6827

// // maximum question marks in line
// const maxQ = input.reduce((max, line) => {
//   const q = Array.from(line.matchAll(/\?/g)).length;
//   return Math.max(max, q);
// }, 0);
// console.log(2 ** maxQ);
