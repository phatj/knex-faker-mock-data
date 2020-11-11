export const recordMemoryUsage = (...prefix) => {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.info(
    `Current memory usage [${prefix.join('-')}]: ${
      Math.round(used * 100) / 100
    } MB`
  );
};
