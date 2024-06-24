import { useRecoilState } from 'recoil';
import { subscriptionRenewalDataState } from '../../../app-recoil/atoms/subscription-renewal';
import { useCallback, useMemo } from 'react';
import { PlanAddon } from '../../../types/plan';
import findIndex from 'lodash/findIndex';

const useAdditionalServices = () => {
  const [subscriptionRenewalData, setSubscriptionRenewalData] = useRecoilState(subscriptionRenewalDataState);

  const onSelect = useCallback(
    (addon: PlanAddon) =>
      setSubscriptionRenewalData(previous => {
        const additionalServices = [...(previous.additionalServices || [])];
        const addonIndex = findIndex(additionalServices, ['id', addon.id]);
        if (addonIndex >= 0) {
          additionalServices.splice(addonIndex, 1);
        } else {
          additionalServices.push(addon);
        }
        return { ...previous, additionalServices };
      }),
    [setSubscriptionRenewalData]
  );

  const additionalServiceIds = useMemo(
    (): string[] => subscriptionRenewalData.additionalServices?.map(addon => addon.id) || [],
    [subscriptionRenewalData.additionalServices]
  );

  return { additionalServices: subscriptionRenewalData.additionalServices, additionalServiceIds, onSelect };
};

export default useAdditionalServices;
