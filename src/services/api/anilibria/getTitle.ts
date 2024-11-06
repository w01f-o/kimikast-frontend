import axios from "axios";
import { Title } from "@/types/entities/Title.type";
import { ANILIBRIA_API_URL } from "@/services/api/anilibria/index";

type getTitleParams = {
  id?: string;
  slug?: string;
};

type getTitleType = (params: getTitleParams) => Promise<Title>;

export const getTitle: getTitleType = async ({ id, slug }) => {
  const searchParams = new URLSearchParams();

  if (id) searchParams.append("id", id);
  if (slug) searchParams.append("slug", slug);

  const { data } = await axios.get(
    `${ANILIBRIA_API_URL}/title?${searchParams}`,
  );

  return data;
};
