import { v4 as uuidv4 } from 'uuid';
import { User } from '../stores/User';
import { UserService } from './UserService';

class FakeUserService implements UserService {
  private readonly users: User[] = [];

  createUser(user: User): Promise<User> {
    const createdUser = { id: uuidv4(), ...user };

    if (Math.random() < 0.7) {
      this.users.push(user);
      return Promise.resolve(createdUser);
    } else {
      return Promise.reject(new Error());
    }
  }

  getUsers(): Promise<User[]> {
    return Promise.resolve(this.users);
  }
}

const userService = new FakeUserService();
export default userService;
