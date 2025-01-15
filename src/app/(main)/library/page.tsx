import { Metadata, NextPage } from "next";
import { Suspense } from "react";
import Library from "@/components/pages/library/Library";

export const metadata: Metadata = {
  title: "Kimikast - Моя библиотека",
};

const Page: NextPage = () => {
  return (
    <Suspense>
      <Library />
    </Suspense>
  );
};

export default Page;
