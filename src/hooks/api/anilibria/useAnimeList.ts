import {
  QueryKey,
  UndefinedInitialDataOptions,
  useQuery,
} from '@tanstack/react-query';
import { AnilibriaQueryKeys } from '@/enums/AnilibriaQueryKeys.enum';
import { AnilibriaApi } from '@/services/api/anilibria/Anilibria.api';
import { Title } from '@/types/anilibria/entities/Title.type';
import { GetTitlesListParams } from '@/types/anilibria/GetTitleListParams.type';

interface UseAnimeListReturn {
  animes: Title[] | undefined;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}

interface UseAnimeListParams {
  apiParams: GetTitlesListParams;
  hookParams?: Omit<
    UndefinedInitialDataOptions<Title[], Error, Title[], QueryKey>,
    'queryFn' | 'queryKey'
  >;
}

type UseAnimeList = (params: UseAnimeListParams) => UseAnimeListReturn;

export const getAnimeListQueryHookParams = (
  params: GetTitlesListParams
): UndefinedInitialDataOptions<Title[], Error, Title[], QueryKey> => ({
  queryKey: [AnilibriaQueryKeys.TITLE, ...Object.values(params)],
  queryFn: ({ signal }) => AnilibriaApi.getTitlesList(params, signal),
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
