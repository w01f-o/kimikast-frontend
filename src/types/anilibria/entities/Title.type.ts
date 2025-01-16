import { Expose, Type } from 'class-transformer';
import { Franchise } from '@/types/anilibria/entities/Franchise.type';
import { Posters } from '@/types/anilibria/entities/Poster.type';
import { Player } from '@/types/anilibria/entities/Player.type';

export enum StatusEnum {
  ONGOING = 1,
  FINISHED = 2,
  HIDDEN = 3,
  NONONGOING = 4,
}

export class TitleType {
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

export class TitleNames {
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

  @Type(() => TitleNames)
  @Expose()
  names!: TitleNames;

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

export class Title {
  @Expose()
  id!: number;

  @Expose()
  code!: string;

  @Expose()
  @Type(() => TitleNames)
  names!: TitleNames;

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
  @Type(() => TitleType)
  type!: TitleType;

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
