import { Expose, Type } from 'class-transformer';

export class Skips {
  @Expose()
  opening!: number[];

  @Expose()
  ending!: number[];
}

export class Episodes {
  @Expose()
  first!: number;

  @Expose()
  last!: number;

  @Expose()
  string!: string;
}

export class PlayerHls {
  @Expose()
  fhd!: string;

  @Expose()
  hd!: string;

  @Expose()
  sd!: string;
}

export class PlayerItem {
  @Expose()
  episode!: number;

  @Expose()
  name!: string | null;

  @Expose()
  uuid!: string;

  @Expose({ name: 'created_timestamp' })
  createdTimestamp!: number;

  @Expose()
  preview!: string | null;

  @Type(() => Skips)
  @Expose()
  skips!: Skips;

  @Type(() => PlayerHls)
  @Expose()
  hls!: PlayerHls;
}

export class Player {
  @Expose({ name: 'alternative_player' })
  alternativePlayer!: string | null;

  @Expose()
  host!: string;

  @Type(() => Episodes)
  @Expose()
  episodes!: Episodes;

  @Expose()
  list!: Record<string, PlayerItem>;
}
