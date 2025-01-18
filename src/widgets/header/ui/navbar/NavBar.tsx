'use client';

import { FC } from 'react';
import { appRoutes } from '@/shared/router/config/app.routes';
import { Link } from '@heroui/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export const NavBar: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex gap-4">
        {appRoutes.map(
          route =>
            route.isNavbar && (
              <li key={route.path}>
                <Link
                  color="foreground"
                  href={route.path}
                  className={clsx({
                    'font-bold': pathname === route.path,
                  })}
                >
                  {route.name}
                </Link>
              </li>
            )
        )}
      </ul>
    </nav>
  );
};
