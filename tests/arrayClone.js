const mkTests = (length) => {
  const arr = Array.from({length}).map((_,i)=> i);

  return {
    spread: () => {
      return [...arr]
    },
    slice: () => {
      arr.slice(0);
    },
    concat: () => {
      arr.concat();
    },
    forEach: () => {
      const out = Array(length);
      arr.forEach((e,i) => out[i] = e);
      return out;
    },
    forLoop: () => {
      const out = Array(length);
      for (let i = 0; i < arr.length; i++) {
        out[i] = arr[i];
      }
      return out;
    },
  }
}


module.exports = {
  mkTests
}
