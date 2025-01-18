import { getPublicUserQueryHookParams, PublicUser } from '@/entities/user';
import { useSuspenseQuery } from '@tanstack/react-query';

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
