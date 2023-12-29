const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();

// Day five part one
const [seedsStr, ...convertersArr] = input.split('\n\n');

const [, ...seeds] = seedsStr.split(/: | /).map(Number);
const converters = convertersArr.map((str) => {
  const [, ...row] = str.split('\n');
  return row.map((rule) => rule.split(' ').map(Number));
});

const answer = seeds.reduce((res, seed) => {
  const location = converters.reduce((num, converterArr) => {
    const converterFound = converterArr.find((converter) => {
      return converter[1] <= num && converter[1] + converter[2] > num;
    });
    return converterFound ? converterFound[0] + num - converterFound[1] : num;
  }, seed);
  return Math.min(res, location);
}, Infinity);

console.log(answer);

// Day five part two
const seedRanges = seeds.reduce(
  (res, seedNum, idx) => {
    if (idx % 2 === 0) {
      res.nextStart = seedNum;
    } else {
      res.data.push({ start: res.nextStart, end: res.nextStart + seedNum - 1 });
    }
    return res;
  },
  { data: [], nextStart: 0 }
).data;

const convert = (num, converter) => converter[0] + num - converter[1];

const locationRanges = converters.reduce((ranges, converterArr) => {
  const convertedRanges = ranges.flatMap((range) => {
    const rangeConverters = converterArr
      .filter((converter) => {
        const convStart = converter[1];
        const convEnd = convStart + converter[2];
        return (
          // range starts in this converter
          (convStart <= range.start && convEnd > range.start) ||
          // range ends in this converter
          (convStart <= range.end && convEnd > range.end) ||
          // range goes through this converter
          (convStart >= range.start && convEnd < range.end)
        );
      })
      .sort((a, b) => a[1] - b[1]);

    let rangeIdx = range.start;
    const fragmentedRanges = rangeConverters.reduce((res, converter) => {
      const convStart = converter[1];
      const convEnd = convStart + converter[2] - 1;

      if (rangeIdx < convStart) {
        res.push({ start: rangeIdx, end: convStart - 1 });
        rangeIdx = convStart;
      }

      res.push({
        start: convert(Math.max(rangeIdx, convStart), converter),
        end: convert(Math.min(range.end, convEnd), converter),
      });
      rangeIdx = convEnd + 1;

      return res;
    }, []);

    if (rangeIdx < range.end)
      fragmentedRanges.push({ start: rangeIdx, end: range.end });

    return fragmentedRanges;
  });

  // converted ranges (flattened) are returned here for the next step of conversion
  return convertedRanges;
}, seedRanges);

const answer2 = locationRanges.reduce(
  (min, range) => (range.start === 0 ? min : Math.min(min, range.start)),
  Infinity
);

console.log(answer2);
