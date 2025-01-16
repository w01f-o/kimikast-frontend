import { Title } from '@/types/entities/Title.type';
import { axiosAnilibria } from '@/services/api/interceptors';

interface getTitlesListParams {
  id_list?: number[];
  code_list?: string[];
  filter?: string[];
  remove?: string[];
  include?: ['raw_poster'?, 'raw_torrent'?, 'torrent_meta'?];
  description_type?: 'html' | 'plain' | 'no_view_order';
  playlist_type?: 'object' | 'array';
}

type getTitlesListType = (params: getTitlesListParams) => Promise<Title[]>;

export const getTitlesList: getTitlesListType = async params => {
  for (const paramsKey in params) {
    const key = paramsKey as keyof getTitlesListParams;

    if (Array.isArray(params[key])) {
      params[key] = params[key].join(',') as never;
    }
  }

  const { data } = await axiosAnilibria.get<Title[]>('/title/list', {
    params,
  });

  return data;
};
