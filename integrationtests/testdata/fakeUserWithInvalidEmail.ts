import { fakeUser } from './fakeUser';

export const fakeUserWithInvalidEmail = {
  ...fakeUser,
  email: 'invalid email'
};
