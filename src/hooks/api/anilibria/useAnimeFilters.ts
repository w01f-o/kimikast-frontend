import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { AnilibriaQueryKeys } from '@/enums/AnilibriaQueryKeys.enum';
import { AnilibriaApi } from '@/services/api/anilibria/Anilibria.api';
import { Filters } from '@/types/anilibria/entities/Filters.type';

interface UseAnimeFiltersReturn {
  availableFilters: Filters;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

type UseAnimeFilters = () => UseAnimeFiltersReturn;

export const getAnimeFiltersHooksParams = (): UseSuspenseQueryOptions<
  Filters,
  Error,
  Filters,
  AnilibriaQueryKeys[]
> => ({
  queryKey: [AnilibriaQueryKeys.FILTERS],
  queryFn: () => AnilibriaApi.getAnimeFilters(),
});

export const useAnimeFilters: UseAnimeFilters = () => {
  const {
    data: availableFilters,
    isError,
    isSuccess,
    isLoading,
  } = useSuspenseQuery({
    ...getAnimeFiltersHooksParams(),
  });

  return {
    availableFilters,
    isError,
    isLoading,
    isSuccess,
  };
};
