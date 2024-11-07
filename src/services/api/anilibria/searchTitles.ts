import axios from "axios";
import { ANILIBRIA_API_URL } from "@/services/api/anilibria/index";
import { Title } from "@/types/entities/Title.type";

interface SearchTitlesParams {
  search: string;
  year?: string[];
  type?: string[];
  genres?: string[];
  team?: string[];
  voice?: string[];
  translator?: string[];
  editing?: string[];
  decor?: string[];
  timing?: string[];
  filter?: string[];
  remove?: string[];
  include?: ["raw_poster"?, "raw_torrent"?, "torrent_meta"?];
  description_type?: "html" | "plain" | "no_view_order";
  playlist_type?: "object" | "array";
}

export interface SearchResult {
  list: Title[];
  pagination: {
    current_page: number;
    items_per_page: number;
    pages: number;
    total_items: number;
  };
}

type searchTitlesType = (
  searchParams: SearchTitlesParams,
) => Promise<SearchResult>;

export const searchTitles: searchTitlesType = async (params) => {
  if (!params.playlist_type) {
    params.playlist_type = "array";
  }

  for (const paramsKey in params) {
    const key = paramsKey as keyof SearchTitlesParams;

    if (Array.isArray(params[key])) {
      params[key] = params[key].join(",") as never;
    }
  }

  const { data } = await axios.get<SearchResult>(
    `${ANILIBRIA_API_URL}/title/search`,
    {
      params,
    },
  );

  return data;
};
