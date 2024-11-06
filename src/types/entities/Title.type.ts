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

export interface TitleRelease extends Pick<Title, "id" | "code" | "names"> {
  ordinal: number;
}

export interface Status {
  string: string;
  code: number;
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
  episodes: any;
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
  alternative_player: any;
  host: string;
  episodes: Episodes;
  list: List;
}

export interface Episodes {
  first: number;
  last: number;
  string: string;
}

export interface List {}

export interface Hls {
  fhd: string;
  hd: string;
  sd: string;
}
