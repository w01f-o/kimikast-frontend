'use client';

import { RoutePaths } from '@/enums/RoutePaths.enum';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';
import { useDisclosure } from '@nextui-org/use-disclosure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserRoundX } from 'lucide-react';
import { useRouter } from 'nextjs-toploader/app';
import { FC } from 'react';
import toast from 'react-hot-toast';
import { UserApi } from '@/services/api/default/User.api';
import { AuthApi } from '@/services/api/default/Auth.api';

const AccountDeleter: FC = () => {
  const { onClose, onOpenChange, isOpen } = useDisclosure();

  const queryClient = useQueryClient();

  const router = useRouter();

  const { mutate: deleteMutation, isPending: deleteIsPending } = useMutation({
    mutationFn: () => UserApi.delete(),
  });

  const { mutate: logoutMutation, isPending: logoutIsPending } = useMutation({
    mutationFn: () => AuthApi.logout(),
    onSuccess() {
      toast.success('Вы успешно удалили аккаунт');
      router.replace(RoutePaths.HOME);
      queryClient.resetQueries();
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
        color={'danger'}
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
                color={'danger'}
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
