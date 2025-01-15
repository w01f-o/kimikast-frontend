import { Metadata, NextPage } from "next";
import TitlePage from "@/components/pages/TitlePage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { AnilibriaQueryKeys } from "@/enums/AnilibriaQueryKeys.enum";
import { notFound } from "next/navigation";
import { anilibriaApi } from "@/services/api/anilibria/Anilibria.api";
import { getCommentsQueryHookParams } from "@/hooks/api/useComments";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 86100;
export const dynamicParams = true;

export async function generateStaticParams() {
  const queryClient = new QueryClient();

  return (
    await queryClient.fetchQuery({
      queryKey: [AnilibriaQueryKeys.STATIC_UPDATES],
      queryFn: () =>
        anilibriaApi.getTitleUpdates({
          since: 1,
          items_per_page: 5,
          filter: ["code"],
        }),
    })
  ).list.map((title) => ({ slug: title.code }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const queryClient = new QueryClient();

  const { slug } = await params;

  const data = await queryClient.fetchQuery({
    queryKey: [AnilibriaQueryKeys.TITLE, slug],
    queryFn: () => anilibriaApi.getTitle({ code: slug }),
  });

  if (data) {
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

  return {
    title: "Kimikast",
  };
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { slug } = await params;

  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: [AnilibriaQueryKeys.TITLE, slug],
    queryFn: () => anilibriaApi.getTitle({ code: slug }),
  });

  if (!data) {
    notFound();
  }

  const franchiseSlugList = data.franchises
    .map(({ releases }) =>
      releases
        .map((release) => release.code)
        .filter((slug) => slug !== data.code),
    )
    .flat();

  if (franchiseSlugList.length > 0) {
    await queryClient.prefetchQuery({
      queryKey: [AnilibriaQueryKeys.TITLE_LIST, franchiseSlugList],
      queryFn: () =>
        anilibriaApi.getTitlesList({ code_list: franchiseSlugList }),
    });
  }

  await queryClient.prefetchQuery({
    ...getCommentsQueryHookParams({ slug }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TitlePage slug={slug} />
    </HydrationBoundary>
  );
};

export default Page;
