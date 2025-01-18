import { Franchise } from '@/entities/anime/model/Franchise.type';
import { Player } from '@/entities/anime/model/Player.type';
import { Posters } from '@/entities/anime/model/Poster.type';

import { Expose, Type } from 'class-transformer';

export enum StatusEnum {
  ONGOING = 1,
  FINISHED = 2,
  HIDDEN = 3,
  NONONGOING = 4,
}

export class AnimeType {
  @Expose({ name: 'full_string' })
  fullString!: string;

  @Expose()
  code!: number;

  @Expose()
  string!: string;

  @Expose()
  episodes!: never;

  @Expose()
  length!: number;
}

export class AnimeNames {
  @Expose()
  ru!: string;

  @Expose()
  en!: string;

  @Expose()
  alternative!: string | null;
}

export class TitleRelease {
  @Expose()
  id!: number;

  @Expose()
  code!: string;

  @Type(() => AnimeNames)
  @Expose()
  names!: AnimeNames;

  @Expose()
  ordinal!: number;
}

export class Team {
  @Expose()
  voice!: string[];

  @Expose()
  translator!: string[];

  @Expose()
  editing!: string[];

  @Expose()
  decor!: string[];

  @Expose()
  timing!: string[];
}

export class Season {
  @Expose()
  string!: string;

  @Expose()
  code!: number;

  @Expose()
  year!: number;

  @Expose({ name: 'week_day' })
  weekDay!: number;
}

export class Status {
  @Expose()
  string!: string;

  @Expose()
  code!: StatusEnum;
}
export class Blocked {
  @Expose()
  blocked!: boolean;

  @Expose()
  bakanim!: boolean;
}

export class Anime {
  @Expose()
  id!: number;

  @Expose()
  code!: string;

  @Expose()
  @Type(() => AnimeNames)
  names!: AnimeNames;

  @Expose()
  @Type(() => Franchise)
  franchises!: Franchise[];

  @Expose()
  announce!: string;

  @Expose()
  @Type(() => Status)
  status!: Status;

  @Expose()
  @Type(() => Posters)
  posters!: Posters;

  @Expose()
  updated!: number;

  @Expose({ name: 'last_change' })
  lastChange!: number;

  @Expose()
  @Type(() => AnimeType)
  type!: AnimeType;

  @Expose()
  genres!: string[];

  @Expose()
  @Type(() => Team)
  team!: Team;

  @Expose()
  @Type(() => Season)
  season!: Season;

  @Expose()
  description!: string;

  @Expose({ name: 'in_favorites' })
  inFavorites!: number;

  @Expose()
  @Type(() => Blocked)
  blocked!: Blocked;

  @Expose()
  @Type(() => Player)
  player!: Player;
}
