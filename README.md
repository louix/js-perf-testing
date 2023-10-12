# Running

## All Tests

```
npm start
```

## Specific test

You can use your shell's autocomplete to choose the test file you want to run

```bash
npm start ./tests/<whatever>.js
```

# Adding new tests

Export a function `mkTests(operationCount: number)` and returns an object where the keys are the test names, and the values are the functions you want to compare.

