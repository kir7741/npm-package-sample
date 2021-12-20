const benchmarker = (testFunction, times = 1000000) => {

  if (typeof testFunction !== 'function') {
    throw new Error('Did not provide a valid function for test.');
  }

  const startTime = new Date().getTime();

  let i = 0;
  while (i < times) {
    i++;
    testFunction();
  }

  const endTime = new Date().getTime();

  return endTime - startTime;
};

// 匯出函式
module.exports = benchmarker;