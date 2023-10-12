const mkTests = (length) => {
  const mergePoint = length / 2;
  const a = Array.from({ length }).map((_, i) => i * 2);
  const b = Array.from({ length }).map((_, i) => (i * 2) + 1);
  return {
    concat: () => a.slice(0, mergePoint).concat(b.slice(mergePoint)),
    spread: () => [
      ...a.slice(0, mergePoint), //
      ...b.slice(mergePoint),
    ],
    forLoopSparse: () => {
      const newArr = Array(length - 1);
      for (let i = 0; i < length; i++) {
        newArr[i] = i > mergePoint ? b[i] : a[i];
      }
      return newArr;
    },
    naiveForLoop: () => {
      const newArr = [];
      for (let i = 0; i < length; i++) {
        newArr[i] = i > mergePoint ? b[i] : a[i];
      }
      return newArr;
    },
    naiveForLoopReserved: () => {
      const newArr = Array(length);
      for (let i = 0; i < length; i++) {
        newArr[i] = i > mergePoint ? b[i] : a[i];
      }
      return newArr;
    },
    optimisedForLoop: () => {
      const newArr = [];
      for (let i = 0; i <= mergePoint; i++) {
        newArr[i] = a[i];
      }
      for (let i = mergePoint + 1; i < length; i++) {
        newArr[i] = b[i];
      }
      return newArr;
    },
    optimisedForLoopReserved: () => {
      const newArr = Array(length);
      for (let i = 0; i <= mergePoint; i++) {
        newArr[i] = a[i];
      }
      for (let i = mergePoint + 1; i < length; i++) {
        newArr[i] = b[i];
      }
      return newArr;
    },
  }
}


module.exports = {
  mkTests
}
