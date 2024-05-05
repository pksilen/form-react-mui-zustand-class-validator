import { create } from 'zustand';
import { userService } from '../services/FakeUserService';
import { User } from './User';

type State = {
  error: Error | null;
  users: User[];
};

type Actions = {
  createUser: (user: User) => Promise<boolean>;
  fetchUsers: () => Promise<void>;
};

type UserStore = State & { actions: Actions };

export const useUserStore = create<UserStore>()((setState, getState) => ({
  error: null,
  users: [],

  actions: {
    createUser: async (user: User) => {
      let didSucceed = true;

      try {
        const createdUser = await userService.createUser(user);
        setState({ error: null, users: [...getState().users, createdUser] });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setState({ error });
        didSucceed = false;
      }

      return didSucceed;
    },

    fetchUsers: async () => {
      const users = await userService.getUsers();
      setState({ users });
    }
  }
}));
