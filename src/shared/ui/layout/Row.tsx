import { FC, HTMLAttributes, ReactNode } from 'react';
import styles from './layout.module.scss';
import clsx from 'clsx';

interface RowProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const Row: FC<RowProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={clsx(styles.row, {
        [`${className}`]: className,
      })}
      {...props}
    >
      {children}
    </div>
  );
};
