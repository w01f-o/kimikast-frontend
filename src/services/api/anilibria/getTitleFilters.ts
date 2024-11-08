import { axiosAnilibria } from "@/services/api/interceptors";

interface filtersResult {
  years: number[];
  genres: string[];
}

type getTitleFiltersType = () => Promise<filtersResult>;

export const getTitleFilters: getTitleFiltersType = async () => {
  const { data: years } = await axiosAnilibria.get("/years");
  const { data: genres } = await axiosAnilibria.get("/genres");

  return {
    years,
    genres,
  };
};
