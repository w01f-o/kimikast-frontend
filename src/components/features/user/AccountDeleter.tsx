'use client';

import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';
import { useDisclosure } from '@nextui-org/use-disclosure';
import { UserRoundX } from 'lucide-react';
import { FC } from 'react';
import { useDeleteAccount } from '@/hooks/api/useDeleteAccount';

const AccountDeleter: FC = () => {
  const { onClose, onOpenChange, isOpen } = useDisclosure();

  const { deleteAccount, isPending } = useDeleteAccount();

  const clickHandler = async () => {
    await deleteAccount();

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
                isLoading={isPending}
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
