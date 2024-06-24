import React, { useMemo } from 'react';
import SubscriptionRenewalLayout from 'layouts/SubscriptionRenewalLayout';
import PageTitle from 'components/PageTitle';
import OverviewStep from './OverviewStep';
import AdditionalServicesStep from 'pages/SubscriptionRenewal/AdditionalServicesStep/AdditionalServicesStep';
import SelectPlan from './SelectPlan';
import Confirmation from 'pages/SubscriptionRenewal/Confirmation/Confirmation';
import useCurrentStep from './hooks/useCurrentStep';

const SubscriptionRenewal: React.FC = () => {
  const { currentStep } = useCurrentStep();
  const title = useMemo(() => {
    switch (currentStep) {
      case 2:
        return 'Additional Services';
      case 6:
        return 'Thank you for allowing us to protect your home';
      default:
        return 'Continue protecting your home with neighborly care.';
    }
  }, [currentStep]);

  return (
    <>
      <PageTitle title={title} />
      <SubscriptionRenewalLayout step={currentStep}>
        {currentStep === 1 && <SelectPlan />}
        {currentStep === 2 && <AdditionalServicesStep />}
        {currentStep === 3 && <OverviewStep />}
        {currentStep === 4 && <></>}
        {currentStep === 6 && <Confirmation />}
      </SubscriptionRenewalLayout>
    </>
  );
};

export default SubscriptionRenewal;
