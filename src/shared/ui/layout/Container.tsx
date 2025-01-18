import { FC, HTMLAttributes, ReactNode } from 'react';
import styles from './layout.module.scss';
import clsx from 'clsx';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  fluid?: boolean;
}

export const Container: FC<ContainerProps> = ({
  children,
  className,
  fluid,
  ...props
}) => {
  return (
    <div
      className={clsx(styles.container, {
        [`${className}`]: className,
        [`${styles.fluid}`]: fluid,
      })}
      {...props}
    >
      {children}
    </div>
  );
};
