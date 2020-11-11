import { generateUser } from './lib/generators/user';

const users = generateUser(6);

for (const user of users) {
  console.log(user);
}
