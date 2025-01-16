import { NextPage } from 'next';
import ListPage from '@/components/pages/library/ListPage';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params;

  return <ListPage id={id} />;
};

export default Page;
