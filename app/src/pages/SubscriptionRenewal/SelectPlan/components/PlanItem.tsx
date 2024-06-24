import React from 'react';
import { SubscriptionPlan } from 'types/plan';
import Button from 'shared/components/Button';
import PlanServiceList from 'pages/SubscriptionRenewal/SelectPlan/components/PlanServiceList';
import classNames from 'classnames';
import PlanFrequency from 'pages/SubscriptionRenewal/shared/components/PlanFrequency';

export type PlanItemProps = {
  plan: SubscriptionPlan;
  isSelected?: boolean;
  isCurrentPlan?: boolean;
  onSelect?: () => void;
};
const PlanItem = ({ plan, isSelected, isCurrentPlan, onSelect }: PlanItemProps) => {
  return (
    <div
      data-testid="plan-item"
      className={classNames(
        'border rounded-[4px] py-4 min-w-[265px] max-w-[400px]',
        isSelected ? 'border-[#309C42] border-2' : 'border-[#ebf7e8]'
      )}
    >
      <h5 className="px-4 text-black text-center text-[32px] leading-[38px] font-medium font-GTSuper">{plan.name}</h5>
      <div className="px-4 flex items-end justify-center mb-2 leading-[36px]">
        <span className="text-black text-[32px] font-medium font-GTSuper">${plan.pricePerService}</span>
        <span className="text-[#111827] italic leading-[32px]">/ per service</span>
      </div>
      <div className="px-4">
        <Button
          label={isCurrentPlan ? 'Current plan' : isSelected ? 'Deselect' : 'Select plan'}
          className="w-full"
          color={isCurrentPlan || isSelected ? 'primary' : 'outline'}
          onClick={() => onSelect?.()}
        />
      </div>

      <PlanServiceList services={plan.addons.filter(addon => addon.is_recurring === true)} />

      <div className={classNames('border-t mx-4', isSelected ? 'border-[#309C42]' : 'border-[#EBF7E8]')}>
        <PlanFrequency plan={plan} />
      </div>
    </div>
  );
};

export default PlanItem;
