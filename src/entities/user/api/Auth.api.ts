import { AuthForm, AuthResponse } from '@/entities/user';
import { axiosDefault } from '@/shared/api';
import { removeAccessToken, saveAccessToken } from '@/shared/lib';

export class AuthApi {
  private static readonly ENDPOINT: string = 'auth';

  public static async authorize(type: 'login' | 'register', data: AuthForm) {
    const { data: response } = await axiosDefault.post<AuthResponse>(
      `/${this.ENDPOINT}/${type}`,
      data
    );

    saveAccessToken(response.accessToken);

    return response;
  }

  public static async refresh() {
    const { data: response } = await axiosDefault.post<AuthResponse>(
      `/${this.ENDPOINT}/refresh`
    );

    saveAccessToken(response.accessToken);

    return response;
  }

  public static async logout() {
    const { data } = await axiosDefault.post(`/${this.ENDPOINT}/logout`);

    removeAccessToken();

    return data;
  }
}
