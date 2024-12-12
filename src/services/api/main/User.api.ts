import { axiosMain, axiosMainWithAuth } from "@/services/api/interceptors";
import { AuthForm, User } from "@/types/entities/Auth.type";
import { PublicUser } from "@/types/entities/PublicUser.type";

const ENDPOINT = "user";

const getUser = async (): Promise<User> => {
  const { data } = await axiosMainWithAuth.get<User>(`/${ENDPOINT}`);

  return data;
};

const getPublicUser = async (name: string): Promise<PublicUser> => {
  const { data } = await axiosMain.get<PublicUser>(
    `/${ENDPOINT}/public/${name}`,
  );

  return data;
};

const updateUser = async (user: Partial<AuthForm>) => {
  const { data } = await axiosMainWithAuth.patch<User>(`/${ENDPOINT}`, user);

  return data;
};

const deleteUser = async () => {
  const { data } = await axiosMainWithAuth.delete(`/${ENDPOINT}`);

  return data;
};

export const userApi = {
  getUser,
  getPublicUser,
  updateUser,
  deleteUser,
};
