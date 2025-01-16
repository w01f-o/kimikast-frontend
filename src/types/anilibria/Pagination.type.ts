import { Expose } from 'class-transformer';

export class Pagination {
  @Expose({ name: 'current_page' })
  currentPage!: number;

  @Expose({ name: 'items_per_page' })
  itemsPerPage!: number;

  @Expose()
  pages!: number;

  @Expose({ name: 'total_items' })
  totalItems!: number;
}
