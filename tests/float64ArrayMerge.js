const mkTests = (length) => {
  const mergePoint = length / 2;
  const a = new Float64Array(Array.from({ length }).map((_, i) => i));
  const b = new Float64Array(Array.from({ length }).map((_, i) => i));
  return {
    join: () => {
      const joinedArray = new Float64Array(length);

      joinedArray.set(a.subarray(0, mergePoint), 0);
      joinedArray.set(b.subarray(mergePoint), mergePoint);

      return joinedArray;
    },
    spread: () => new Float64Array([
      ...a.slice(0, mergePoint), //
      ...b.slice(mergePoint),
    ]),
    naiveForLoop: () => {
      const newArrBuff = new Float64Array(length);
      for (let i = 0; i < length; i++) {
        newArrBuff[i] = i > mergePoint ? b[i] : a[i];
      }
      return newArrBuff;
    },
    optimisedForLoop: () => {
      const newArrBuff = new Float64Array(length);
      for (let i = 0; i <= mergePoint; i++) {
        newArrBuff[i] = a[i];
      }
      for (let i = mergePoint + 1; i < length; i++) {
        newArrBuff[i] = b[i];
      }
      return newArrBuff;
    },
  }
}


module.exports = {
  mkTests
}
