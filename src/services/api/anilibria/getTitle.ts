import axios from "axios";
import { Title } from "@/types/entities/Title.type";
import { ANILIBRIA_API_URL } from "@/services/api/anilibria/index";

type getTitleParams = {
  id?: string;
  code?: string;
  filter?: string[];
  remove?: string[];
  include?: ["raw_poster"?, "raw_torrent"?, "torrent_meta"?];
  descriptionType?: "html" | "plain" | "no_view_order";
  playlist_type?: "object" | "array";
};

type getTitleType = (params: getTitleParams) => Promise<Title>;

export const getTitle: getTitleType = async (params) => {
  if (!params.playlist_type) {
    params.playlist_type = "array";
  }

  for (const paramsKey in params) {
    const key = paramsKey as keyof getTitleParams;

    if (Array.isArray(params[key])) {
      params[key] = params[key].join(",") as never;
    }
  }

  const { data } = await axios.get<Title>(`${ANILIBRIA_API_URL}/title`, {
    params,
  });

  return data;
};
