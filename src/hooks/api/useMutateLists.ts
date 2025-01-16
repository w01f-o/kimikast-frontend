import { useMutation, useQueryClient } from '@tanstack/react-query';
import { KimikastQueryKeys } from '@/enums/KimikastQueryKeys.enum';
import { listsApi } from '@/services/api/main/Lists.api';

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
    mutationKey: [KimikastQueryKeys.LISTS],
    mutationFn: ({
      listId,
      type,
    }: {
      listId: string;
      type: 'add' | 'remove';
    }) => {
      switch (type) {
        case 'add':
          return listsApi.addAnime(listId, {
            anilibriaSlug,
          });
        case 'remove':
          return listsApi.removeAnime(listId, {
            anilibriaSlug,
          });
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [KimikastQueryKeys.LISTS],
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
