import { axiosMainWithAuth } from '@/services/api/interceptors';
import { List } from '@/types/entities/List.type';
import { CreateListDto } from '@/types/dto/CreateList.dto';
import { UpdateListDto } from '@/types/dto/UpdateList.dto';
import { UpdateAnimeDto } from '@/types/dto/UpdateAnimeDto';

const ENDPOINT = 'list';

const findAll = async () => {
  const response = await axiosMainWithAuth.get<List[]>(`/${ENDPOINT}`);

  return response.data;
};

const findById = async (id: string) => {
  const response = await axiosMainWithAuth.get<List>(`/${ENDPOINT}/${id}`);

  return response.data;
};

const create = async (dto: CreateListDto) => {
  const response = await axiosMainWithAuth.post<List>(`/${ENDPOINT}`, dto);

  return response.data;
};

const update = async (id: string, dto: UpdateListDto) => {
  const response = await axiosMainWithAuth.patch<List>(
    `/${ENDPOINT}/${id}`,
    dto
  );

  return response.data;
};

const addAnime = async (listId: string, dto: UpdateAnimeDto) => {
  const response = await axiosMainWithAuth.post(
    `/${ENDPOINT}/${listId}/add_anime`,
    dto
  );

  return response.data;
};

const removeAnime = async (listId: string, dto: UpdateAnimeDto) => {
  const response = await axiosMainWithAuth.post(
    `/${ENDPOINT}/${listId}/remove_anime`,
    dto
  );

  return response.data;
};

const deleteList = async (id: string) => {
  const response = await axiosMainWithAuth.delete(`/${ENDPOINT}/${id}`);

  return response.data;
};

export const listsApi = {
  findAll,
  findById,
  create,
  update,
  addAnime,
  removeAnime,
  deleteList,
};
