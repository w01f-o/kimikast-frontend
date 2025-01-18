import { Anime } from '@/entities/user';

export interface UserList {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  name: string;
  isPublic: boolean;
  animes: Anime[];
}
