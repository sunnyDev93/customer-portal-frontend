import { useSetRecoilState } from 'recoil';
import { trackingItemsState } from 'app-recoil/atoms/tracking-items';
import { useCallback, useMemo } from 'react';
import { generateTrackingItem, getTrackingRoot } from 'utils/tracking';
import { useLocation, useParams } from 'react-router-dom';
import { TrackingRoot } from '../../types/tracking';

export const useTrackingClick = () => {
  const params = useParams();
  const location = useLocation();

  const setTrackingItems = useSetRecoilState(trackingItemsState);

  const paramsValues = useMemo<string[]>(() => Object.values(params).map(value => value || ''), [params]);

  const pathname = useMemo<string>(() => location.pathname || 'account', [location]);

  const trackClick = useCallback(
    (item: string, root?: TrackingRoot) => {
      setTrackingItems(previous => [...previous, generateTrackingItem(root || getTrackingRoot(pathname, paramsValues), item)]);
    },
    [pathname, setTrackingItems, paramsValues]
  );

  return { trackClick };
};
