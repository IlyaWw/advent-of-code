const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();

const operatorsEnum = ['+', '*'];

const getOps = (i) => {
  const res = [i % operatorsEnum.length];

  if (i >= operatorsEnum.length)
    res.push(...getOps(Math.floor(i / operatorsEnum.length)));

  return res;
};

const answer = input.split('\n').reduce((res, row) => {
  const [valueLine, operandsLine] = row.split(':');
  const value = Number(valueLine);
  const operands = operandsLine.trim().split(' ');

  let isValid = false;

  for (
    let i = 0;
    i < operatorsEnum.length ** (operands.length - 1) && !isValid;
    i++
  ) {
    const operators = getOps(i);
    const calculation = operands.reduce((res, op, pos) => {
      const opIdx = operators[pos - 1] || 0;
      return pos === 0
        ? Number(op)
        : eval(`${res} ${operatorsEnum[opIdx]} ${op}`);
    }, 0);
    if (value === calculation) isValid = true;
  }

  return res + (isValid ? value : 0);
}, 0);

console.log(answer); // 3749 // 1289579105366
