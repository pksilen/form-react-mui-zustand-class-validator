import { User } from '../stores/User';

export interface UserService {
  createUser(user: User): Promise<User>;
  getUsers(): Promise<User[]>;
}
