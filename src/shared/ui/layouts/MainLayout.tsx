import { Header } from '@/widgets/header';
import dynamic from 'next/dynamic';
import NextTopLoader from 'nextjs-toploader';
import { FC, PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

const DynamicSnowfall = dynamic(() =>
  import('@/widgets/snowfall').then(module => module.Snowfall)
);

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex-grow">
        {children}

        <NextTopLoader showSpinner={false} />
        <Toaster />
        <DynamicSnowfall />
      </main>
    </>
  );
};
