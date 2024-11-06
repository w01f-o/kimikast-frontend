import { NextPage } from "next";
import { QueryClient } from "@tanstack/react-query";
import Watch from "@/components/pages/Watch";
import { getTitle } from "@/services/api/anilibria";
import { AnilibriaQueryKeys } from "@/enums/AnilibriaQueryKeys.enum";

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

  return <Watch slug={slug} />;
};

export default Page;
