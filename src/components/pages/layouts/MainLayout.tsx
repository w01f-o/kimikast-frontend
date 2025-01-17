import { FC, ReactNode } from 'react';
import Header from '@/components/widgets/Header';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';

interface LayoutProps {
  children: ReactNode;
}

const DynamicSnowfall = dynamic(() => import('@/components/widgets/Snowfall'));

const MainLayout: FC<LayoutProps> = ({ children }) => {
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

export default MainLayout;
