"use client";

import { FC, ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";

interface RootProviderProps {
  children: ReactNode;
}

const RootProvider: FC<RootProviderProps> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default RootProvider;
