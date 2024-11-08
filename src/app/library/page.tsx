import { Metadata, NextPage } from "next";
import Library from "@/components/pages/Library";

export const metadata: Metadata = {
  title: "Kimikast - Моя библиотека",
};

const Page: NextPage = () => {
  return <Library />;
};

export default Page;
