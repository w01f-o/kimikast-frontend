import { AuthForm, User } from '@/types/entities/Auth.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DefaultQueryKeys } from '@/enums/DefaulttQueryKeys.enum';
import { UserApi } from '@/services/api/default/User.api';
import { useRouter } from 'nextjs-toploader/app';
import { AuthApi } from '@/services/api/default/Auth.api';
import toast from 'react-hot-toast';
import { RoutePaths } from '@/enums/RoutePaths.enum';
import { ApiErrors } from '@/enums/ApiErrors.enum';
import { catchAxiosError } from '@/services/utils/catchAxiosError';

type AuthorizeData = {
  type: 'login' | 'register';
  data: AuthForm;
};

type UseAuthReturn = {
  user: User | undefined;
  authorize: (data: AuthorizeData) => void;
  authorizeIsPending: boolean;
  logout: () => void;
  logoutIsPending: boolean;
};

const errors: Partial<Record<ApiErrors, string>> = {
  [ApiErrors.USER_NOT_FOUND]: 'Неверный email или пароль',
  [ApiErrors.USER_ALREADY_EXISTS]: 'Такой пользователь уже существует',
};

export const useAuth = (): UseAuthReturn => {
  const { data: user } = useQuery({
    queryKey: [DefaultQueryKeys.USER],
    queryFn: () => UserApi.find(),
    retry: false,
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: authorize, isPending: authorizeIsPending } = useMutation({
    mutationFn: ({ type, data }: AuthorizeData) =>
      AuthApi.authorize(type, data),
    async onSuccess() {
      await queryClient.refetchQueries({
        queryKey: [DefaultQueryKeys.USER],
      });

      toast.success('Вы успешно авторизировались');
      router.replace(`${RoutePaths.HOME}`);
    },
    onError(error) {
      const errorMessage: ApiErrors = catchAxiosError(error);

      toast.error(errors[errorMessage] || 'Произошла ошибка');
    },
  });

  const { mutate: logout, isPending: logoutIsPending } = useMutation({
    mutationFn: () => AuthApi.logout(),
    onSuccess() {
      queryClient.removeQueries();

      toast.success('Вы успешно вышли из системы');
      router.replace(RoutePaths.HOME);
    },
  });

  return {
    user,
    authorize,
    authorizeIsPending,
    logout,
    logoutIsPending,
  };
};
