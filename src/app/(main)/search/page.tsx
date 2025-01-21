import { SearchPage } from '@/_pages/search';
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
  const { query, years, genres, page } = await searchParams;

  return <SearchPage page={page} query={query} years={years} genres={genres} />;
};

export default Page;
