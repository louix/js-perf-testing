const os = require("node:os");
const fs = require("node:fs");

const clock_speed_hz = os.cpus()[0].speed * 1000000;
const test_iterations = 10000

const OPERATION_COUNTS = [12, 120, 1200, 12000]
 
const computeOperationsPerClock = (operationCount, durationMs) => {
  const clockCyclesForDuration = (durationMs / 1000) * clock_speed_hz;
  return operationCount / clockCyclesForDuration;
}

const test = (key, fn, iterations, operationCount) => {
  process.execArgv.find((v) => v === "--expose-gc") && global.gc();
  const results = Array.from({ length: iterations }).map(() => {
    const start = performance.now();
    fn();
    const end = performance.now();
    return end - start;
  }).sort();
  const avg = results.reduce((acc, next) => acc + next, 0) / results.length
  return {
    time: {
      avg,
      min: results[0],
      max: results[results.length - 1],
    },
    clock: {
      avg: computeOperationsPerClock(operationCount, avg),
      min: computeOperationsPerClock(operationCount, results[results.length - 1]),
      max: computeOperationsPerClock(operationCount, results[0])
    },
    key
  }
}

const camelToPascalCase = (inputString) => inputString.charAt(0).toUpperCase() + inputString.slice(1)

const logTestResults = (results) => {
  results
    .sort((a, b) => b.clock.max - a.clock.max)
    .forEach((x, i, arr) => {
      if (i === 0) {
        console.log(`max: ${x.clock.max.toFixed(5)}, min: ${x.clock.min.toFixed(5)}, avg: ${x.clock.avg.toFixed(5)}, diff: 100.00% fn: ${x.key}`)
      } else {
        const diffFromBest = ((x.clock.max / arr[0].clock.max) * 100).toFixed(2);
        const formatted = `${Array(6 - diffFromBest.length).fill(" ").join("")}${diffFromBest}`
        console.log(`max: ${x.clock.max.toFixed(5)}, min: ${x.clock.min.toFixed(5)}, avg: ${x.clock.avg.toFixed(5)}, diff: ${formatted}% fn: ${x.key}`)
      }
    })
}

const [, , ...argsRaw] = process.argv;
const fileNameRegex = /(?:.*\/)?([^/.]+)/;

const args = argsRaw.reduce((acc, next) => {
  acc[next.toLowerCase().match(fileNameRegex)[1]] = true
  return acc;
}, {});

fs.readdirSync("./tests").filter((f) => f.endsWith(".js")).forEach((f) => {
  const { mkTests } = require(`./tests/${f}`);
  const name = camelToPascalCase(f.slice(0, -3));
  if (argsRaw.length === 0 || args[name.toLowerCase()]) {
    OPERATION_COUNTS.forEach((operationCount) => {
      console.log(`\n# ${name} (length: ${operationCount})`);
      logTestResults(Object.entries(mkTests(operationCount))
        .map(([key, fn]) => test(key, fn, test_iterations, operationCount)))
    })
  }
})
