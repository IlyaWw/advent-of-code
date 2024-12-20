const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();

const layout = input.split('').reduce((res, block, idx) => {
  const space = new Array(Number(block));
  if (idx % 2 === 0) {
    res.push(...space.fill(idx / 2));
  } else {
    res.push(...space);
  }
  return res;
}, []);

let checksum = 0;

let il = 0,
  ir = layout.length - 1;
do {
  if (layout[il] != undefined) {
    checksum += layout[il] * il;
  } else {
    checksum += layout[ir] * il;
    do {
      ir -= 1;
    } while (!layout[ir]);
  }
  il++;
} while (il <= ir);

console.log(checksum);
