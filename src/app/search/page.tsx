import SearchTitle from "@/components/pages/SearchTitle";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Kimikast - Поиск",
};

interface PageProps {
  searchParams: Promise<{
    query?: string;
    years?: string;
    genres?: string;
    page?: string;
  }>;
}

const Page: NextPage<PageProps> = async ({ searchParams }) => {
  const query = (await searchParams)?.query;
  const years = (await searchParams)?.years;
  const genres = (await searchParams)?.genres;
  const page = (await searchParams)?.page;

  return (
    <SearchTitle page={page} query={query} years={years} genres={genres} />
  );
};

export default Page;
