import "./styles/globals.css";
import { FC, ReactNode } from "react";
import clsx from "clsx";
import RootProvider from "@/components/features/providers/RootProvider";
import Layout from "@/components/pages/Layout";
import { Metadata } from "next";
import { Noto_Sans } from "next/font/google";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Kimikast",
};

const notoSansFont = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" className="dark">
      <body className={clsx("antialiased", notoSansFont.className)}>
        <RootProvider>
          <Layout>{children}</Layout>
        </RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
