import { User } from '@/types/entities/Auth.type';

export interface Comment {
  id: string;
  content: string;
  anilibriaSlug: string;
  createdAt: Date;
  user: Pick<User, 'avatar' | 'name'>;
}
