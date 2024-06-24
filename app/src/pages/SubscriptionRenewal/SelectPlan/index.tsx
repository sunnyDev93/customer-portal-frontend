import PlanCategories from 'pages/SubscriptionRenewal/SelectPlan/components/PlanCategories';
import StepTitle from 'pages/SubscriptionRenewal/shared/components/StepTitle';
import PlanList from 'pages/SubscriptionRenewal/SelectPlan/components/PlanList';
import Button from 'shared/components/Button';
import React from 'react';
import useCurrentStep from '../hooks/useCurrentStep';

const SelectPlan = () => {
  const { next } = useCurrentStep();

  return (
    <div className="h-full w-full">
      <div className="w-full flex justify-start items-end">
        <StepTitle title="Select a plan" subtitle="All plans come with the following..." className="flex-shrink-0 mr-5" />
        <PlanCategories />
      </div>
      <PlanList className="mt-6 mb-[15px]" />
      <div className="w-full text-end text-[12px] italic text-[#6B7280]">
        *Frequency of treatments will vary depending on time of year and other factors.
      </div>
      <div className="w-full flex justify-center items-center">
        <Button label="Next: Select Additional Services" type="submit" onClick={next} />
      </div>
    </div>
  );
};

export default SelectPlan;
