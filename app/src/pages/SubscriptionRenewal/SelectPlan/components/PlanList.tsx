import React, { useEffect } from 'react';
import PlanItem from 'pages/SubscriptionRenewal/SelectPlan/components/PlanItem';
import classNames from 'classnames';
import useSelectSubscriptionPlan from '../../hooks/useSelectSubscriptionPlan';
import usePlanList from 'pages/SubscriptionRenewal/SelectPlan/hooks/usePlanList';

export type PlanListProps = {
  className?: string;
};

const PlanList = ({ className }: PlanListProps) => {
  const { planList, userPlan } = usePlanList();
  const { selectedPlan, onSelect } = useSelectSubscriptionPlan(userPlan);
  useEffect(() => {
    window.onbeforeunload = function () {
      localStorage.clear();
      return undefined;
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <div className={classNames('w-full flex flex-wrap gap-5 justify-center', className)}>
      {planList?.map(plan => (
        <PlanItem
          key={plan.id}
          plan={plan}
          isSelected={selectedPlan?.id === plan?.id}
          isCurrentPlan={plan.id === userPlan?.id}
          onSelect={() => onSelect(plan)}
        />
      ))}
    </div>
  );
};

export default PlanList;
