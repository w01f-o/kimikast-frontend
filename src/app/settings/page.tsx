import { NextPage } from "next";
import Settings from "@/components/pages/Settings";

interface PageProps {
  searchParams: Promise<{
    tab: string;
  }>;
}

const Page: NextPage<PageProps> = async ({ searchParams }) => {
  const tab = (await searchParams)?.tab;

  return <Settings tab={tab} />;
};

export default Page;
