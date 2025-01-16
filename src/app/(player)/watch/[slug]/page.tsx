import { Metadata, NextPage } from 'next';
import { QueryClient } from '@tanstack/react-query';
import Watch from '@/components/pages/Watch';
import { AnilibriaQueryKeys } from '@/enums/AnilibriaQueryKeys.enum';
import { AnilibriaApi } from '@/services/api/anilibria/Anilibria.api';

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
    queryKey: [AnilibriaQueryKeys.TITLE, slug],
    queryFn: () => AnilibriaApi.getTitle({ code: slug }),
  });

  return {
    title: `Kimikast - ${data.names.ru}`,
  };
}

const Page: NextPage<PageProps> = async ({ params, searchParams }) => {
  const { slug } = await params;
  const episode = (await searchParams)?.episode;

  return <Watch slug={slug} episode={episode} />;
};

export default Page;
