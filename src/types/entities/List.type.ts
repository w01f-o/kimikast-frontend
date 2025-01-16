import { Anime } from '@/types/entities/Anime.type';

export interface List {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  name: string;
  isPublic: boolean;
  animes: Anime[];
}
