import { RoutePaths } from '@/shared/router';
import { Link } from '@heroui/link';
import NextLink from 'next/link';
import { FC } from 'react';

interface ToggleAuthProps {
  type: 'login' | 'register';
}

export const ToggleAuth: FC<ToggleAuthProps> = ({ type }) => {
  return (
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
  );
};
