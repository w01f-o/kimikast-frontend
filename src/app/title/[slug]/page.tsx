import { NextPage } from "next";
import TitlePage from "@/components/pages/TitlePage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { AnilibriaQueryKeys } from "@/enums/AnilibriaQueryKeys.enum";
import { getTitle } from "@/services/api/anilibria";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { slug } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [AnilibriaQueryKeys.TITLE],
    queryFn: () => getTitle({ slug }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TitlePage slug={slug} />
    </HydrationBoundary>
  );
};

export default Page;
