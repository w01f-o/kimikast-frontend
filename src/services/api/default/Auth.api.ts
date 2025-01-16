import { AuthForm, AuthResponse } from '@/types/entities/Auth.type';
import {
  removeAccessToken,
  saveAccessToken,
} from '@/services/auth/token.service';
import { removeUser, setUser } from '@/store/user.store';
import { axiosDefault } from '@/services/api/default/AxiosInstances';

export class AuthApi {
  private static readonly ENDPOINT: string = 'auth';

  public static async authorize(type: 'login' | 'register', data: AuthForm) {
    const { data: response } = await axiosDefault.post<AuthResponse>(
      `/${this.ENDPOINT}/${type}`,
      data
    );

    if (response.accessToken) {
      saveAccessToken(response.accessToken);
    }

    setUser(response.user);

    return response;
  }

  public static async refresh() {
    const { data: response } = await axiosDefault.post<AuthResponse>(
      `/${this.ENDPOINT}/refresh`
    );

    if (response.accessToken) {
      saveAccessToken(response.accessToken);
    }

    return response;
  }

  public static async logout() {
    const { data } = await axiosDefault.post(`/${this.ENDPOINT}/logout`);

    if (data) {
      removeAccessToken();
    }

    removeUser();

    return data;
  }
}
