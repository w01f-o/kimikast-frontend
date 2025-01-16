import {
  QueryKey,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { DefaultQueryKeys } from '@/enums/DefaulttQueryKeys.enum';
import { UserApi } from '@/services/api/default/User.api';
import { PublicUser } from '@/types/entities/PublicUser.type';

interface UsePublicUserReturn {
  user: PublicUser;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

interface UsePublicUserParams {
  name: string;
}

type UsePublicUser = (params: UsePublicUserParams) => UsePublicUserReturn;

export const getPublicUserQueryHookParams = (
  name: string
): UseSuspenseQueryOptions<PublicUser, Error, PublicUser, QueryKey> => ({
  queryKey: [DefaultQueryKeys.PUBLIC_USER, name],
  queryFn: () => UserApi.findPublic(name),
});

export const usePublicUser: UsePublicUser = ({ name }) => {
  const {
    data: user,
    isError,
    isLoading,
    isSuccess,
  } = useSuspenseQuery({
    ...getPublicUserQueryHookParams(name),
  });

  return {
    isError,
    isLoading,
    isSuccess,
    user,
  };
};
