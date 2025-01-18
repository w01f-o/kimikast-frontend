import { UserList, UserListsApi } from '@/entities/user-list';
import { DefaultQueryKeys } from '@/shared/model';
import { useQuery } from '@tanstack/react-query';

interface UseUserListsReturn {
  lists: UserList[] | undefined;
  isSuccess: boolean;
  isLoading: boolean;
}

type UseUserLists = () => UseUserListsReturn;

export const useUserLists: UseUserLists = () => {
  const {
    data: lists,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: [DefaultQueryKeys.LISTS],
    queryFn: () => UserListsApi.findAll(),
  });

  return {
    isLoading,
    isSuccess,
    lists,
  };
};
