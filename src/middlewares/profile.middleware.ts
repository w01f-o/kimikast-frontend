import { MiddlewareFactory } from '@/types/MiddlewareFactory.type';
import { RoutePaths } from '@/enums/RoutePaths.enum';
import { NextResponse } from 'next/server';

export const profileMiddleware: MiddlewareFactory =
  next => async (req, res) => {
    const { nextUrl } = req;

    if (
      nextUrl.pathname.includes(RoutePaths.PROFILE) &&
      !nextUrl.pathname.split('/').at(-1)?.startsWith('@') &&
      nextUrl.pathname.split('/').length > 2
    ) {
      const username = nextUrl.pathname.split('/').at(-1);
      nextUrl.pathname = `${RoutePaths.PROFILE}/@${username}`;

      return NextResponse.redirect(nextUrl);
    }

    return next(req, res);
  };
