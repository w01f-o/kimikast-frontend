'use client';

import type { AuthForm as AuthFormType } from '@/entities/user';
import { useAuth } from '@/shared/lib';
import { PageHeading } from '@/shared/ui';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

interface AuthFormProps {
  type: 'login' | 'register';
}

export const AuthForm: FC<AuthFormProps> = ({ type }) => {
  const { handleSubmit, register } = useForm<AuthFormType>();
  const { authorize, authorizeIsPending: isPending } = useAuth();

  const submitHandler = async (data: AuthFormType) => {
    authorize({ data, type });
  };

  return (
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
  );
};
