import {
  axiosKimikast,
  axiosKimikastWithAuth,
} from "@/services/api/interceptors";
import { User } from "@/types/entities/Auth.type";
import { PublicUser } from "@/types/entities/PublicUser.type";

const getUser = async (): Promise<User> => {
  const response = await axiosKimikastWithAuth.get<User>(`/user`);

  return response.data;
};

const getPublicUser = async (name: string): Promise<PublicUser> => {
  const response = await axiosKimikast.get<PublicUser>(`/user/public/${name}`);

  return response.data;
};

// const updateUser = async (user: AuthForm) => {
//   const response = await axiosKimikastWithAuth.patch<User>(`/user`);
//
//   return response.data;
// };

export const userApi = {
  getUser,
  getPublicUser,
};
