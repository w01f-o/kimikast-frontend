import {
  QueryKey,
  UndefinedInitialDataOptions,
  useQuery,
} from '@tanstack/react-query';
import { AnilibriaQueryKeys } from '@/enums/AnilibriaQueryKeys.enum';
import { AnilibriaApi } from '@/services/api/anilibria/Anilibria.api';
import { Anime } from '@/types/anilibria/entities/Anime.type';
import { GetTitlesListParams } from '@/types/anilibria/GetAnimeListParams.type';

interface UseAnimeListReturn {
  animes: Anime[] | undefined;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}

interface UseAnimeListParams {
  apiParams: GetTitlesListParams;
  hookParams?: Omit<
    UndefinedInitialDataOptions<Anime[], Error, Anime[], QueryKey>,
    'queryFn' | 'queryKey'
  >;
}

type UseAnimeList = (params: UseAnimeListParams) => UseAnimeListReturn;

export const getAnimeListQueryHookParams = (
  params: GetTitlesListParams
): UndefinedInitialDataOptions<Anime[], Error, Anime[], QueryKey> => ({
  queryKey: [AnilibriaQueryKeys.ANIME_LIST, ...Object.values(params)],
  queryFn: ({ signal }) => AnilibriaApi.getAnimeList(params, signal),
});

export const useAnimeList: UseAnimeList = ({ apiParams, hookParams }) => {
  const {
    isLoading,
    isError,
    isSuccess,
    data: animes,
  } = useQuery({
    ...getAnimeListQueryHookParams(apiParams),
    ...hookParams,
  });

  return {
    animes,
    isError,
    isLoading,
    isSuccess,
  };
};
