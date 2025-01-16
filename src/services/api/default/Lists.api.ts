import { List } from '@/types/entities/List.type';
import { CreateListDto } from '@/types/dto/CreateList.dto';
import { UpdateListDto } from '@/types/dto/UpdateList.dto';
import { UpdateAnimeDto } from '@/types/dto/UpdateAnime.dto';
import { axiosWithAuth } from '@/services/api/default/AxiosInstances';

export class ListsApi {
  private static readonly ENDPOINT: string = 'list';

  public static async findAll(signal?: AbortSignal): Promise<List[]> {
    const { data } = await axiosWithAuth.get<List[]>(`/${this.ENDPOINT}`, {
      signal,
    });

    return data;
  }

  public static async findById(
    id: string,
    signal?: AbortSignal
  ): Promise<List> {
    const { data } = await axiosWithAuth.get<List>(`/${this.ENDPOINT}/${id}`, {
      signal,
    });

    return data;
  }

  public static async create(
    dto: CreateListDto,
    signal?: AbortSignal
  ): Promise<List> {
    const { data } = await axiosWithAuth.post<List>(`/${this.ENDPOINT}`, dto, {
      signal,
    });

    return data;
  }

  public static async update(
    id: string,
    dto: UpdateListDto,
    signal?: AbortSignal
  ): Promise<List> {
    const { data } = await axiosWithAuth.patch<List>(
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
  ): Promise<List> {
    const { data } = await axiosWithAuth.post<List>(
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
  ): Promise<List> {
    const { data } = await axiosWithAuth.post<List>(
      `/${this.ENDPOINT}/${listId}/remove_anime`,
      dto,
      { signal }
    );

    return data;
  }
}
