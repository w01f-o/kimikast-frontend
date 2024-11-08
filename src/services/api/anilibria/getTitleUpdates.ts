import { SearchResult } from "@/services/api/anilibria/searchTitles";
import { axiosAnilibria } from "@/services/api/interceptors";

interface GetTitleUpdatesParams {
  since?: number;
  page?: number;
  items_per_page?: number;
  filter?: string[];
  remove?: string[];
  include?: ["raw_poster"?, "raw_torrent"?, "torrent_meta"?];
  description_type?: "html" | "plain" | "no_view_order";
  playlist_type?: "object" | "array";
}

type getTitleUpdatesType = (
  params: GetTitleUpdatesParams,
) => Promise<SearchResult>;

export const getTitleUpdates: getTitleUpdatesType = async (params) => {
  if (!params.playlist_type) {
    params.playlist_type = "array";
  }

  for (const paramsKey in params) {
    const key = paramsKey as keyof GetTitleUpdatesParams;

    if (Array.isArray(params[key])) {
      params[key] = params[key].join(",") as never;
    }
  }

  const { data } = await axiosAnilibria.get<SearchResult>("/title/updates", {
    params,
  });

  return data;
};
