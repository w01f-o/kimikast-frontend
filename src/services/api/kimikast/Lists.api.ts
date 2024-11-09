import { axiosKimikastWithAuth } from "@/services/api/interceptors";
import { List } from "@/types/entities/List.type";
import { CreateListDto } from "@/types/dto/CreateList.dto";
import { UpdateListDto } from "@/types/dto/UpdateList.dto";
import { UpdateAnimeDto } from "@/types/dto/UpdateAnimeDto";

const findAll = async () => {
  const response = await axiosKimikastWithAuth.get<List[]>("/list");

  return response.data;
};

const findById = async (id: string) => {
  const response = await axiosKimikastWithAuth.get<List>(`/list/${id}`);

  return response.data;
};

const create = async (dto: CreateListDto) => {
  const response = await axiosKimikastWithAuth.post<List>(`/list`, dto);

  return response.data;
};

const update = async (id: string, dto: UpdateListDto) => {
  const response = await axiosKimikastWithAuth.patch<List>(`/list/${id}`, dto);

  return response.data;
};

const addAnime = async (listId: string, dto: UpdateAnimeDto) => {
  const response = await axiosKimikastWithAuth.post(
    `/list/${listId}/add_anime`,
    dto,
  );

  return response.data;
};

const removeAnime = async (listId: string, dto: UpdateAnimeDto) => {
  const response = await axiosKimikastWithAuth.post(
    `/list/${listId}/remove_anime`,
    dto,
  );

  return response.data;
};

const deleteList = async (id: string) => {
  const response = await axiosKimikastWithAuth.delete(`/list/${id}`);

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
