import {
  Anime,
  getAnimeListQueryHookParams,
  GetTitlesListParams,
} from '@/entities/anime';
import {
  QueryKey,
  UndefinedInitialDataOptions,
  useQuery,
} from '@tanstack/react-query';

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
