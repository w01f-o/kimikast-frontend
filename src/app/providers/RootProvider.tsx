'use client';

import { TanStackProvider } from '@/app/providers';
import { HeroUIProvider } from '@heroui/react';
import { useRouter } from 'nextjs-toploader/app';
import { FC, PropsWithChildren } from 'react';

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
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
