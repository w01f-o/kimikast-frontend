import { FC, ReactNode } from "react";
import Header from "@/components/widgets/Header";
import NextTopLoader from "nextjs-toploader";

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
      </main>
    </>
  );
};

export default Layout;
