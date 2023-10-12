const mkTests = (count) => {
  const start = Array.from({ length: count }).map((_, i) => i);

  return {
    singleForI: () => {
      let result = 0;
      for (let i = 0; i < start.length; i++) {
        result += start[i];
      }
      return result;
    },
    quadForI: () => {
      let result = 0;
      for (let i = 0; i < start.length; i += 4) {
        result += start[i];
        result += start[i + 1];
        result += start[i + 2];
        result += start[i + 3];
      }
      return result;
    },
    quadForIV2: () => {
      let a = 0;
      let b = 0;
      let c = 0;
      let d = 0;
      for (let i = 0; i < start.length; i += 4) {
        a += start[i];
        b += start[i + 1];
        c += start[i + 2];
        d += start[i + 3];
      }
      return a + b + c + d;
    },
    quadWhile: () => {
      let a = 0;
      let b = 0;
      let c = 0;
      let d = 0;

      let count = start.length / 4;
      while (count--) {
        a += start[count];
        b += start[count + 1];
        c += start[count + 2];
        d += start[count + 3];
      }
      return a + b + c + d;
    },
    singleForOf: () => {
      let result = 0;
      for (const num of start) {
        result += num
      }
      return result;
    },
    singleForEach: () => {
      let result = 0;
      start.forEach((num) => result += num)
      return result;
    },
    reduce: () => start.reduce((acc, next) => acc + next, 0)
  };
};

module.exports = {
  mkTests
}
