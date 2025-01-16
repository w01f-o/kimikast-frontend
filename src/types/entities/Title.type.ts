export interface Title {
  id: number;
  code: string;
  names: TitleNames;
  franchises: Franchise[];
  announce: string;
  status: Status;
  posters: Posters;
  updated: number;
  last_change: number;
  type: TitleType;
  genres: string[];
  team: Team;
  season: Season;
  description: string;
  in_favorites: number;
  blocked: Blocked;
  player: Player;
}

export interface TitleNames {
  ru: string;
  en: string;
  alternative: string | null;
}

export interface Franchise {
  franchise: {
    id: string;
    name: string;
  };
  releases: TitleRelease[];
}

export interface TitleRelease extends Pick<Title, 'id' | 'code' | 'names'> {
  ordinal: number;
}

export interface Status {
  string: string;
  code: StatusEnum;
}

export enum StatusEnum {
  ONGOING = 1,
  FINISHED = 2,
  HIDDEN = 3,
  NONONGOING = 4,
}

interface Poster {
  url: string;
  raw_base64_file: string | null;
}

export interface Posters {
  small: Poster;
  medium: Poster;
  original: Poster;
}

export interface TitleType {
  full_string: string;
  code: number;
  string: string;
  episodes: never;
  length: number;
}

export interface Team {
  voice: string[];
  translator: string[];
  editing: string[];
  decor: string[];
  timing: string[];
}

export interface Season {
  string: string;
  code: number;
  year: number;
  week_day: number;
}

export interface Blocked {
  blocked: boolean;
  bakanim: boolean;
}

export interface Player {
  alternative_player: string | null;
  host: string;
  episodes: Episodes;
  list: Record<string, PlayerItem>;
}

export interface PlayerItem {
  episode: number;
  name: string | null;
  uuid: string;
  created_timestamp: number;
  preview: string | null;
  skips: Skips;
  hls: PlayerHls;
}

export interface Skips {
  opening: number[];
  ending: number[];
}

export interface Episodes {
  first: number;
  last: number;
  string: string;
}

export interface PlayerHls {
  fhd: string;
  hd: string;
  sd: string;
}
