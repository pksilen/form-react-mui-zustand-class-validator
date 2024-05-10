import { create } from 'zustand';
import { userService } from '../services/FakeUserService';
import { User } from './User';

type State = {
  error: Error | null;
  users: User[];
};

type Actions = {
  registerUser: (user: User) => Promise<boolean>;
  fetchUsers: () => Promise<void>;
};

type UserStore = State & { actions: Actions };

export const useUserStore = create<UserStore>()((setState, getState) => ({
  error: null,
  users: [],

  actions: {
    registerUser: async (user: User) => {
      let userWasRegistered = true;

      try {
        const registeredUser = await userService.registerUser(user);
        setState({ error: null, users: [...getState().users, registeredUser] });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setState({ error });
        userWasRegistered = false;
      }

      return userWasRegistered;
    },

    fetchUsers: async () => {
      const users = await userService.getUsers();
      setState({ users });
    }
  }
}));
