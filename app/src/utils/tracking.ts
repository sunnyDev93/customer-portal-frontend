import { SpecialTrackingRootMap, TrackingItem, TrackingRootMap } from 'types/tracking';
import { PRODUCT_NAME, TRACKING_FROM } from 'constants/tracking';
import { RouteInfo, SiteMap } from 'types';
import flatten from 'lodash/flatten';
import { Params } from 'react-router-dom';

export const flip = (data: Params<string>) => Object.fromEntries(Object.entries(data).map(([key, value]) => [value, key]));

export const getTrackingRoot = (pathname: string, paramsValue: string[]): string => {
  if (!pathname) return '';

  if (Object.keys(SpecialTrackingRootMap).includes(pathname)) return SpecialTrackingRootMap[pathname];

  return pathname
    .split('/')
    .filter(pathEntity => !!pathEntity && !paramsValue.includes(pathEntity))
    .map(pathEntity => TrackingRootMap[pathEntity] || pathEntity)
    .join('/');
};

export const replaceParamsValue = (pathName: string, paramsValue: string[], flippedParams: Params<string>): string => {
  let result = pathName;
  paramsValue.forEach(paramValue => {
    if (paramsValue) {
      result = result.replace(paramValue, `:${flippedParams[paramValue]}`);
    }
  });
  return result;
};

export const generateTrackingItem = (trackingType: string, item: string): TrackingItem => {
  return {
    date_created: new Date().toISOString(),
    name: `${trackingType}${trackingType !== 'view' ? '/' : ''}${item}`,
    product: PRODUCT_NAME,
    from: TRACKING_FROM,
  };
};

export const getPathsBySiteMap = (siteMap: SiteMap): string[] => flatten(Object.values(siteMap).map(route => getPathsByRoute(route)));

export const getPathsByRoute = (route: RouteInfo): string[] => {
  if (!route.children) {
    return [route.path];
  }
  return getPathsBySiteMap(route.children).map(path => `${route.path !== '/' ? route.path : ''}/${path}`.replace('//', '/'));
};
