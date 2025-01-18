import '@/app/styles/globals.css';

import { RootProvider } from '@/app/providers';
import { WatchLayout } from '@/shared/ui';
import clsx from 'clsx';
import { Noto_Sans } from 'next/font/google';
import { FC, ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

const notoSansFont = Noto_Sans({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="ru" className="dark">
      <body className={clsx('antialiased', notoSansFont.className)}>
        <RootProvider>
          <WatchLayout>{children}</WatchLayout>
        </RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
