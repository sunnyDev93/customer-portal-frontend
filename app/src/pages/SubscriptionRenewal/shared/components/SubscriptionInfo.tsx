import React from 'react';
import PlanFrequency from 'pages/SubscriptionRenewal/shared/components/PlanFrequency';
import { PlanAddon, SubscriptionPlan } from 'types/plan';

interface SubscriptionInfoProps {
  showSpecialtyPests?: boolean;
  additionalServices?: PlanAddon[];
  selectedPlan?: SubscriptionPlan;
  title?: string;
}

const SubscriptionInfo: React.FC<SubscriptionInfoProps> = ({ showSpecialtyPests, selectedPlan, additionalServices, title }) => {
  return (
    <div className="w-[284px] shadow-lg rounded-[8px] p-[24px]">
      <div data-testid="si-title" className="mb-[16px] font-medium text-[14px] text-[#374151]">
        {title || 'SUBSCRIPTION INFORMATION'}
      </div>
      <div
        data-testid="si-plan-name"
        className="mb-[16px] h-[88px] rounded-[8px] bg-[#F3F4F6] flex justify-center items-center text-[#344C38] font-GTSuper text-[40px]"
      >
        {selectedPlan?.name}
      </div>

      <div className="pb-[16px] border-b border-[#D1D5DB] mb-[16px]">
        <div data-testid="si-service-plan-title" className="text-[#6B7280] text-[14px] font-medium">
          Service Plan
        </div>
        <div data-testid="si-service-plan-period" className="text-[14px] text-[#111827] font-semibold">
          {selectedPlan?.name} - {selectedPlan?.agreementLength}
        </div>
        <div data-testid="si-service-plan-price" className="text-[14px] text-[#111827]">
          ${selectedPlan?.pricePerService}/treatment
        </div>
      </div>
      {additionalServices && additionalServices.length !== 0 && showSpecialtyPests && (
        <div className="pb-[16px] border-b border-[#D1D5DB] mb-[16px]">
          <div data-testid="si-service-specialty-pests-title" className="text-[#6B7280] text-[14px] font-medium">
            Specialty Pests
          </div>
          <div data-testid="si-service-specialty-pests-value" className="text-[14px] text-[#111827] font-semibold">
            {additionalServices?.map(addon => (
              <p key={addon.id}>{addon.name}</p>
            ))}
          </div>
        </div>
      )}
      <PlanFrequency plan={selectedPlan} />
    </div>
  );
};

export default SubscriptionInfo;
