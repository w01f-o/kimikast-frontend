import {
  AnilibriaApi,
  AnilibriaQueryKeys,
  Anime,
  GetTitlesListParams,
} from '@/entities/anime';
import { QueryKey, UndefinedInitialDataOptions } from '@tanstack/react-query';

export const getAnimeListQueryHookParams = (
  params: GetTitlesListParams
): UndefinedInitialDataOptions<Anime[], Error, Anime[], QueryKey> => ({
  queryKey: [AnilibriaQueryKeys.ANIME_LIST, ...Object.values(params)],
  queryFn: ({ signal }) => AnilibriaApi.getAnimeList(params, signal),
});
