import { name, internet, phone, lorem } from 'faker';
import { getRandomInt } from '../utils';

export function* generateUser(numUsers = 1) {
  for (let i = 0; i < numUsers; i++) {
    const firstName = name.firstName();
    yield {
      firstName,
      lastName: name.lastName(),
      email: internet.email(firstName.toLowerCase() + i),
      phoneNumber: phone.phoneNumber(),
      welcomeTexts: JSON.stringify([
        ...Array(getRandomInt(2, 5))
          .fill(null)
          .map(() => lorem.sentence()),
      ]),
    };
  }
}
