import { Expose, Type } from 'class-transformer';
import { Title } from '@/types/anilibria/entities/Title.type';
import { Pagination } from '@/types/anilibria/Pagination.type';

export class SearchResult {
  @Expose()
  @Type(() => Title)
  list!: Title[];

  @Expose()
  @Type(() => Pagination)
  pagination!: Pagination;
}
