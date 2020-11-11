import { generateUser } from './lib/generators/user';
import { recordMemoryUsage } from './lib/record-memory-usage';
import { Timer } from './lib/timer';

const users = generateUser(2e2);

const timer = new Timer('user-generate');
timer.start();

recordMemoryUsage('start');

for (const user of users) {
  console.log(user);
}

recordMemoryUsage('end');

timer.stop();
console.log(timer.stringDuration);
