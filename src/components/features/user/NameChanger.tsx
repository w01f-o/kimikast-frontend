"use client";

import { FC } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@nextui-org/input";
import { useForm, useWatch } from "react-hook-form";
import { User } from "@/types/entities/Auth.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@nextui-org/button";
import { PenLine } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "@nextui-org/skeleton";
import { KimikastQueryKeys } from "@/enums/KimikastQueryKeys.enum";
import { userApi } from "@/services/api/main/User.api";

const NameChanger: FC = () => {
  const { user } = useAuth();

  const { register, handleSubmit, control } = useForm<Pick<User, "name">>();
  const inputValue = useWatch({ control, name: "name" });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: [KimikastQueryKeys.CHANGE_USERNAME],
    mutationFn: ({ name }: { name: string }) => userApi.updateUser({ name }),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: [KimikastQueryKeys.USER] });
    },
  });

  const submitHandler = (data: Pick<User, "name">) => {
    mutate({ name: data.name });
  };

  return (
    <div className="flex gap-6 items-center text-xl">
      <p>Сменить имя пользователя: </p>
      <form className="flex gap-2" onSubmit={handleSubmit(submitHandler)}>
        {user?.name ? (
          <>
            <Input
              {...register("name", {
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
                  <Button isIconOnly type="submit" isDisabled={isPending}>
                    <PenLine />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <Skeleton className="w-48 rounded-xl h-10" />
        )}
      </form>
    </div>
  );
};

export default NameChanger;
