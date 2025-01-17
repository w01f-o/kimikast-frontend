'use client';

import { FC, ReactNode } from 'react';
import { HeroUIProvider } from '@heroui/react';
import TanStackProvider from '@/components/features/providers/TanStackProvider';
import { useRouter } from 'nextjs-toploader/app';

interface RootProviderProps {
  children: ReactNode;
}

const RootProvider: FC<RootProviderProps> = ({ children }) => {
  const router = useRouter();

  return (
    <HeroUIProvider
      navigate={router.push}
      className={'flex min-h-screen flex-col'}
    >
      <TanStackProvider>{children}</TanStackProvider>
    </HeroUIProvider>
  );
};

export default RootProvider;
