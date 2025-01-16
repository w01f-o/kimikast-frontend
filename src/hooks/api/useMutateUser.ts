import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserApi } from '@/services/api/default/User.api';
import { DefaultQueryKeys } from '@/enums/DefaulttQueryKeys.enum';
import { User } from '@/types/entities/Auth.type';

interface UseMutateUserReturn {
  mutate: (dto: { name: string }) => void;
  isPending: boolean;
}

type UseMutateUser = () => UseMutateUserReturn;

export const useMutateUser: UseMutateUser = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ name }: { name: string }) => UserApi.update({ name }),
    onMutate: async ({ name }) => {
      await queryClient.cancelQueries({
        queryKey: [DefaultQueryKeys.USER],
      });

      const previousUser = queryClient.getQueryData([
        DefaultQueryKeys.USER,
      ]) as User;

      queryClient.setQueryData([DefaultQueryKeys.USER], old => ({
        ...(old as User),
        name,
      }));

      return { previousUser };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData([DefaultQueryKeys.USER], context?.previousUser);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [DefaultQueryKeys.USER],
      });
    },
  });

  return {
    mutate,
    isPending,
  };
};
