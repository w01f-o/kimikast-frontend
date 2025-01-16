import { Expose, Type } from 'class-transformer';

export class Poster {
  @Expose()
  url!: string;

  @Expose({ name: 'raw_base64_file' })
  rawBase64File!: string | null;
}

export class Posters {
  @Type(() => Poster)
  @Expose()
  small!: Poster;

  @Type(() => Poster)
  @Expose()
  medium!: Poster;

  @Type(() => Poster)
  @Expose()
  original!: Poster;
}
