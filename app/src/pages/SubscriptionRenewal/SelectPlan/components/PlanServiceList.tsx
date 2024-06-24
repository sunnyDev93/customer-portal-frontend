import React from 'react';
import { PlanAddon } from 'types/plan';
import PlanServiceItem from 'pages/SubscriptionRenewal/SelectPlan/components/PlanServiceItem';
import classNames from 'classnames';

export type PlanServiceListProps = {
  services: PlanAddon[];
  className?: string;
};

const PlanServiceList = ({ services, className }: PlanServiceListProps) => {
  return (
    <div className={classNames('w-full flex justify-start items-end flex-col mt-8', className)}>
      {services?.reverse().map(service => (
        <PlanServiceItem key={service.id} service={service} />
      ))}
    </div>
  );
};

export default PlanServiceList;
