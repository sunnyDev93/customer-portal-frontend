import React, { useMemo } from 'react';
import SubscriptionInfo from 'pages/SubscriptionRenewal/shared/components/SubscriptionInfo';
import Button from '../../shared/components/Button';
import useCurrentStep from './hooks/useCurrentStep';
import useSelectSubscriptionPlan from './hooks/useSelectSubscriptionPlan';
import useAdditionalServices from './hooks/useAdditionalServices';
import { formatCurrency } from '../../helpers/format';
import { PlanAddon, PlanServiceStatus } from '../../types/plan';

export const TAX_RATE = 0.1;
const getAddonPrice = (addon: PlanAddon): number =>
  (addon?.status === PlanServiceStatus.Enable ? addon?.initialTreatmentPrice : 0) ?? 0;

const OverviewStep: React.FC = () => {
  const { next, previous } = useCurrentStep();

  const { selectedPlan } = useSelectSubscriptionPlan();
  const { additionalServices } = useAdditionalServices();

  const subTotal = useMemo((): number => {
    let result = selectedPlan?.initialTreatmentPrice ?? 0;
    additionalServices?.forEach(addon => (result += getAddonPrice(addon)));
    return result;
  }, [selectedPlan, additionalServices]);

  const tax = useMemo((): number => subTotal * TAX_RATE, [subTotal]);

  const total = useMemo((): number => subTotal + tax, [subTotal, tax]);

  return (
    <>
      <div data-testid="sr-overview-title" className="mt-[16px] mb-[16px] text-[#6B7280] font-GTSuper text-[24px] italic">
        Overview
      </div>
      <div className="flex justify-between items-start">
        <div data-testid="sr-overview-SubscriptionInfo">
          <SubscriptionInfo selectedPlan={selectedPlan} additionalServices={additionalServices} showSpecialtyPests />
        </div>

        <div className="w-[calc(100%-284px)] pl-[40px]">
          <div className="pb-[16px] border-b border-[#D1D5DB] mb-[16px]">
            <div className="mb-[16px] italic text-[#333333]">
              <span data-testid="sr-overview-summary-title" className="font-GTSuper text-[28px]">
                Subscription Summary
              </span>
            </div>
            <div className="flex justify-between items-center mb-[8px]">
              <div className="flex justify-between items-start">
                <div data-testid="sr-overview-plan-title" className="text-[16px] font-bold ">
                  Plan:{' '}
                </div>
                <div data-testid="sr-overview-plan-value" className="text-[16px] ml-[8px]">
                  {selectedPlan?.name}
                </div>
              </div>
              <div data-testid="sr-overview-plan-price" className="text-right text-[16px]">
                {formatCurrency(selectedPlan?.pricePerService ?? 0)} per treatment
              </div>
            </div>
            <div className="flex justify-between items-start mb-[8px]">
              <div data-testid="sr-overview-Specialty-Pests-title" className="text-[16px] font-bold whitespace-nowrap">
                Specialty Pests:
              </div>
              <div className="w-full">
                {additionalServices?.map(addon => (
                  <div className="flex justify-between items-start mb-[8px]" key={addon.id}>
                    <div data-testid="sr-overview-Specialty-Pests-value" className="text-[16px] ml-[8px]">
                      {addon?.name}
                    </div>
                    <div data-testid="sr-overview-Specialty-Pests-price" className="text-right text-[16px]">
                      {formatCurrency(addon?.recurringPrice ?? 0)} per treatment
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pb-[16px] border-b border-[#D1D5DB] mb-[16px]">
            {additionalServices?.map(addon => {
              if (addon?.status === PlanServiceStatus.Enable && formatCurrency(getAddonPrice(addon)) === '$0.00') {
                return <></>;
              }
              return (
                <div className="flex justify-between items-start mb-[8px]" key={addon.id}>
                  <div data-testid="sr-overview-Specialty-Pests-value-pricing" className="text-[16px] ml-[8px]">
                    {addon?.status === PlanServiceStatus.Enable ? 'Initial Treatment Service: ' : ''}
                    {addon?.name}
                  </div>
                  <div data-testid="sr-overview-Specialty-Pests-price-pricing" className="text-right text-[16px]">
                    {formatCurrency(getAddonPrice(addon))}
                  </div>
                </div>
              );
            })}
            <div className="flex justify-between items-center mb-[8px]">
              <div className="flex justify-between items-start">
                <div data-testid="sr-overview-plan-value-pricing" className="text-[16px] ml-[8px]">
                  {selectedPlan?.name} Standard Treatment
                </div>
              </div>
              <div data-testid="sr-overview-plan-price-pricing" className="text-right text-[16px]">
                {formatCurrency(selectedPlan?.initialTreatmentPrice ?? 0)}
              </div>
            </div>
          </div>

          <div className="mb-[200px]">
            <div className="mb-[8px] flex justify-end items-center">
              <div data-testid="sr-overview-sub-total-title" className="w-[calc(100%-160px)] text-right text-[16px">
                Sub Total
              </div>
              <div data-testid="sr-overview-sub-total-value" className="w-[160px] text-right text-[16px]">
                {formatCurrency(subTotal)}
              </div>
            </div>
            <div className="mb-[8px] flex justify-end items-center">
              <div data-testid="sr-overview-tax-title" className="w-[calc(100%-160px)] text-right text-[16px">
                Tax
              </div>
              <div data-testid="sr-overview-tax-value" className="w-[160px] text-right text-[16px]">
                {formatCurrency(tax)}
              </div>
            </div>
            <div className="mb-[8px] flex justify-end items-center">
              <div data-testid="sr-overview-total-due-title" className="w-[calc(100%-160px)] text-right text-[16px] font-semibold">
                Total Due at Next Service
              </div>
              <div data-testid="sr-overview-total-due-value" className="w-[160px] text-right text-[16px] font-semibold">
                {formatCurrency(total)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Button label="Previous: Select a Plan" type="button" color="muted" className="mr-2" onClick={previous} />
        <Button label="Next: Overview" type="button" className="ml-2" onClick={next} />
      </div>
    </>
  );
};

export default OverviewStep;
