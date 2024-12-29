const fs = require('fs');
const path = require('path');
const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split(' ');

class Stone {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class StoneLine {
  constructor(values) {
    const stones = values.reduce((acc, cur, idx) => {
      const stone = new Stone(Number(cur));
      if (idx > 0) acc[idx - 1].next = stone;
      acc.push(stone);
      return acc;
    }, []);

    this.head = stones[0];
    this.length = values.length;
  }

  print() {
    let current = this.head;
    const res = [];

    while (current) {
      res.push(current.value);
      current = current.next;
    }

    console.log(res.join(' '));
  }

  blink() {
    let current = this.head;

    while (current) {
      if (current.value === 0) {
        current.value = 1;
      } else if (String(current.value).length % 2 === 0) {
        const str = String(current.value);
        const newStone = new Stone(
          Number(str.slice(str.length / 2, str.length))
        );
        newStone.next = current.next;
        current.next = newStone;
        current.value = Number(str.slice(0, str.length / 2));
        current = newStone;
        this.length++;
      } else {
        current.value *= 2024;
      }

      current = current.next;
    }
  }
}

const stones = new StoneLine(input);

// stones.print();
let blinkCount = 0;
do {
  stones.blink();
  blinkCount++;
} while (blinkCount < 25);

// stones.print();

console.log(stones.length);
