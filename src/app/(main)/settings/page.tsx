import { NextPage } from 'next';
import SettingsPage from '@/components/pages/SettingsPage';

interface PageProps {
  searchParams: Promise<{
    tab: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { searchParams: { tab: 'apperance' } },
    { searchParams: { tab: 'account' } },
  ];
}

const Page: NextPage<PageProps> = async ({ searchParams }) => {
  const tab = (await searchParams)?.tab;

  return <SettingsPage tab={tab} />;
};

export default Page;
