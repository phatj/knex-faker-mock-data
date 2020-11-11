import { BatchedBuffer } from './lib/batched-buffer';
import { generateUser } from './lib/generators/user';
import { recordMemoryUsage } from './lib/record-memory-usage';
import { Timer } from './lib/timer';

const users = generateUser(2e5);

const timer = new Timer('user-generate');
timer.start();

recordMemoryUsage('start');

const buffer = new BatchedBuffer(users, { bufferSize: 5000 });
buffer.process((batch) => console.log(batch.length));

recordMemoryUsage('end');

timer.stop();
console.log(timer.stringDuration);
