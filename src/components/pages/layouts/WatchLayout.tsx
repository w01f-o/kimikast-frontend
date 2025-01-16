import { FC, ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

interface WatchLayoutProps {
  children: ReactNode;
}

const WatchLayout: FC<WatchLayoutProps> = ({ children }) => {
  return (
    <>
      <main className="flex flex-col flex-grow justify-center overflow-hidden">
        {children}
        <NextTopLoader showSpinner={false} />
        <Toaster />
      </main>
    </>
  );
};

export default WatchLayout;
