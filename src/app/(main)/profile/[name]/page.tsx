import { NextPage } from 'next';
import ProfilePage from '@/components/pages/ProfilePage';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { UserApi } from '@/services/api/default/User.api';
import { DefaultQueryKeys } from '@/enums/DefaulttQueryKeys.enum';

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
    queryKey: [DefaultQueryKeys.PUBLIC_USER, clearedUsername],
    queryFn: () => UserApi.findPublic(clearedUsername),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfilePage name={clearedUsername} />
    </HydrationBoundary>
  );
};

export default Page;
