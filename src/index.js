import { BatchedBuffer } from './lib/batched-buffer';
import { generateUser } from './lib/generators/user';
import { recordMemoryUsage } from './lib/record-memory-usage';
import { Timer } from './lib/timer';

(async () => {
  // generate 2,000,000 users
  const users = generateUser(2e6);

  const timer = new Timer('user-generate');
  timer.start();

  recordMemoryUsage('start');

  const buffer = new BatchedBuffer(users, { bufferSize: 2500 });
  await buffer.process((batch) => {
    recordMemoryUsage('processing');
    console.log(`Created ${batch.length} users`);
  });

  recordMemoryUsage('end');

  timer.stop();
  console.log(timer.stringDuration);
})();
