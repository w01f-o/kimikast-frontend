import { useRouter, useSearchParams } from 'next/navigation';
import { RoutePaths } from '@/enums/RoutePaths.enum';

export const useSearchFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (params: {
    query?: string;
    years?: string;
    genres?: string;
    page?: string;
  }) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (params.query) newSearchParams.set('query', params.query);
    if (params.years) newSearchParams.set('years', params.years);
    if (params.genres) newSearchParams.set('genres', params.genres);
    if (params.page) newSearchParams.set('page', params.page);

    router.push(`${RoutePaths.SEARCH}?${newSearchParams}`, {
      scroll: false,
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
};
