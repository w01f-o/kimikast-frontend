import { PublicUser, UserApi } from '@/entities/user';
import { DefaultQueryKeys } from '@/shared/model';
import { QueryKey, UseSuspenseQueryOptions } from '@tanstack/react-query';

export const getPublicUserQueryHookParams = (
  name: string
): UseSuspenseQueryOptions<PublicUser, Error, PublicUser, QueryKey> => ({
  queryKey: [DefaultQueryKeys.PUBLIC_USER, name],
  queryFn: () => UserApi.findPublic(name),
});
