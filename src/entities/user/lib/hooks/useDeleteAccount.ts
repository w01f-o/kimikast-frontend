import { AuthApi, UserApi } from '@/entities/user';
import { RoutePaths } from '@/shared/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'nextjs-toploader/app';
import toast from 'react-hot-toast';

interface UseDeleteAccountReturn {
  isPending: boolean;
  deleteAccount: () => Promise<void>;
}

type UseDeleteAccount = () => UseDeleteAccountReturn;

export const useDeleteAccount: UseDeleteAccount = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync: deleteMutation, isPending: deleteIsPending } =
    useMutation({
      mutationFn: () => UserApi.delete(),
    });

  const { mutateAsync: logoutMutation, isPending: logoutIsPending } =
    useMutation({
      mutationFn: () => AuthApi.logout(),
      onSuccess() {
        queryClient.removeQueries();

        toast.success('Вы успешно удалили аккаунт');
        router.replace(RoutePaths.HOME);
      },
      onError() {
        toast.error('Произошла ошибка при удалении аккаунта');
      },
    });

  const deleteAccount = async () => {
    await deleteMutation();
    await logoutMutation();
  };

  return {
    isPending: deleteIsPending || logoutIsPending,
    deleteAccount,
  };
};
