"use client";

import { FC } from "react";
import { RoutePaths } from "@/enums/RoutePaths.enum";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownItem, DropdownMenu } from "@nextui-org/dropdown";
import { DropdownTrigger } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/services/api/main/Auth.api";
import { KimikastQueryKeys } from "@/enums/KimikastQueryKeys.enum";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CurrentUser: FC = () => {
  const { user } = useAuth();

  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: [KimikastQueryKeys.LOGOUT],
    mutationFn: authApi.logout,
    onSuccess() {
      toast.success("Вы успешно вышли из системы");
      router.replace(RoutePaths.HOME);
    },
  });

  const logoutClickHandler = async () => {
    mutate();
  };

  if (user === null) {
    return (
      <Dropdown>
        <DropdownTrigger>
          <Avatar
            src={"/no-avatar.svg"}
            color={"default"}
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
    <Dropdown>
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
          onPress={logoutClickHandler}
          color="danger"
          className="text-danger"
          key={"logout"}
        >
          Выйти
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default CurrentUser;
