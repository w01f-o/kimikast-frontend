import { Anime, Pagination } from '@/entities/anime/model';
import { Expose, Type } from 'class-transformer';

export class SearchResult {
  @Expose()
  @Type(() => Anime)
  list!: Anime[];

  @Expose()
  @Type(() => Pagination)
  pagination!: Pagination;
}
