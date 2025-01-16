import { Expose, Type } from 'class-transformer';
import { Anime } from '@/types/anilibria/entities/Anime.type';
import { Pagination } from '@/types/anilibria/Pagination.type';

export class SearchResult {
  @Expose()
  @Type(() => Anime)
  list!: Anime[];

  @Expose()
  @Type(() => Pagination)
  pagination!: Pagination;
}
