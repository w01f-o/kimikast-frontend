import { Expose, Type } from 'class-transformer';
import { TitleRelease } from '@/types/anilibria/entities/Title.type';
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
