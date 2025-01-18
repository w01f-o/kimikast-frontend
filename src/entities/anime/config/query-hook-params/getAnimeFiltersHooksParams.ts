import { AnilibriaApi, AnilibriaQueryKeys, Filters } from '@/entities/anime';
import { UseSuspenseQueryOptions } from '@tanstack/react-query';

export const getAnimeFiltersHooksParams = (): UseSuspenseQueryOptions<
  Filters,
  Error,
  Filters,
  AnilibriaQueryKeys[]
> => ({
  queryKey: [AnilibriaQueryKeys.FILTERS],
  queryFn: () => AnilibriaApi.getAnimeFilters(),
});
