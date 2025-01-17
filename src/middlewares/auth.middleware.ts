import { MiddlewareFactory } from '@/types/MiddlewareFactory.type';
import { JwtTokens } from '@/enums/JwtTokens.enum';
import { RoutePaths } from '@/enums/RoutePaths.enum';
import { NextResponse } from 'next/server';

const loginRoutes = [RoutePaths.LOGIN, RoutePaths.REGISTER] as string[];
const protectedRoutes = [
  RoutePaths.PROFILE,
  RoutePaths.LIBRARY,
  RoutePaths.SETTINGS,
] as string[];

export const authMiddleware: MiddlewareFactory = next => async (req, res) => {
  const { nextUrl, cookies } = req;

  const refreshToken = cookies.get(JwtTokens.REFRESH)?.value;
  const accessToken = cookies.get(JwtTokens.ACCESS)?.value;

  if (loginRoutes.includes(nextUrl.pathname) && refreshToken && accessToken) {
    nextUrl.pathname = RoutePaths.PROFILE;

    return NextResponse.redirect(nextUrl);
  }

  if (protectedRoutes.includes(nextUrl.pathname) && !refreshToken) {
    nextUrl.pathname = RoutePaths.LOGIN;

    return NextResponse.redirect(nextUrl);
  }

  return next(req, res);
};
