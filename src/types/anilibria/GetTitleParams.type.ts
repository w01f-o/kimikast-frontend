export interface GetTitleParams {
  id?: string;
  code?: string;
  filter?: string[];
  remove?: string[];
  include?: ['raw_poster'?, 'raw_torrent'?, 'torrent_meta'?];
  descriptionType?: 'html' | 'plain' | 'no_view_order';
  playlistType?: 'object' | 'array';
}
