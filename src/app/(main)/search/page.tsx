import { SearchPage } from '@/_pages/search';
import { getAnimeFiltersHooksParams } from '@/entities/anime';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Kimikast - Поиск',
};

interface PageProps {
  searchParams: Promise<{
    query?: string;
    years?: string;
    genres?: string;
    page?: string;
  }>;
}

const Page: NextPage<PageProps> = async ({ searchParams }) => {
  const query = (await searchParams)?.query;
  const years = (await searchParams)?.years;
  const genres = (await searchParams)?.genres;
  const page = (await searchParams)?.page;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...getAnimeFiltersHooksParams(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchPage page={page} query={query} years={years} genres={genres} />
    </HydrationBoundary>
  );
};

export default Page;
