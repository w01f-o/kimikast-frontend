import { Metadata, NextPage } from "next";
import { QueryClient } from "@tanstack/react-query";
import Watch from "@/components/pages/Watch";
import { AnilibriaQueryKeys } from "@/enums/AnilibriaQueryKeys.enum";
import { anilibriaApi } from "@/services/api/anilibria/Anilibria.api";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: [AnilibriaQueryKeys.TITLE, slug],
    queryFn: () => anilibriaApi.getTitle({ code: slug }),
  });

  return {
    title: `Kimikast - ${data.names.ru}`,
  };
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { slug } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [AnilibriaQueryKeys.TITLE, slug],
    queryFn: () => anilibriaApi.getTitle({ code: slug }),
  });

  return <Watch slug={slug} />;
};

export default Page;
