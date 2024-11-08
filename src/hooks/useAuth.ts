import { useStore } from "@tanstack/react-store";
import { accessTokenStore, userStore } from "@/store/user.store";
import { User } from "@/types/entities/Auth.type";

type useAuthReturn = {
  user: User | null;
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  updateUser: (user: User) => void;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuth = (): useAuthReturn => {
  const user = useStore(userStore);
  const accessToken = useStore(accessTokenStore);

  const updateUser = (user: User) => {
    userStore.setState((state) => ({ ...state, ...user }));
  };

  const login = (user: User) => {
    userStore.setState(() => user);
  };

  const logout = () => {
    userStore.setState(() => null);
  };

  const setAccessToken = (accessToken: string) => {
    accessTokenStore.setState(() => accessToken);
  };

  return {
    user,
    accessToken,
    setAccessToken,
    login,
    logout,
    updateUser,
  };
};
