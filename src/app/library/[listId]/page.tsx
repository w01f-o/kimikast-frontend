import { NextPage } from "next";
import CollectionPage from "@/components/pages/library/CollectionPage";

interface PageProps {
  params: Promise<{
    listId: string;
  }>;
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { listId } = await params;

  return <CollectionPage listId={listId} />;
};

export default Page;
