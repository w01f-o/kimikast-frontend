import { Filters, getAnimeFiltersHooksParams } from '@/entities/anime';
import { useSuspenseQuery } from '@tanstack/react-query';

interface UseAnimeFiltersReturn {
  availableFilters: Filters;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

type UseAnimeFilters = () => UseAnimeFiltersReturn;

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
