import "./styles/globals.css";
import {FC, ReactNode} from "react";
import clsx from "clsx";
import RootProvider from "@/components/features/providers/RootProvider";
import Layout from "@/components/pages/Layout";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" className="dark">
      <body
        className={clsx("antialiased")}
      >
        <RootProvider>
          <Layout>{children}</Layout>
        </RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
