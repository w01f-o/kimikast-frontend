'use client';

import { FC } from 'react';
import { Button } from '@nextui-org/button';
import Container from '@/components/shared/layout/Container';
import Row from '@/components/shared/layout/Row';
import Col from '@/components/shared/layout/Col';
import { useForm } from 'react-hook-form';
import { AuthForm } from '@/types/entities/Auth.type';
import { Input } from '@nextui-org/input';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';
import { RoutePaths } from '@/enums/RoutePaths.enum';
import { useMutation } from '@tanstack/react-query';
import { AuthApi } from '@/services/api/default/Auth.api';
import { useRouter } from 'nextjs-toploader/app';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import PageHeading from '@/components/shared/ui/text/PageHeading';

interface AuthProps {
  type: 'login' | 'register';
}

const AuthPage: FC<AuthProps> = ({ type }) => {
  const { handleSubmit, register, reset } = useForm<AuthForm>();
  const { user } = useAuth();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: AuthForm) => AuthApi.authorize(type, data),
    onSuccess() {
      toast.success('Авторизация прошла успешно');
      reset();
      router.replace(`${RoutePaths.PROFILE}/${user!.name}`);
    },
    onError() {
      toast.error('Произошла ошибка');
    },
  });

  const submitHandler = async (data: AuthForm) => {
    mutate(data);
  };

  return (
    <Container>
      <Row className="justify-center pt-56">
        <Col xs={4}>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-4"
          >
            <PageHeading center>
              {type === 'login' ? 'Вход' : 'Регистрация'}
            </PageHeading>
            <Input
              placeholder="Email"
              type="email"
              {...register('email', {
                required: true,
              })}
              size={'lg'}
            />
            {type === 'register' && (
              <Input
                placeholder="Имя"
                type="name"
                {...register('name', {
                  required: true,
                })}
                size={'lg'}
              />
            )}
            <Input
              placeholder="Пароль"
              type="password"
              {...register('password', {
                required: true,
              })}
              size={'lg'}
            />
            <Button type="submit" size={'lg'} isLoading={isPending}>
              {type === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </form>
          <div className="flex gap-2 py-2">
            <span>
              Уже {type === 'login' ? 'есть аккаунт?' : 'зарегистрированы?'}
            </span>
            <Link
              as={NextLink}
              href={type === 'login' ? RoutePaths.REGISTER : RoutePaths.LOGIN}
            >
              {type === 'login' ? 'Зарегистрироваться' : 'Войти'}
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
