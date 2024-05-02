import { create } from 'zustand';
import userService from '../services/FakeUserService';
import { User } from './User';

interface State {
  error: Error | null;
  users: User[];
}

interface Actions {
  createUser: (user: User) => Promise<boolean>;
  fetchUsers: () => Promise<void>;
}

type UserStore = State & { actions: Actions };

const useUserStore = create<UserStore>()((setState, getState) => ({
  error: null,
  users: [],

  actions: {
    createUser: async (inputUser: User) => {
      let didSucceed = true;

      try {
        const user = await userService.createUser(inputUser);
        setState({ error: null, users: [...getState().users, user] });
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

export default useUserStore;
