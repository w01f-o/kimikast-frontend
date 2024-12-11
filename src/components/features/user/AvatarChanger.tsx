"use client";

import { FC } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@nextui-org/avatar";
import { useDropzone } from "react-dropzone";

const AvatarChanger: FC = () => {
  const { user } = useAuth();

  const dropHandler = () => {};

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: dropHandler,
  });

  return (
    <div className="flex gap-6 items-center text-xl">
      <p className="w-80">Сменить аватар:</p>
      <div>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        <Avatar
          src={`${process.env.NEXT_PUBLIC_KIMIKAST_STATIC_URL}/avatar/${user?.avatar}`}
          size={"lg"}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
        </Avatar>
      </div>
    </div>
  );
};

export default AvatarChanger;
