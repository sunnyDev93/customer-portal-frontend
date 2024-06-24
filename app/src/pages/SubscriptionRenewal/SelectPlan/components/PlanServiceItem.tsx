import React, { useMemo, useEffect, useState } from 'react';
import { PlanAddon, PlanServiceStatus } from 'types/plan';
import { CheckCircleIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import usePlanList from 'pages/SubscriptionRenewal/SelectPlan/hooks/usePlanList';
import useGetCustomerProductUpgrades from 'pages/SubscriptionRenewal/SelectPlan/hooks/useGetCustomerProductUpgrades';

export type PlanServiceItemProps = {
  service: PlanAddon;
};

const PlanServiceItem = ({ service }: PlanServiceItemProps) => {
  const isGreen = useMemo(() => [PlanServiceStatus.Included, PlanServiceStatus.Selected].includes(service?.status), [service?.status]);
  const { getPurchasedInfo } = usePlanList();
  const isDisabled = useMemo(() => service?.status === PlanServiceStatus.Disabled, [service?.status]);
  const { isLoading: isLoadingCustomerProductUpgrades, data: customerProductUpgrades } = useGetCustomerProductUpgrades();
  const [isPurchased, setIsPurchased] = useState<true | false | undefined>(false);

  useEffect(() => {
    if (customerProductUpgrades && service) {
      const selectedService = getPurchasedInfo(customerProductUpgrades).filter(
        (item: any) => Number(item.product_id) === Number(service.id)
      );
      if (selectedService.length !== 0) {
        setIsPurchased(selectedService[0].purchased);
      }
    }
  }, [customerProductUpgrades, service]);

  if (customerProductUpgrades) {
    return (
      <div
        data-testid="plan-service-item"
        className={`px-4 w-full flex justify-between items-start py-3 decoration min-h-[65px] ${isGreen ? 'bg-[#EBF7E840]' : 'bg-[white]'}`}
      >
        <div className="w-[90px] mr-2">
          <img src={service.iconSrc} alt="icon" />
        </div>
        <div className="w-full">
          <p
            className={classNames({
              'line-through': isDisabled,
              'text-[#309C42]': isGreen,
              'text-[#9CA3AF]': isDisabled,
            })}
          >
            {service.name}
          </p>
          {!isGreen && <p className="text-[11px] italic text-[#6B7280]">{service.description}</p>}
        </div>
        <div data-testid="action-button" className="w-[24px] ml-2">
          {([PlanServiceStatus.Included, PlanServiceStatus.Selected].includes(service.status) || isPurchased) && (
            <CheckCircleIcon data-testid="check-circle-icon" width="24px" color="#309C42" />
          )}
        </div>
      </div>
    );
  }
  return <></>;
};

export default PlanServiceItem;
