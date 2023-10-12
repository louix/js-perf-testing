const mkTests = (length) => {
  const mergePoint = length / 2;
  const a = new ArrayBuffer(length * 8);
  const b = new ArrayBuffer(length * 8);
  const aView = new DataView(a);
  const bView = new DataView(a);
  Array.from({ length }).forEach((_, i) => {
    aView.setFloat64(i * 8, i);
    bView.setFloat64(i * 8, i * 2);
  })

  return {
    forLoopUint8: () => {
      const aView = new DataView(a);
      const bView = new DataView(b);

      const joinedArray = new ArrayBuffer(a.byteLength);
      const joinedView = new DataView(joinedArray);

      for (let i = 0; i <= mergePoint; i++) {
        joinedView.setFloat64(i, aView.getUint8(i));
      }
      for (let i = mergePoint + 1; i < length; i++) {
        joinedView.setFloat64(i, bView.getUint8(i));
      }

      return joinedArray;
    },
    forLoopFloat64: () => {
      const aView = new DataView(a);
      const bView = new DataView(b);

      const joinedArray = new ArrayBuffer(a.byteLength);
      const joinedView = new DataView(joinedArray);

      for (let i = 0; i <= mergePoint; i++) {
        joinedView.setFloat64(i * 8, aView.getFloat64(i));
      }
      for (let i = mergePoint + 1; i < length; i++) {
        joinedView.setFloat64(i * 8, bView.getFloat64(i));
      }

      return joinedArray;
    },
    joinUint8Optimised: () => {
      // Convert the raw ArrayBuffers into Uint8Arrays to access their data as bytes
      const aView = new Uint8Array(a).subarray(0, mergePoint);
      const bView = new Uint8Array(b).subarray(mergePoint).buffer;

      // Create a Uint8Array for the new ArrayBuffer
      const joinedView = new Uint8Array(a.byteLength);

      aView.set(bView);

      return joinedView.buffer;
    },
    joinUint8: () => {
      // Convert the raw ArrayBuffers into Uint8Arrays to access their data as bytes
      const aView = new Uint8Array(a);
      const bView = new Uint8Array(b);

      // Create a Uint8Array for the new ArrayBuffer
      const joinedView = new Uint8Array(a.byteLength);

      joinedView.set(aView.subarray(0, mergePoint));
      joinedView.set(bView.subarray(mergePoint), mergePoint);

      return joinedView.buffer;
    },
    joinFloat64: () => {
      // Convert the raw ArrayBuffers into Uint8Arrays to access their data as bytes
      const aView = new Float64Array(a);
      const bView = new Float64Array(b);

      // Create a Uint8Array for the new ArrayBuffer
      const joinedView = new Float64Array(a.byteLength);

      joinedView.set(aView.subarray(0, mergePoint));
      joinedView.set(bView.subarray(mergePoint), mergePoint);

      return joinedView.buffer;
    }
  }
}


module.exports = {
  mkTests
}
