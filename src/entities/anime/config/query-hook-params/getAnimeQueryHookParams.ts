import {
  AnilibriaApi,
  AnilibriaQueryKeys,
  Anime,
  GetAnimeParams,
} from '@/entities/anime';
import { QueryKey, UseSuspenseQueryOptions } from '@tanstack/react-query';

export const getAnimeQueryHookParams = (
  params: GetAnimeParams
): UseSuspenseQueryOptions<Anime, Error, Anime, QueryKey> => ({
  queryKey: [AnilibriaQueryKeys.ANIME, ...Object.values(params)],
  queryFn: ({ signal }) => AnilibriaApi.getAnime(params, signal),
});
