import React from 'react';
import classNames from 'classnames';
import AddonItem from 'pages/SubscriptionRenewal/AdditionalServicesStep/components/AddonItem';
import useSelectSubscriptionPlan from 'pages/SubscriptionRenewal/hooks/useSelectSubscriptionPlan';
import useAdditionalServices from 'pages/SubscriptionRenewal/hooks/useAdditionalServices';

export type PlanServiceListProps = {
  className?: string;
};

const SelectAddon = ({ className }: PlanServiceListProps) => {
  const { selectedPlan } = useSelectSubscriptionPlan();
  const { onSelect, additionalServiceIds } = useAdditionalServices();

  return (
    <div className={classNames('grid grid-cols-2 gap-x-[22px] gap-y-[16px]', className)}>
      {selectedPlan?.addons
        ?.filter(service => service.status === 'enable' || service.status === 'included')
        ?.map(service => (
          <AddonItem key={service.id} addon={service} onSelect={onSelect} isSelected={additionalServiceIds?.includes(service.id)} />
        ))}
    </div>
  );
};

export default SelectAddon;
