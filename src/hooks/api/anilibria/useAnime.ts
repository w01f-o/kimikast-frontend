import {
  QueryKey,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { AnilibriaQueryKeys } from '@/enums/AnilibriaQueryKeys.enum';
import { AnilibriaApi } from '@/services/api/anilibria/Anilibria.api';
import { GetTitleParams } from '@/types/anilibria/GetAnimeParams.type';
import { Anime } from '@/types/anilibria/entities/Anime.type';

interface UseAnimeReturn {
  anime: Anime;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}

type UseAnime = (params: GetTitleParams) => UseAnimeReturn;

export const getAnimeQueryHookParams = (
  params: GetTitleParams
): UseSuspenseQueryOptions<Anime, Error, Anime, QueryKey> => ({
  queryKey: [AnilibriaQueryKeys.TITLE, ...Object.values(params)],
  queryFn: ({ signal }) => AnilibriaApi.getAnime(params, signal),
});

export const useAnime: UseAnime = params => {
  const {
    isLoading,
    isError,
    isSuccess,
    data: anime,
  } = useSuspenseQuery({
    ...getAnimeQueryHookParams(params),
  });

  return {
    anime,
    isError,
    isLoading,
    isSuccess,
  };
};
