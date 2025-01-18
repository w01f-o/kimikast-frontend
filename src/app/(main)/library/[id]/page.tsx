import { ListPage } from '@/_pages/library';
import { NextPage } from 'next';

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
