import { useSetRecoilState } from 'recoil';
import { trackingItemsState } from 'app-recoil/atoms/tracking-items';
import { useCallback, useEffect, useMemo } from 'react';
import { flip, generateTrackingItem, getPathsBySiteMap, replaceParamsValue } from 'utils/tracking';
import { Params, useLocation, useParams } from 'react-router-dom';
import { authLayoutRoute, mainLayoutRoute } from '../../routes';

export const useTrackingView = () => {
  const params = useParams();
  const location = useLocation();

  const setTrackingItems = useSetRecoilState(trackingItemsState);

  const validPaths = useMemo(() => getPathsBySiteMap({ authLayoutRoute, mainLayoutRoute }), [authLayoutRoute, mainLayoutRoute]);

  const paramsValues = useMemo<string[]>(() => Object.values(params).map(value => value || ''), [params]);

  const flippedParams = useMemo<Params<string>>(() => flip(params), [params]);

  const trackView = useCallback(() => {
    const pathName = replaceParamsValue(location?.pathname, paramsValues, flippedParams);
    if (validPaths.includes(pathName)) {
      setTrackingItems(previous => [...previous, generateTrackingItem('view', pathName)]);
    }
  }, [flippedParams, location, paramsValues, setTrackingItems, validPaths]);

  useEffect(() => trackView(), []);
};
