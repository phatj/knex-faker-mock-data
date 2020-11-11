import { generateUser } from './lib/generators/user';
import { recordMemoryUsage } from './lib/record-memory-usage';

const users = generateUser(2);

recordMemoryUsage('start');

for (const user of users) {
  console.log(user);
}

recordMemoryUsage('end');
