import 'reflect-metadata';

export type { GetTitlesListParams } from './GetAnimeListParams.type';
export type { GetAnimeUpdatesParams } from './GetAnimeUpdatesParams';
export type { GetAnimeParams } from './GetAnimeParams';

export type { SearchAnimeParams } from './SearchAnime.params';

export { Pagination } from './Pagination.type';
export { SearchResult } from './SearchResult.type';
export { StatusEnum } from './Anime.type';
export { AnilibriaQueryKeys } from './AnilibriaQueryKeys.enum';

export {
  Anime,
  AnimeNames,
  AnimeType,
  Blocked,
  Season,
  Status,
  Team,
  TitleRelease,
} from './Anime.type';

export { Filters } from './Filters.type';
export { Franchise, FranchiseData } from './Franchise.type';
export { Posters, Poster } from './Poster.type';
export { PlayerHls, PlayerItem, Episodes, Player, Skips } from './Player.type';
