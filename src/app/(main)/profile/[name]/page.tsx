import { NextPage } from 'next';
import ProfilePage from '@/components/pages/ProfilePage';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getPublicUserQueryHookParams } from '@/hooks/api/usePublicUser';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { name } = await params;
  const clearedUsername = name.replace(/^(@|%40)/, '');

  const queryClient = new QueryClient();

  try {
    const data = await queryClient.fetchQuery({
      ...getPublicUserQueryHookParams(clearedUsername),
    });

    if (!data) {
      notFound();
    }
  } catch {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfilePage name={clearedUsername} />
    </HydrationBoundary>
  );
};

export default Page;
