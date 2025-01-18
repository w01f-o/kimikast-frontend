import { User } from '@/entities/user';

export type PublicUser = Pick<User, 'avatar' | 'name'>;
