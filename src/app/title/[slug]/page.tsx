import { Metadata, NextPage } from "next";
import TitlePage from "@/components/pages/TitlePage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { AnilibriaQueryKeys } from "@/enums/AnilibriaQueryKeys.enum";
import { getTitle } from "@/services/api/anilibria";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const queryClient = new QueryClient();

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await queryClient.fetchQuery({
    queryKey: [AnilibriaQueryKeys.TITLE, slug],
    queryFn: () => getTitle({ code: slug }),
  });

  return {
    title: `Kimikast - ${data.names.ru}`,
    description: data.description,
    keywords: [
      data.names.ru,
      ...data.genres,
      data.names.en,
      data.names.alternative ? data.names.alternative : "",
    ],
  };
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { slug } = await params;

  await queryClient.prefetchQuery({
    queryKey: [AnilibriaQueryKeys.TITLE, slug],
    queryFn: () => getTitle({ code: slug }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TitlePage slug={slug} />
    </HydrationBoundary>
  );
};

export default Page;
