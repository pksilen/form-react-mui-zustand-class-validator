import { User } from '../stores/User';

export interface UserService {
  registerUser(user: User): Promise<User>;
  getUsers(): Promise<User[]>;
}
