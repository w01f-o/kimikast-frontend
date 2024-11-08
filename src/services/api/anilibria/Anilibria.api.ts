import { getTitle } from "@/services/api/anilibria/getTitle";
import { searchTitles } from "@/services/api/anilibria/searchTitles";
import { getTitleFilters } from "@/services/api/anilibria/getTitleFilters";
import { getTitlesList } from "@/services/api/anilibria/getTitlesList";
import { getTitleUpdates } from "@/services/api/anilibria/getTitleUpdates";

export const ANILIBRIA_IMAGE_URL: Readonly<string> =
  "https://dl-20241107-5.anilib.moe";

export const anilibriaApi = {
  getTitle,
  searchTitles,
  getTitleFilters,
  getTitlesList,
  getTitleUpdates,
};
