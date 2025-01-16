import { NextPage } from 'next';
import Profile from '@/components/pages/Profile';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { userApi } from '@/services/api/main/User.api';
import { KimikastQueryKeys } from '@/enums/KimikastQueryKeys.enum';

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { name } = await params;
  const clearedUsername = name.replace(/^(@|%40)/, '');

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [KimikastQueryKeys.PUBLIC_USER, clearedUsername],
    queryFn: () => userApi.getPublicUser(clearedUsername),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Profile name={clearedUsername} />
    </HydrationBoundary>
  );
};

export default Page;
