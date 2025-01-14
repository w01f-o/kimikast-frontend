import { NextRequest, NextResponse } from "next/server";
import { JwtTokens } from "@/enums/JwtTokens.enum";
import { RoutePaths } from "@/enums/RoutePaths.enum";

const loginRoutes = [RoutePaths.LOGIN, RoutePaths.REGISTER] as string[];
const protectedRoutes = [RoutePaths.PROFILE, RoutePaths.LIBRARY] as string[];

export const middleware = (req: NextRequest) => {
  const { nextUrl, cookies } = req;

  const refreshToken = cookies.get(JwtTokens.REFRESH)?.value;
  const accessToken = cookies.get(JwtTokens.ACCESS)?.value;

  if (
    nextUrl.pathname.includes(RoutePaths.PROFILE) &&
    !nextUrl.pathname.split("/").at(-1)?.startsWith("@") &&
    nextUrl.pathname.split("/").length > 2
  ) {
    const username = nextUrl.pathname.split("/").at(-1);
    nextUrl.pathname = `${RoutePaths.PROFILE}/@${username}`;

    return NextResponse.redirect(nextUrl);
  }

  if (loginRoutes.includes(nextUrl.pathname) && refreshToken && accessToken) {
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
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.svg|.*\\.gif).*)",
  ],
};
