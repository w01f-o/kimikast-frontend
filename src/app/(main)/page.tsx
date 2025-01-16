import { FC } from 'react';
import Home from '@/components/pages/Home';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { AnilibriaQueryKeys } from '@/enums/AnilibriaQueryKeys.enum';
import { AnilibriaApi } from '@/services/api/anilibria/Anilibria.api';

const Page: FC = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [AnilibriaQueryKeys.UPDATES],
    queryFn: ({ pageParam }) =>
      AnilibriaApi.getTitleUpdates({ page: pageParam, itemsPerPage: 24 }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home />
    </HydrationBoundary>
  );
};

export default Page;
