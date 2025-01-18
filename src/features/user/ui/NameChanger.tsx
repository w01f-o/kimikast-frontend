'use client';

import { useMutateUser, User } from '@/entities/user';
import { useAuth } from '@/shared/lib';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Skeleton } from '@heroui/skeleton';
import { AnimatePresence, motion } from 'framer-motion';
import { PenLine } from 'lucide-react';
import { FC } from 'react';
import { useForm, useWatch } from 'react-hook-form';

export const NameChanger: FC = () => {
  const { user } = useAuth();

  const { register, handleSubmit, control } = useForm<Pick<User, 'name'>>();
  const inputValue = useWatch({ control, name: 'name' });

  const { mutate } = useMutateUser();

  const submitHandler = (data: Pick<User, 'name'>) => {
    mutate({ name: data.name });
  };

  return (
    <div className="flex items-center gap-6 text-xl">
      <p className="w-80">Сменить имя пользователя: </p>
      <form className="flex gap-2" onSubmit={handleSubmit(submitHandler)}>
        {user?.name ? (
          <>
            <Input
              {...register('name', {
                required: true,
              })}
              defaultValue={user.name}
              className="w-48"
            />
            <AnimatePresence>
              {inputValue && inputValue !== user.name && (
                <motion.div
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.2, 1],
                  }}
                >
                  <Button isIconOnly type="submit">
                    <PenLine />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <Skeleton className="h-10 w-48 rounded-xl" />
        )}
      </form>
    </div>
  );
};
