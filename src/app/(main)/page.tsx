import { FC } from 'react';
import HomePage from '@/components/pages/HomePage';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getInfiniteAnimeUpdatesQueryHookParams } from '@/hooks/api/anilibria/getInfiniteAnimeUpdatesQueryHookParams';

const Page: FC = async () => {
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
