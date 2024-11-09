import { NextPage } from "next";
import ListPage from "@/components/pages/ListPage";

interface PageProps {
  params: Promise<{
    listId: string;
  }>;
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { listId } = await params;

  return <ListPage listId={listId} />;
};

export default Page;
