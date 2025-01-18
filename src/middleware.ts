import { combineMiddlewares } from '@/shared/lib/utils/combineMiddlewares';
import { authMiddleware } from '@/app/middlewares/auth.middleware';
import { profileMiddleware } from '@/app/middlewares/profile.middleware';

export default combineMiddlewares([profileMiddleware, authMiddleware]);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.svg|.*\\.gif).*)',
  ],
};
