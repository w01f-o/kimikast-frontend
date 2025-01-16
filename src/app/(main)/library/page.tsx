import { Metadata, NextPage } from 'next';
import { Suspense } from 'react';
import LibraryPage from '@/components/pages/library/LibraryPage';

export const metadata: Metadata = {
  title: 'Kimikast - Моя библиотека',
};

const Page: NextPage = () => {
  return (
    <Suspense>
      <LibraryPage />
    </Suspense>
  );
};

export default Page;
