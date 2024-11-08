import { FC, ReactNode } from "react";
import Header from "@/components/widgets/Header";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex-grow">
        {children}

        <NextTopLoader showSpinner={false} />
        <Toaster />
      </main>
    </>
  );
};

export default Layout;
