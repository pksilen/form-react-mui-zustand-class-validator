import { faker } from '@faker-js/faker';

export const fakeUser = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  streetAddress: faker.location.streetAddress(),
  zipCode: faker.location.zipCode(),
  city: faker.location.city(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.number()
};
