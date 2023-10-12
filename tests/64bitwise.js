const mkTests = (count) => {
  const start = Array.from({ length: count }).map((_, i) => [i, BigInt(i)]);

  return {
    bigInt: () => {
      let a = 0;
      for (let i = 0; i < start.length; i++) {
        const [n, b] = start[i];
        a += Number(BigInt(n) | b);
      }
      return a;
    },
    madness: () => {
      let a = 0;
      for (let i = 0; i < start.length; i++) {
        const [n, bb] = start[i];
        const b = Number(bb);

        const nHigher32 = n / 2**32;
        const nLower32 = n % 2**32;

        const bHigher32 = b / 2**32;
        const bLower32 = b % 2**32;

        const tHigher32 = nHigher32 | bHigher32;
        const tLower32 = nLower32 | bLower32;

        a += tHigher32 * 2**32 + tLower32;
      }
      return a;
    }
  };
};

module.exports = {
  mkTests
}
