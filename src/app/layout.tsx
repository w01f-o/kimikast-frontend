import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";
import { FC, ReactNode } from "react";
import clsx from "clsx";
import RootProvider from "@/components/features/providers/RootProvider";
import Layout from "@/components/pages/Layout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" className="dark">
      <body
        className={clsx(geistSans.variable, geistMono.variable, "antialiased")}
      >
        <RootProvider>
          <Layout>{children}</Layout>
        </RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
