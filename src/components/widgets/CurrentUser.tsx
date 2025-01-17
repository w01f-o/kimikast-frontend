'use client';

import { RoutePaths } from '@/enums/RoutePaths.enum';
import { useAuth } from '@/hooks/useAuth';
import { Avatar } from '@heroui/avatar';
import { Dropdown, DropdownItem, DropdownMenu } from '@heroui/dropdown';
import { DropdownTrigger } from '@heroui/react';
import Link from 'next/link';
import { FC } from 'react';

const CurrentUser: FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <Dropdown shouldBlockScroll={false}>
        <DropdownTrigger>
          <Avatar
            src={'/kimikast/no-avatar.svg'}
            color={'default'}
            className="cursor-pointer"
          />
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            as={Link}
            href={RoutePaths.LOGIN}
            key={RoutePaths.LOGIN}
          >
            Войти
          </DropdownItem>
          <DropdownItem
            as={Link}
            href={RoutePaths.SETTINGS}
            key={RoutePaths.SETTINGS}
          >
            Настройки
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  return (
    <Dropdown shouldBlockScroll={false}>
      <DropdownTrigger>
        <Avatar
          src={`${process.env.NEXT_PUBLIC_KIMIKAST_STATIC_URL}/avatar/${user.avatar}`}
          color="primary"
          isBordered
          className="cursor-pointer"
        />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          as={Link}
          href={`${RoutePaths.PROFILE}/@${user.name}`}
          key={RoutePaths.PROFILE}
        >
          Профиль
        </DropdownItem>
        <DropdownItem
          as={Link}
          href={RoutePaths.SETTINGS}
          key={RoutePaths.SETTINGS}
        >
          Настройки
        </DropdownItem>
        <DropdownItem
          onPress={logout}
          color="danger"
          className="text-danger"
          key={'logout'}
        >
          Выйти
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default CurrentUser;
