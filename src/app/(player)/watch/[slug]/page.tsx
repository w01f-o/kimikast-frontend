import { Metadata, NextPage } from 'next';
import { QueryClient } from '@tanstack/react-query';
import WatchPage from '@/components/pages/WatchPage';
import { getAnimeQueryHookParams } from '@/hooks/api/anilibria/useAnime';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    episode: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery({
    ...getAnimeQueryHookParams({ code: slug }),
  });

  return {
    title: `Kimikast - ${data.names.ru}`,
  };
}

const Page: NextPage<PageProps> = async ({ params, searchParams }) => {
  const { slug } = await params;
  const episode = (await searchParams)?.episode;

  return <WatchPage slug={slug} episode={episode} />;
};

export default Page;
