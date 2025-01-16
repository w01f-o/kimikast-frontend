import { AppRoute } from '@/types/AppRoute.type';
import { RoutePaths } from '@/enums/RoutePaths.enum';

export const appRoutes: Readonly<AppRoute[]> = [
  { name: 'Главная', path: RoutePaths.HOME, isNavbar: true },
  { name: 'Моя библиотека', path: RoutePaths.LIBRARY, isNavbar: true },
  { name: 'Вход', path: RoutePaths.LOGIN },
  { name: 'Регистрация', path: RoutePaths.REGISTER },
  { name: 'Профиль', path: RoutePaths.PROFILE },
  { name: 'Поиск', path: RoutePaths.SEARCH },
  { name: 'Аниме', path: RoutePaths.ANIME },
];
