const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n');

// Day three part one
const schematicHeight = input.length;
const schematicWidth = input[0].length;

const numbers = input.reduce((res, str, line) => {
  const matches = str.matchAll(/\d+/g);

  res.push(
    ...Array.from(matches).map((m) => ({ value: m[0], line, index: m.index }))
  );
  return res;
}, []);

const partNumbers = numbers.filter((num) => {
  startLine = Math.max(num.line - 1, 0);
  endLine = Math.min(num.line + 2, schematicHeight);
  startIndex = Math.max(num.index - 1, 0);
  endIndex = Math.min(num.index + num.value.length + 1, schematicWidth);

  locality = input
    .slice(startLine, endLine)
    .map((line) => line.slice(startIndex, endIndex))
    .join('');

  return locality.match(/[^0-9.]/);
});

const answer = partNumbers.reduce((a, b) => a + Number(b.value), 0);

console.log(answer);

// Day three part two
const gears = numbers.reduce((res, num) => {
  startLine = Math.max(num.line - 1, 0);
  endLine = Math.min(num.line + 2, schematicHeight);
  startIndex = Math.max(num.index - 1, 0);
  endIndex = Math.min(num.index + num.value.length + 1, schematicWidth);

  for (let i = startLine; i < endLine; i++)
    for (let j = startIndex; j < endIndex; j++)
      if (input[i][j] === '*') {
        const key = `${i},${j}`;
        if (res[key]) res[key].push(num.value);
        else res[key] = [num.value];
      }

  return res;
}, {});

const answer2 = Object.values(gears)
  .filter((nums) => nums.length === 2)
  .reduce((res, [a, b]) => res + a * b, 0);

console.log(answer2);
