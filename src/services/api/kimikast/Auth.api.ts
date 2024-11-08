import { AuthForm, AuthResponse } from "@/types/entities/Auth.type";
import { axiosKimikast } from "@/services/api/interceptors";
import {
  removeAccessToken,
  saveAccessToken,
} from "@/services/auth/token.service";
import { removeUser, setUser } from "@/store/user.store";

const ENDPOINT = "auth";

const authorize = async (type: "login" | "register", data: AuthForm) => {
  const response = await axiosKimikast.post<AuthResponse>(
    `/${ENDPOINT}/${type}`,
    data,
  );

  if (response.data.accessToken) {
    saveAccessToken(response.data.accessToken);
  }

  setUser(response.data.user);

  return response.data;
};

const refresh = async () => {
  const response = await axiosKimikast.post<AuthResponse>(
    `/${ENDPOINT}/refresh`,
  );

  if (response.data.accessToken) {
    saveAccessToken(response.data.accessToken);
  }

  return response.data;
};

const logout = async () => {
  const response = await axiosKimikast.post(`/${ENDPOINT}/logout`);

  if (response.data) {
    removeAccessToken();
  }

  removeUser();

  return response.data;
};

export const authApi = {
  refresh,
  logout,
  authorize,
};
