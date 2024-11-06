import axios from "axios";
import { ANILIBRIA_API_URL } from "@/services/api/anilibria/index";
import { Title } from "@/types/entities/Title.type";

interface searchTitlesParams {
  search: string;
}

type searchTitlesType = (params: searchTitlesParams) => Promise<Title[]>;

export const searchTitles: searchTitlesType = async ({ search }) => {
  const searchParams = new URLSearchParams({ search });

  const { data } = await axios.get(
    `${ANILIBRIA_API_URL}/title/search?${searchParams}`,
  );

  return data;
};
