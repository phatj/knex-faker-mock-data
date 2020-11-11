import { name, random, internet, phone, lorem } from 'faker';
import { getRandomInt } from '../utils';

export function* generateUser(numUsers = 1) {
  for (let i = 0; i < numUsers; i++) {
    yield {
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
  }
}
