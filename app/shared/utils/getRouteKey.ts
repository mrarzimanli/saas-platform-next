import { AppRoutes } from "../types/enums";

export function getRouteKey(pathname: string): keyof typeof AppRoutes | undefined {
  return (Object.entries(AppRoutes) as [keyof typeof AppRoutes, string][]).find(([, value]) => value === pathname)?.[0];
}
