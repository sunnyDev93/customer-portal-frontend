import { atom } from 'recoil';
import { TrackingItem } from 'types/tracking';

const trackingItemsKey = 'trackingItemsKey';

export const trackingItemsState = atom<TrackingItem[]>({
  key: trackingItemsKey,
  default: [],
});
