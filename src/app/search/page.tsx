import SearchTitle from "@/components/pages/SearchTitle";
import { Metadata, NextPage } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Kimikast - Поиск",
};

const Page: NextPage = async () => {
  return (
    <Suspense fallback={null}>
      <SearchTitle />
    </Suspense>
  );
};

export default Page;
