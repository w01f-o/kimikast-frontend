import { FC, HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  center?: boolean;
}

const PageHeading: FC<HeadingProps> = ({
  children,
  className,
  center,
  ...props
}) => {
  return (
    <h1
      className={clsx('mb-5 text-4xl', className, {
        'text-center': center,
      })}
      {...props}
    >
      {children}
    </h1>
  );
};

export default PageHeading;
