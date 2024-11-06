import { RoutePaths } from "@/enums/RoutePaths.enum";

export interface AppRoute {
  name: string;
  path: RoutePaths;
  isNavbar?: true;
}
