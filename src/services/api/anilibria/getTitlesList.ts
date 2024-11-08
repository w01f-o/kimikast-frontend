import { Title } from "@/types/entities/Title.type";
import axios from "axios";
import { ANILIBRIA_API_URL } from "@/services/api/anilibria/index";

interface getTitlesListParams {
  id_list?: number[];
  code_list?: string[];
  filter?: string[];
  remove?: string[];
  include?: ["raw_poster"?, "raw_torrent"?, "torrent_meta"?];
  description_type?: "html" | "plain" | "no_view_order";
  playlist_type?: "object" | "array";
}

type getTitlesListType = (params: getTitlesListParams) => Promise<Title[]>;

export const getTitlesList: getTitlesListType = async (params) => {
  if (!params.playlist_type) {
    params.playlist_type = "array";
  }

  for (const paramsKey in params) {
    const key = paramsKey as keyof getTitlesListParams;

    if (Array.isArray(params[key])) {
      params[key] = params[key].join(",") as never;
    }
  }

  const { data } = await axios.get<Title[]>(`${ANILIBRIA_API_URL}/title/list`, {
    params,
  });

  return data;
};
