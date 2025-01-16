'use client';

import { FC } from 'react';
import { appRoutes } from '@/constants/app.routes';
import { Link } from '@nextui-org/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const NavBar: FC = () => {
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

export default NavBar;
