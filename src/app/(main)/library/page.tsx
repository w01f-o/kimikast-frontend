import { LibraryPage } from '@/_pages/library';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Kimikast - Моя библиотека',
};

const Page: NextPage = () => {
  return <LibraryPage />;
};

export default Page;
