import {
  CreateListDto,
  UpdateAnimeDto,
  UpdateListDto,
  UserList,
} from '@/entities/user-list';
import { axiosWithAuth } from '@/shared/api';

export class UserListsApi {
  private static readonly ENDPOINT: string = 'list';

  public static async findAll(signal?: AbortSignal): Promise<UserList[]> {
    const { data } = await axiosWithAuth.get<UserList[]>(`/${this.ENDPOINT}`, {
      signal,
    });

    return data;
  }

  public static async findById(
    id: string,
    signal?: AbortSignal
  ): Promise<UserList> {
    const { data } = await axiosWithAuth.get<UserList>(
      `/${this.ENDPOINT}/${id}`,
      {
        signal,
      }
    );

    return data;
  }

  public static async create(
    dto: CreateListDto,
    signal?: AbortSignal
  ): Promise<UserList> {
    const { data } = await axiosWithAuth.post<UserList>(
      `/${this.ENDPOINT}`,
      dto,
      {
        signal,
      }
    );

    return data;
  }

  public static async update(
    id: string,
    dto: UpdateListDto,
    signal?: AbortSignal
  ): Promise<UserList> {
    const { data } = await axiosWithAuth.patch<UserList>(
      `/${this.ENDPOINT}/${id}`,
      dto,
      { signal }
    );

    return data;
  }

  public static async addAnime(
    listId: string,
    dto: UpdateAnimeDto,
    signal?: AbortSignal
  ): Promise<UserList> {
    const { data } = await axiosWithAuth.post<UserList>(
      `/${this.ENDPOINT}/${listId}/add_anime`,
      dto,
      { signal }
    );

    return data;
  }

  public static async removeAnime(
    listId: string,
    dto: UpdateAnimeDto,
    signal?: AbortSignal
  ): Promise<UserList> {
    const { data } = await axiosWithAuth.post<UserList>(
      `/${this.ENDPOINT}/${listId}/remove_anime`,
      dto,
      { signal }
    );

    return data;
  }
}
