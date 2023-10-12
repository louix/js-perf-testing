const mkTests = (length) => {
  return {
    push: () => {
      const arr = [];
      for (let i = 0; i < length; i++) {
        arr.push(i);
      }
      return arr;
    },
    from: () => {
      Array.from({length}).map((_,i) => i);
    },
    indexAssignmentSizedArray: () => {
      const arr = Array(length);
      for (let i = 0; i < length; i++) {
        arr[i] = i;
      }
      return arr;
    },
    indexAssignmentSizedNewArray: () => {
      const arr = new Array(length);
      for (let i = 0; i < length; i++) {
        arr[i] = i;
      }
      return arr;
    },
    indexAssignmentEmptyArray: () => {
      const arr = [];
      for (let i = 0; i < length; i++) {
        arr[i] = i;
      }
      return arr;
    },
    concat: () => JSON.parse(JSON.stringify(Array(length).fill(null).concat())),
    slice: () => JSON.parse(JSON.stringify(Array(length).fill(null).slice()))
  }
}


module.exports = {
  mkTests
}
