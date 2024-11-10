import { FC, HTMLAttributes, ReactNode } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  level: number;
}

const Heading: FC<HeadingProps> = ({ children, level, ...props }) => {
  const Tag = `h${level}`;

  return <Tag {...props}>{children}</Tag>;
};

export default Heading;
