"use client";

import { FC } from "react";
import { RoutePaths } from "@/enums/RoutePaths.enum";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownItem, DropdownMenu } from "@nextui-org/dropdown";
import { DropdownTrigger } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/services/api/kimikast/Auth.api";
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
      router.replace(RoutePaths.LOGIN);
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
          <DropdownItem as={Link} href={RoutePaths.LOGIN}>
            Войти
          </DropdownItem>
          <DropdownItem as={Link} href={RoutePaths.SETTINGS}>
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
          src={
            !!user
              ? `${process.env.NEXT_PUBLIC_KIMIKAST_STATIC_URL}/public/${user.avatar}`
              : "/no-avatar.svg"
          }
          color={!!user ? "primary" : "default"}
          isBordered={!!user}
          className="cursor-pointer"
        />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem as={Link} href={RoutePaths.PROFILE}>
          Профиль
        </DropdownItem>
        <DropdownItem as={Link} href={RoutePaths.SETTINGS}>
          Настройки
        </DropdownItem>
        <DropdownItem
          onClick={logoutClickHandler}
          color="danger"
          className="text-danger"
        >
          Выйти
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default CurrentUser;
