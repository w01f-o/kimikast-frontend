export interface SearchAnimeParams {
  search: string;
  year?: string[] | string;
  type?: string[];
  genres?: string[] | string;
  team?: string[];
  voice?: string[];
  translator?: string[];
  editing?: string[];
  decor?: string[];
  timing?: string[];
  filter?: string[];
  remove?: string[];
  include?: ['raw_poster'?, 'raw_torrent'?, 'torrent_meta'?];
  descriptionType?: 'html' | 'plain' | 'no_view_order';
  playlistType?: 'object' | 'array';
  page?: number;
  itemsPerPage?: number;
}
