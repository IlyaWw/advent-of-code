const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();

/********** Day nine part one **********/

const layout = input.split('').reduce((res, block, idx) => {
  const space = new Array(Number(block));
  if (idx % 2 === 0) {
    res.push(...space.fill(idx / 2));
  } else {
    res.push(...space);
  }
  return res;
}, []);

let answer = 0,
  il = 0,
  ir = layout.length - 1;

do {
  if (layout[il] != undefined) {
    answer += layout[il] * il;
  } else {
    answer += layout[ir] * il;
    do {
      ir -= 1;
    } while (!layout[ir]);
  }
  il++;
} while (il <= ir);

console.log(answer);

/********** Day nine part two **********/

ir = layout.length - 1;

let iter = 0;
do {
  iter++;
  if (layout[ir]) {
    const id = layout[ir];
    let fileSize = 0;
    do {
      fileSize++;
      ir--;
    } while (layout[ir] === id);
    ir++;

    let il = 0;
    let found = false;
    do {
      do {
        il++;
      } while (layout[il] != undefined && il < ir);

      if (il < ir) {
        let emptySize = 0;
        do {
          emptySize++;
        } while (layout[il + emptySize] == undefined);

        if (emptySize >= fileSize) {
          for (i = 0; i < fileSize; i++) {
            layout[il + i] = id;
            layout[ir + i] = undefined;
          }
          found = true;
        } else il += emptySize;
      }
    } while (il < ir && !found);
  }

  ir--;
} while (ir > 0);

const answer2 = layout.reduce(
  (res, block, idx) => (block ? res + block * idx : res),
  0
);

console.log(answer2);
