import { AuthForm, PublicUser, User } from '@/entities/user';
import { axiosDefault, axiosWithAuth } from '@/shared/api';

export class UserApi {
  private static readonly ENDPOINT: string = 'user';

  public static async find(): Promise<User> {
    const { data } = await axiosWithAuth.get<User>(`/${this.ENDPOINT}`);

    return data;
  }

  public static async findPublic(name: string): Promise<PublicUser> {
    const { data } = await axiosDefault.get<PublicUser>(
      `/${this.ENDPOINT}/public/${name}`
    );

    return data;
  }

  public static async update(user: Partial<AuthForm>): Promise<User> {
    const { data } = await axiosWithAuth.patch<User>(`/${this.ENDPOINT}`, user);

    return data;
  }

  public static async delete() {
    const { data } = await axiosWithAuth.delete(`/${this.ENDPOINT}`);

    return data;
  }
}
