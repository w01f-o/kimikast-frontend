import axios from "axios";
import { ANILIBRIA_API_URL } from "@/services/api/anilibria/index";

interface filtersResult {
  years: number[];
  genres: string[];
}

type getTitleFiltersType = () => Promise<filtersResult>;

export const getTitleFilters: getTitleFiltersType = async () => {
  const { data: years } = await axios.get(`${ANILIBRIA_API_URL}/years`);
  const { data: genres } = await axios.get(`${ANILIBRIA_API_URL}/genres`);

  return {
    years,
    genres,
  };
};
