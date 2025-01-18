import { HomePage } from '@/_pages/home';
import { getInfiniteAnimeUpdatesQueryHookParams } from '@/entities/anime';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Kimikast - Главная',
};

const Page: NextPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    ...getInfiniteAnimeUpdatesQueryHookParams(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
};

export default Page;
