import { Expose } from 'class-transformer';

export class Filters {
  @Expose()
  genres!: string[];

  @Expose()
  years!: string[];
}
