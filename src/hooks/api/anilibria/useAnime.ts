import {
  QueryKey,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { AnilibriaQueryKeys } from '@/enums/AnilibriaQueryKeys.enum';
import { AnilibriaApi } from '@/services/api/anilibria/Anilibria.api';
import { GetTitleParams } from '@/types/anilibria/GetTitleParams.type';
import { Title } from '@/types/anilibria/entities/Title.type';

interface UseAnimeReturn {
  anime: Title;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}

type UseAnime = (params: GetTitleParams) => UseAnimeReturn;

export const getAnimeQueryHookParams = (
  params: GetTitleParams
): UseSuspenseQueryOptions<Title, Error, Title, QueryKey> => ({
  queryKey: [AnilibriaQueryKeys.TITLE, ...Object.values(params)],
  queryFn: ({ signal }) => AnilibriaApi.getTitle(params, signal),
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
