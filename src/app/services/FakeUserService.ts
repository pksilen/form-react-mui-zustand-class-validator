import { v4 as uuidv4 } from 'uuid';
import { User } from '../stores/User';
import { UserService } from './UserService';

class FakeUserService implements UserService {
  private readonly users: User[] = [];

  createUser(user: User): Promise<User> {
    const createdUser = { ...user, id: uuidv4() };

    if (Math.random() < 0.7) {
      this.users.push(createdUser);
      return Promise.resolve(createdUser);
    }

    return Promise.reject(new Error());
  }

  getUsers(): Promise<User[]> {
    return Promise.resolve(this.users);
  }
}

export const userService = new FakeUserService();
