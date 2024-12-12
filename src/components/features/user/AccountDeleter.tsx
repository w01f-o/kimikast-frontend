"use client";

import { FC } from "react";
import { Button } from "@nextui-org/button";
import { UserRoundX } from "lucide-react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { useMutation } from "@tanstack/react-query";
import { KimikastQueryKeys } from "@/enums/KimikastQueryKeys.enum";
import { userApi } from "@/services/api/main/User.api";
import { useAuth } from "@/hooks/useAuth";
import { authApi } from "@/services/api/main/Auth.api";
import toast from "react-hot-toast";
import { RoutePaths } from "@/enums/RoutePaths.enum";
import { useRouter } from "nextjs-toploader/app";

const AccountDeleter: FC = () => {
  const { onClose, onOpenChange, isOpen } = useDisclosure();

  const {} = useAuth();
  const router = useRouter();

  const { mutate: deleteMutation, isPending: deleteIsPending } = useMutation({
    mutationKey: [KimikastQueryKeys.DELETE_ACCOUNT],
    mutationFn: userApi.deleteUser,
  });

  const { mutate: logoutMutation, isPending: logoutIsPending } = useMutation({
    mutationKey: [KimikastQueryKeys.LOGOUT],
    mutationFn: authApi.logout,
    onSuccess() {
      toast.success("Вы успешно удалили аккаунт");
      router.replace(RoutePaths.HOME);
    },
  });

  const clickHandler = () => {
    deleteMutation();
    logoutMutation();
    onClose();
  };

  return (
    <div>
      <Button
        color={"danger"}
        endContent={<UserRoundX />}
        onPress={onOpenChange}
      >
        Удалить аккаунт
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader>Подтверждение</ModalHeader>
            <ModalBody>Вы действительно хотите удалить аккаунт?</ModalBody>
            <ModalFooter>
              <Button
                onPress={clickHandler}
                color={"danger"}
                isLoading={deleteIsPending || logoutIsPending}
              >
                Удалить
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AccountDeleter;
