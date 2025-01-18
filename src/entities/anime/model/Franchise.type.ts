import { TitleRelease } from '@/entities/anime';
import { Expose, Type } from 'class-transformer';
import 'reflect-metadata';

export class FranchiseData {
  @Expose()
  id!: string;

  @Expose()
  name!: string;
}

export class Franchise {
  @Expose()
  @Type(() => FranchiseData)
  franchise!: FranchiseData;

  @Expose()
  @Type(() => TitleRelease)
  releases!: TitleRelease[];
}
