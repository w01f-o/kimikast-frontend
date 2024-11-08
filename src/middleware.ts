import { NextRequest, NextResponse } from "next/server";
import { JwtTokens } from "@/enums/JwtTokens.enum";
import { RoutePaths } from "@/enums/RoutePaths.enum";

const loginRoutes = [RoutePaths.LOGIN, RoutePaths.REGISTER] as string[];
const protectedRoutes = [RoutePaths.PROFILE, RoutePaths.LIBRARY] as string[];

export const middleware = (req: NextRequest) => {
  const { nextUrl, cookies } = req;

  const refreshToken = cookies.get(JwtTokens.REFRESH)?.value;

  if (loginRoutes.includes(nextUrl.pathname) && refreshToken) {
    nextUrl.pathname = RoutePaths.PROFILE;

    return NextResponse.redirect(nextUrl);
  }

  if (protectedRoutes.includes(nextUrl.pathname) && !refreshToken) {
    nextUrl.pathname = RoutePaths.LOGIN;

    return NextResponse.redirect(nextUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.svg).*)",
  ],
};
