import {
  AnilibriaApi,
  AnilibriaQueryKeys,
  SearchResult,
} from '@/entities/anime';
import { useQuery } from '@tanstack/react-query';

interface UseSearchAnimeReturn {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  result: SearchResult | undefined;
  emptyResult: boolean;
  pageCount: number | undefined;
}

interface UseSearchAnimeParams {
  query?: string;
  years?: string;
  genres?: string;
  page?: string;
}

type UseSearchAnime = (params: UseSearchAnimeParams) => UseSearchAnimeReturn;

export const useSearchAnime: UseSearchAnime = ({
  query,
  years,
  page,
  genres,
}) => {
  const {
    data: paginationData,
    isLoading: paginationIsLoading,
    isError: paginationIsError,
    isSuccess: paginationIsSuccess,
  } = useQuery({
    queryKey: [AnilibriaQueryKeys.PAGINATION, query, genres, years],
    queryFn: ({ signal }) =>
      AnilibriaApi.searchAnime(
        {
          search: query!,
          genres: genres!,
          year: years!,
          itemsPerPage: 18,
          filter: ['code'],
        },
        signal
      ),
    enabled: !!query || !!genres || !!years,
  });

  const {
    data: result,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: [AnilibriaQueryKeys.SEARCH, query, years, genres, page],
    queryFn: ({ signal }) =>
      AnilibriaApi.searchAnime(
        {
          search: query!,
          genres: genres!,
          year: years!,
          itemsPerPage: 18,
          ...(page && { page: Number(page) }),
        },
        signal
      ),
    enabled: () => (!!query || !!genres || !!years) && !!paginationData,
  });

  const searchIsLoading = isLoading || paginationIsLoading;

  return {
    isError: isError || paginationIsError,
    isLoading: searchIsLoading,
    isSuccess: isSuccess && paginationIsSuccess,
    result,
    pageCount: paginationData?.pagination.pages,
    emptyResult:
      !result?.list.length &&
      (!!query || !!genres || !!years) &&
      !searchIsLoading,
  };
};
