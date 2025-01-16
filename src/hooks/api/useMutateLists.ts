import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DefaultQueryKeys } from '@/enums/DefaulttQueryKeys.enum';
import { ListsApi } from '@/services/api/default/Lists.api';

interface UseMutateListsReturn {
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

interface UseMutateListsParams {
  anilibriaSlug: string;
  onSuccess?: () => void;
}

type UseMutateLists = (params: UseMutateListsParams) => UseMutateListsReturn;

export const useMutateLists: UseMutateLists = ({
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
          return ListsApi.addAnime(listId, {
            anilibriaSlug,
          });
        case 'remove':
          return ListsApi.removeAnime(listId, {
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
  });

  return {
    mutate,
    isError,
    isPending,
    isSuccess,
  };
};
