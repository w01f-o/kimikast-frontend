import { Store } from "@tanstack/store";
import { User } from "@/types/entities/Auth.type";

export const userStore = new Store<User | null>(null);
export const accessTokenStore = new Store<string | null>(null);

export const setUser = (user: User) => {
  userStore.setState(() => user);
};

export const removeUser = () => {
  userStore.setState(() => null);
};

export const updateUser = (user: User) => {
  userStore.setState((prev) => ({ ...prev, ...user }));
};
