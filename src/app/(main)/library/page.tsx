import { Metadata, NextPage } from 'next';
import LibraryPage from '@/components/pages/library/LibraryPage';

export const metadata: Metadata = {
  title: 'Kimikast - Моя библиотека',
};

const Page: NextPage = () => {
  return <LibraryPage />;
};

export default Page;
