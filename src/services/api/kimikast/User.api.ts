import { axiosKimikastWithAuth } from "@/services/api/interceptors";
import { User } from "@/types/entities/Auth.type";

const getUser = async (): Promise<User> => {
  const response = await axiosKimikastWithAuth.get<User>(`/user`);

  return response.data;
};

export const userApi = {
  getUser,
};
