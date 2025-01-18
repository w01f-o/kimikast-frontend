import { UserListsApi } from '@/entities/user-list';
import { DefaultQueryKeys } from '@/shared/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface UseMutateUserListsReturn {
  mutate: ({
    listId,
    type,
  }: {
    listId: string;
    type: 'add' | 'remove';
  }) => void;
  isSuccess: boolean;
  isPending: boolean;
  isError: boolean;
}

interface UseMutateUserListsParams {
  anilibriaSlug: string;
  onSuccess?: () => void;
}

type UseMutateUserLists = (
  params: UseMutateUserListsParams
) => UseMutateUserListsReturn;

export const useMutateUserLists: UseMutateUserLists = ({
  anilibriaSlug,
  ...params
}) => {
  const queryClient = useQueryClient();

  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationKey: [DefaultQueryKeys.LISTS],
    mutationFn: ({
      listId,
      type,
    }: {
      listId: string;
      type: 'add' | 'remove';
    }) => {
      switch (type) {
        case 'add':
          return UserListsApi.addAnime(listId, {
            anilibriaSlug,
          });
        case 'remove':
          return UserListsApi.removeAnime(listId, {
            anilibriaSlug,
          });
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [DefaultQueryKeys.LISTS],
      });

      params.onSuccess?.();
    },
    onError() {
      toast.error('Произошла ошибка при обновлении списка');
    },
  });

  return {
    mutate,
    isError,
    isPending,
    isSuccess,
  };
};
