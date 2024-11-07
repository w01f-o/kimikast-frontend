import { FC } from "react";
import Home from "@/components/pages/Home";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { AnilibriaQueryKeys } from "@/enums/AnilibriaQueryKeys.enum";
import { getTitleUpdates } from "@/services/api/anilibria/getTitleUpdates";

const Page: FC = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [AnilibriaQueryKeys.UPDATES],
    queryFn: ({ pageParam }) =>
      getTitleUpdates({ page: pageParam, items_per_page: 24 }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home />
    </HydrationBoundary>
  );
};

export default Page;
