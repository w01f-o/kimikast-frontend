import { FC, ReactNode } from "react";

interface TextProps {
  children: ReactNode;
}

const Text: FC<TextProps> = ({ children }) => {
  return <p></p>;
};

export default Text;
