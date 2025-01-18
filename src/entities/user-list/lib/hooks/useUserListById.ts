import { UserList, UserListsApi } from '@/entities/user-list';
import { DefaultQueryKeys } from '@/shared/model';
import { useQuery } from '@tanstack/react-query';

interface UseUserListReturnById {
  list: UserList | undefined;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}

interface UseUserListParamsById {
  id: string;
}

type UseUserListById = (params: UseUserListParamsById) => UseUserListReturnById;

export const useUserListById: UseUserListById = ({ id }) => {
  const {
    data: list,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [DefaultQueryKeys.LIST, id],
    queryFn: ({ signal }) => UserListsApi.findById(id, signal),
  });

  return {
    isLoading,
    isSuccess,
    list,
    isError,
  };
};
