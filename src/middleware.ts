import { combineMiddlewares } from '@/services/utils/combineMiddlewares';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { profileMiddleware } from '@/middlewares/profile.middleware';

export default combineMiddlewares([profileMiddleware, authMiddleware]);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.svg|.*\\.gif).*)',
  ],
};
