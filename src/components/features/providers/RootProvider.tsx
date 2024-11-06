"use client";

import { FC, ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";
import TanStackProvider from "@/components/features/providers/TanStackProvider";
import { useRouter } from "next/navigation";

interface RootProviderProps {
  children: ReactNode;
}

const RootProvider: FC<RootProviderProps> = ({ children }) => {
  const router = useRouter();

  return (
    <NextUIProvider
      navigate={router.push}
      className={"min-h-screen flex flex-col"}
    >
      <TanStackProvider>{children}</TanStackProvider>
    </NextUIProvider>
  );
};

export default RootProvider;
