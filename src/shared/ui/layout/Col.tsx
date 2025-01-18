import { FC, HTMLAttributes, ReactNode } from 'react';
import styles from './layout.module.scss';
import clsx from 'clsx';

type ColSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface ColProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  xxl?: ColSize;
  xl?: ColSize;
  lg?: ColSize;
  md?: ColSize;
  sm?: ColSize;
  xs?: ColSize;
}

export const Col: FC<ColProps> = ({
  children,
  className,
  xxl,
  sm,
  xs,
  md,
  lg,
  xl,
  ...props
}) => {
  return (
    <div
      className={clsx({
        [styles[`col-xxl-${xxl}`]]: xxl,
        [styles[`col-xl-${xl}`]]: xl,
        [styles[`col-lg-${lg}`]]: lg,
        [styles[`col-md-${md}`]]: md,
        [styles[`col-sm-${sm}`]]: sm,
        [styles[`col-${xs}`]]: xs,
        [`${className}`]: className,
      })}
      {...props}
    >
      {children}
    </div>
  );
};
