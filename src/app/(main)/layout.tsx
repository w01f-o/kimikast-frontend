import '../styles/globals.css';
import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import RootProvider from '@/components/features/providers/RootProvider';
import MainLayout from '@/components/pages/layouts/MainLayout';
import { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Kimikast - Главная',
};

const notoSansFont = Noto_Sans({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="ru" className="dark">
      <body
        className={clsx(
          'antialiased',
          notoSansFont.className,
          'scrollbar_margin'
        )}
      >
        <RootProvider>
          <MainLayout>{children}</MainLayout>
        </RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
