import { useRecoilState } from 'recoil';
import { subscriptionRenewalDataState } from '../../../app-recoil/atoms/subscription-renewal';
import { useCallback } from 'react';

const useCurrentStep = () => {
  const [subscriptionRenewalData, setSubscriptionRenewalData] = useRecoilState(subscriptionRenewalDataState);

  const setStep = useCallback(
    (step: number) => setSubscriptionRenewalData(previous => ({ ...previous, currentStep: step })),
    [setSubscriptionRenewalData]
  );

  const next = useCallback(
    () => setSubscriptionRenewalData(previous => ({ ...previous, currentStep: previous.currentStep + 1 })),
    [setSubscriptionRenewalData]
  );

  const previous = useCallback(
    () => setSubscriptionRenewalData(previous => ({ ...previous, currentStep: previous.currentStep - 1 })),
    [setSubscriptionRenewalData]
  );

  return { currentStep: subscriptionRenewalData.currentStep, next, previous };
};

export default useCurrentStep;
