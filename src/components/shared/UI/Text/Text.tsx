import { FC, ReactNode } from "react";

interface TextProps {
  children: ReactNode;
}

const Text: FC<TextProps> = ({ children }) => {
  return <p>{children}</p>;
};

export default Text;
