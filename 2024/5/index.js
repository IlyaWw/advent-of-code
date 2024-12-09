const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();

/********** Day five part one **********/

const getMiddleNumber = (arr) => Number(arr[Math.floor(arr.length / 2)]);

const [rulesText, pagesText] = input.split('\n\n');
const rules = rulesText.split('\n');

const answer = pagesText.split('\n').reduce((res, row) => {
  const pages = row.split(',');

  let isCorrect = true;
  for (let i = 1; i < pages.length && isCorrect; i++) {
    isCorrect = !rules.includes(`${pages[i]}|${pages[i - 1]}`);
  }

  return isCorrect ? res + getMiddleNumber(pages) : res;
}, 0);

console.log(answer);
