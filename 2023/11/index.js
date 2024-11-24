const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n');

/********** Day eleven part one **********/
const emptyRows = [];
const occupiesCols = new Array(input[0].length).fill('.');
const galaxies = [];

// expand universe (find rows and columns without galaxies)
input.forEach((row, rowIdx) => {
  const matches = row.matchAll(/#/g);
  const colIdxs = [...matches].map((m) => m.index);

  colIdxs.forEach((colIdx) => {
    occupiesCols[colIdx] = '#';
    galaxies.push({ rowIdx, colIdx });
  });

  if (colIdxs.length === 0) emptyRows.push(rowIdx);
});

const emptyCols = Array.from(occupiesCols.join('').matchAll(/\./g)).map(
  (m) => m.index
);

// find distance between each pair of galaxies
let answer = 0;

for (let i = 0; i <= galaxies.length; i++) {
  for (let j = i + 1; j < galaxies.length; j++) {
    const yDist = galaxies[j].rowIdx - galaxies[i].rowIdx;
    const yDistExp = emptyRows.filter(
      (row) => row > galaxies[i].rowIdx && row < galaxies[j].rowIdx
    ).length;

    const xDist = Math.abs(galaxies[j].colIdx - galaxies[i].colIdx);
    const xDistExp = emptyCols.filter(
      (col) =>
        col > Math.min(galaxies[i].colIdx, galaxies[j].colIdx) &&
        col < Math.max(galaxies[i].colIdx, galaxies[j].colIdx)
    ).length;

    answer += yDist + yDistExp + xDist + xDistExp;
  }
}

console.log(answer);

/********** Day eleven part two **********/

let answer2 = 0;

for (let i = 0; i <= galaxies.length; i++) {
  for (let j = i + 1; j < galaxies.length; j++) {
    const yDist = galaxies[j].rowIdx - galaxies[i].rowIdx;
    const yDistExp =
      emptyRows.filter(
        (row) => row > galaxies[i].rowIdx && row < galaxies[j].rowIdx
      ).length * 999999;

    const xDist = Math.abs(galaxies[j].colIdx - galaxies[i].colIdx);
    const xDistExp =
      emptyCols.filter(
        (col) =>
          col > Math.min(galaxies[i].colIdx, galaxies[j].colIdx) &&
          col < Math.max(galaxies[i].colIdx, galaxies[j].colIdx)
      ).length * 999999;

    answer2 += yDist + yDistExp + xDist + xDistExp;
  }
}

console.log(answer2);
