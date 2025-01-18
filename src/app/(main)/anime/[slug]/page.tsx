import { AnimePage } from '@/_pages/anime';
import {
  AnilibriaApi,
  AnilibriaQueryKeys,
  getAnimeListQueryHookParams,
  getAnimeQueryHookParams,
} from '@/entities/anime';
import { getCommentsQueryHookParams } from '@/entities/comment';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata, NextPage } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 86100;
export const dynamicParams = true;

export async function generateStaticParams() {
  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: [AnilibriaQueryKeys.STATIC_UPDATES],
    queryFn: () =>
      AnilibriaApi.getAnimeUpdates({
        since: 1,
        itemsPerPage: 2,
        filter: ['code'],
      }),
  });

  if (!data) {
    notFound();
  }

  return data.list.map(title => ({ slug: title.code }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const queryClient = new QueryClient();

  try {
    const data = await queryClient.fetchQuery({
      ...getAnimeQueryHookParams({ code: slug }),
    });

    if (!data) {
      notFound();
    }

    return {
      title: `Kimikast - ${data.names.ru}`,
      description: data.description,
      keywords: [
        data.names.ru,
        ...data.genres,
        data.names.en,
        data.names.alternative ? data.names.alternative : '',
      ],
    };
  } catch {
    notFound();
  }
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { slug } = await params;

  const queryClient = new QueryClient();
  const data = await queryClient.fetchQuery({
    ...getAnimeQueryHookParams({ code: slug }),
  });

  if (!data) {
    notFound();
  }

  const franchiseSlugList = data.franchises
    .map(({ releases }) =>
      releases.map(release => release.code).filter(slug => slug !== data.code)
    )
    .flat();

  if (franchiseSlugList.length) {
    await queryClient.prefetchQuery({
      ...getAnimeListQueryHookParams({ codeList: franchiseSlugList }),
    });
  }

  await queryClient.prefetchQuery({
    ...getCommentsQueryHookParams({ slug }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AnimePage slug={slug} />
    </HydrationBoundary>
  );
};

export default Page;
