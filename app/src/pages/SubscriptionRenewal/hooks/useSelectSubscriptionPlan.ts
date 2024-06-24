import { useRecoilState } from 'recoil';
import { subscriptionRenewalDataState } from '../../../app-recoil/atoms/subscription-renewal';
import { useCallback } from 'react';
import { SubscriptionPlan } from '../../../types/plan';

const useSelectSubscriptionPlan = (currentPlan?: SubscriptionPlan) => {
  const [subscriptionRenewalData, setSubscriptionRenewalData] = useRecoilState(subscriptionRenewalDataState);

  const onSelect = useCallback(
    (plan: SubscriptionPlan) =>
      setSubscriptionRenewalData(previous => ({
        ...previous,
        selectedPlan: plan?.id !== previous.selectedPlan?.id ? plan : currentPlan,
        additionalServices: [],
      })),
    [currentPlan, setSubscriptionRenewalData]
  );

  return { selectedPlan: subscriptionRenewalData.selectedPlan, onSelect };
};

export default useSelectSubscriptionPlan;
