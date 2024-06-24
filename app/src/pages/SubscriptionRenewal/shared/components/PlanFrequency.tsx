import React, { useMemo } from 'react';
import { SubscriptionPlan } from 'types/plan';
import { CalendarIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

export type PlanFrequencyProps = {
  plan?: SubscriptionPlan;
};

const PlanFrequency = ({ plan }: PlanFrequencyProps) => {
  const getTreatmentFrequency = useMemo(() => {
    switch (plan?.treatmentFrequency) {
      case '4-5':
        return <p className="text-[11px] whitespace-pre-line text-[#6B7280]">Jan - Dec: Every 50-80 days</p>;
      case '6-7':
        return (
          <>
            <p className="text-[11px] whitespace-pre-line text-[#6B7280]">Apr - Oct: Every 30-60 days</p>
            <p className="text-[11px] whitespace-pre-line text-[#6B7280]">Nov - Mar: 50-80 days</p>
          </>
        );
      default:
        return (
          <>
            <p className="text-[11px] whitespace-pre-line text-[#6B7280]">Apr - Oct: Every 20-40 days</p>
            <p className="text-[11px] whitespace-pre-line text-[#6B7280]">Nov - Mar: 50-80 days</p>
          </>
        );
    }
  }, [plan]);

  return (
    <div className="w-full flex justify-between items-start py-4 decoration">
      <div className="w-[24px] mr-2">
        <CalendarIcon color="#000" />
      </div>
      <div className="w-full">
        <p className={classNames()}>Treatment Frequency</p>
        {getTreatmentFrequency}
      </div>
    </div>
  );
};

export default PlanFrequency;
