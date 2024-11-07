import { Metadata, NextPage } from "next";
import { QueryClient } from "@tanstack/react-query";
import Watch from "@/components/pages/Watch";
import { getTitle } from "@/services/api/anilibria";
import { AnilibriaQueryKeys } from "@/enums/AnilibriaQueryKeys.enum";

const queryClient = new QueryClient();

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

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
  };
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { slug } = await params;

  await queryClient.prefetchQuery({
    queryKey: [AnilibriaQueryKeys.TITLE, slug],
    queryFn: () => getTitle({ code: slug }),
  });

  return <Watch slug={slug} />;
};

export default Page;
