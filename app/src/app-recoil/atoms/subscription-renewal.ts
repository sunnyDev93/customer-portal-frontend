import { atom } from 'recoil';
import { SubscriptionRenewalInfo } from '../../types/subscription-renewal';
import { recoilPersist } from 'recoil-persist';

const subscriptionRenewalData = 'subscriptionRenewalData';

const { persistAtom } = recoilPersist();

export const subscriptionRenewalDataState = atom<SubscriptionRenewalInfo>({
  key: subscriptionRenewalData,
  default: { currentStep: 1, additionalServices: [] },
  effects_UNSTABLE: [persistAtom],
});
