'use client';

import { FC } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@nextui-org/input';
import { useForm, useWatch } from 'react-hook-form';
import { User } from '@/types/entities/Auth.type';
import { Button } from '@nextui-org/button';
import { PenLine } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Skeleton } from '@nextui-org/skeleton';
import { useMutateUser } from '@/hooks/api/useMutateUser';

const NameChanger: FC = () => {
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

export default NameChanger;
