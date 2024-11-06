import { FC, HTMLAttributes, ReactNode } from "react";
import styles from "./layout.module.scss";
import clsx from "clsx";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const Container: FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={clsx(styles.container, {
        [`${className}`]: className,
      })}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
