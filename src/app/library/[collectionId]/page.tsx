import { NextPage } from "next";
import CollectionPage from "@/components/pages/library/CollectionPage";

interface PageProps {
  params: Promise<{
    collectionId: string;
  }>;
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { collectionId } = await params;

  return <CollectionPage collectionId={collectionId} />;
};

export default Page;
