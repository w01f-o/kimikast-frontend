import { RoutePaths } from '@/shared/router';

export interface AppRoute {
  name: string;
  path: RoutePaths;
  isNavbar?: true;
}
