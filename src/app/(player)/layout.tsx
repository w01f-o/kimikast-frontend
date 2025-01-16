import "../styles/globals.css";
import { FC, ReactNode } from "react";
import clsx from "clsx";
import RootProvider from "@/components/features/providers/RootProvider";
import { Noto_Sans } from "next/font/google";
import WatchLayout from "@/components/pages/layouts/WatchLayout";

interface RootLayoutProps {
  children: ReactNode;
}

const notoSansFont = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="ru" className="dark">
      <body className={clsx("antialiased", notoSansFont.className)}>
        <RootProvider>
          <WatchLayout>{children}</WatchLayout>
        </RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
