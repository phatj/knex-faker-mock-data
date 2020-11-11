import { name, random, internet, phone, lorem } from 'faker';
import { getRandomInt } from './lib/utils';

const user = {
  id: random.uuid(),
  firstName: name.firstName(),
  lastName: name.lastName(),
  email: internet.email(),
  phoneNumber: phone.phoneNumber(),
  welcomeTexts: [
    ...Array(getRandomInt(2, 5))
      .fill(null)
      .map(() => lorem.sentence()),
  ],
};

console.log(user);
