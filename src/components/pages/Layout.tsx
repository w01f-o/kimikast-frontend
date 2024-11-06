import { FC, ReactNode } from "react";
import Header from "@/components/widgets/Header";
import Footer from "@/components/widgets/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <main className="h-screen">
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
