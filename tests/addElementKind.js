const mk_PACKED_ELEMENTS = (length) => {
  const PACKED_ELEMENTS = Array.from({ length }).map((_, i) => i);
  PACKED_ELEMENTS.push("");
  PACKED_ELEMENTS.pop();
  return PACKED_ELEMENTS;
}

const mk_DICTIONARY_ELEMENTS = (length) => {
  const DICTIONARY_ELEMENTS = Array.from({ length }).map((_, i) => i);
  DICTIONARY_ELEMENTS.length = 33554433;
  DICTIONARY_ELEMENTS.length = length;
  return DICTIONARY_ELEMENTS;
}


const mkTests = (length) => {
  const PACKED_SMI_ELEMENTS = Array.from({ length }).map((_, i) => i);
  const HOLEY_SMI_ELEMENTS = PACKED_SMI_ELEMENTS.concat(Array(0));
  const PACKED_DOUBLE_ELEMENTS = Array.from({ length }).map((_, i) => i**1);
  const HOLEY_DOUBLE_ELEMENTS = PACKED_DOUBLE_ELEMENTS.concat(Array(0));
  const PACKED_ELEMENTS = mk_PACKED_ELEMENTS(length);
  const HOLEY_ELEMENTS = PACKED_ELEMENTS.concat(Array(0));
  const DICTIONARY_ELEMENTS = mk_DICTIONARY_ELEMENTS(length);
  return {
    PACKED_SMI_ELEMENTS: () => {
      let result = 0;
      for (let i = 0; i < PACKED_SMI_ELEMENTS.length; i += 4) {
        result += PACKED_SMI_ELEMENTS[i];
        result += PACKED_SMI_ELEMENTS[i + 1];
        result += PACKED_SMI_ELEMENTS[i + 2];
        result += PACKED_SMI_ELEMENTS[i + 3];
      }
      return result;
    },
    HOLEY_SMI_ELEMENTS: () => {
      let result = 0;
      for (let i = 0; i < HOLEY_SMI_ELEMENTS.length; i += 4) {
        result += HOLEY_SMI_ELEMENTS[i];
        result += HOLEY_SMI_ELEMENTS[i + 1];
        result += HOLEY_SMI_ELEMENTS[i + 2];
        result += HOLEY_SMI_ELEMENTS[i + 3];
      }
      return result;
    },
    PACKED_DOUBLE_ELEMENTS: () => {
      let result = 0;
      for (let i = 0; i < PACKED_DOUBLE_ELEMENTS.length; i += 4) {
        result += PACKED_DOUBLE_ELEMENTS[i];
        result += PACKED_DOUBLE_ELEMENTS[i + 1];
        result += PACKED_DOUBLE_ELEMENTS[i + 2];
        result += PACKED_DOUBLE_ELEMENTS[i + 3];
      }
      return result;
    },
    HOLEY_DOUBLE_ELEMENTS: () => {
      let result = 0;
      for (let i = 0; i < HOLEY_DOUBLE_ELEMENTS.length; i += 4) {
        result += HOLEY_DOUBLE_ELEMENTS[i];
        result += HOLEY_DOUBLE_ELEMENTS[i + 1];
        result += HOLEY_DOUBLE_ELEMENTS[i + 2];
        result += HOLEY_DOUBLE_ELEMENTS[i + 3];
      }
      return result;
    },
    PACKED_ELEMENTS: () => {
      let result = 0;
      for (let i = 0; i < PACKED_ELEMENTS.length; i += 4) {
        result += PACKED_ELEMENTS[i];
        result += PACKED_ELEMENTS[i + 1];
        result += PACKED_ELEMENTS[i + 2];
        result += PACKED_ELEMENTS[i + 3];
      }
      return result;
    },
    HOLEY_ELEMENTS: () => {
      let result = 0;
      for (let i = 0; i < HOLEY_ELEMENTS.length; i += 4) {
        result += HOLEY_ELEMENTS[i];
        result += HOLEY_ELEMENTS[i + 1];
        result += HOLEY_ELEMENTS[i + 2];
        result += HOLEY_ELEMENTS[i + 3];
      }
      return result;
    },
    DICTIONARY_ELEMENTS: () => {
      let result = 0;
      for (let i = 0; i < DICTIONARY_ELEMENTS.length; i += 4) {
        result += DICTIONARY_ELEMENTS[i];
        result += DICTIONARY_ELEMENTS[i + 1];
        result += DICTIONARY_ELEMENTS[i + 2];
        result += DICTIONARY_ELEMENTS[i + 3];
      }
      return result;
    },
  };
};

module.exports = {
  mkTests
}
