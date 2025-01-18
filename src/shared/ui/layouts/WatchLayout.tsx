import NextTopLoader from 'nextjs-toploader';
import { FC, PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

export const WatchLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main className="flex flex-grow flex-col justify-center overflow-hidden">
        {children}
        <NextTopLoader showSpinner={false} />
        <Toaster />
      </main>
    </>
  );
};
