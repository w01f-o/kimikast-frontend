'use client';

import { FC, ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import TanStackProvider from '@/components/features/providers/TanStackProvider';
import { useRouter } from 'nextjs-toploader/app';
import AuthProvider from '@/components/features/providers/AuthProvider';

interface RootProviderProps {
  children: ReactNode;
}

const RootProvider: FC<RootProviderProps> = ({ children }) => {
  const router = useRouter();

  return (
    <NextUIProvider
      navigate={router.push}
      className={'flex min-h-screen flex-col'}
    >
      <TanStackProvider>
        <AuthProvider>{children}</AuthProvider>
      </TanStackProvider>
    </NextUIProvider>
  );
};

export default RootProvider;
