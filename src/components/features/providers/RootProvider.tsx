"use client";

import { FC, ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";
import TanStackProvider from "@/components/features/providers/TanStackProvider";

interface RootProviderProps {
  children: ReactNode;
}

const RootProvider: FC<RootProviderProps> = ({ children }) => {
  return (
    <NextUIProvider>
      <TanStackProvider>{children}</TanStackProvider>
    </NextUIProvider>
  );
};

export default RootProvider;
