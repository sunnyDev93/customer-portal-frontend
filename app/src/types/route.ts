import { ReactNode } from 'react';

export type RouteInfo = {
  key: string;
  label: string;
  path: string;
  fullPath?: string;
  className?: string;
  mobileClassName?: string;
  activeClassName?: string;
  index?: number;
  element: ReactNode;
  children?: SiteMap;
  default?: RouteInfo;
  disabled?: boolean;
  defaultPath?: string;
  trackingName?: string;
};

export type SiteMap = { [page: string]: RouteInfo };
