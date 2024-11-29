const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n');

/********** Day twelve part one **********/

const answer = input.reduce((sum, line) => {
  const [conditionRecord, checkRecord] = line.split(' ');
  let correctRecords = 0;
  const logStr = (str, count) => {
    if (count) {
      logStr(str.replace('?', '#'), count - 1);
      logStr(str.replace('?', '.'), count - 1);
    } else {
      const springGroups = Array.from(str.matchAll(/#+/g));
      const repairedRecord = springGroups.map((group) => group[0].length);
      if (repairedRecord.join(',') === checkRecord) correctRecords++;
    }
  };
  logStr(conditionRecord, conditionRecord.match(/\?/g).length);
  return sum + correctRecords;
}, 0);

console.log(answer);
