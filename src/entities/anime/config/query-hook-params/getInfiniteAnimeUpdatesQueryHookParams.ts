import {
  AnilibriaApi,
  AnilibriaQueryKeys,
  SearchResult,
} from '@/entities/anime';
import {
  InfiniteData,
  QueryKey,
  UndefinedInitialDataInfiniteOptions,
} from '@tanstack/react-query';

export const getInfiniteAnimeUpdatesQueryHookParams =
  (): UndefinedInitialDataInfiniteOptions<
    SearchResult,
    Error,
    InfiniteData<SearchResult, number>,
    QueryKey,
    number
  > => ({
    queryKey: [AnilibriaQueryKeys.UPDATES],
    queryFn: ({ pageParam }) =>
      AnilibriaApi.getAnimeUpdates({ page: pageParam, itemsPerPage: 24 }),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage?.pagination?.currentPage + 1 || undefined,
    getPreviousPageParam: firstPage =>
      firstPage?.pagination?.currentPage - 1 || undefined,
  });
