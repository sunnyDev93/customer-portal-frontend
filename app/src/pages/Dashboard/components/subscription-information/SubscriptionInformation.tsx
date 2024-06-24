import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Button from 'shared/components/Button';
import { DatetimeHelper } from 'helpers/datetime';
import { DATE_SEPARATE_YEAR_FORMAT } from 'constants/datetime';
import moment from 'moment';
import { useRecoilValue } from 'recoil';
import { customerInfoDataState } from 'app-recoil/atoms/customer-info';
import isEmpty from 'lodash/isEmpty';

interface SubscriptionInformationProps {
  serviceType?: string;
  pricePerTreatment?: string;
  dayRemaining?: string;
  specialtyPests?: string[];
  agreementLength?: string;
  agreementDate?: string;
  accountId?: string;
  isUpgradeAvailable?: boolean;
}

const SubscriptionInformation: React.FC<SubscriptionInformationProps> = ({ accountId }) => {
  const customerInfoData = useRecoilValue(customerInfoDataState);
  const subscriptionData = useMemo(() => customerInfoData?.subscription, [customerInfoData]);

  if (!subscriptionData) {
    return (
      <div className="p-[24px] shadow-mode-2 rounded-[8px] bg-white">
        <div className="mb-[16px] bg-[#F3F4F6] h-[88px] rounded-[8px] text-[40px] text-[#344C38] flex justify-center items-center font-GTSuper"></div>
        <div className="mb-[16px] bg-[#F3F4F6] h-[88px] rounded-[8px] text-[40px] text-[#344C38] flex justify-center items-center font-GTSuper"></div>
        <div className="mb-[16px] bg-[#F3F4F6] h-[88px] rounded-[8px] text-[40px] text-[#344C38] flex justify-center items-center font-GTSuper"></div>
        <div className="mb-[16px] bg-[#F3F4F6] h-[88px] rounded-[8px] text-[40px] text-[#344C38] flex justify-center items-center font-GTSuper"></div>
        <div className="mb-[16px] bg-[#F3F4F6] h-[88px] rounded-[8px] text-[40px] text-[#344C38] flex justify-center items-center font-GTSuper"></div>
      </div>
    );
  } else {
    return (
      <div className="p-[24px] shadow-mode-2 rounded-[8px] bg-white">
        <div data-testid="head-title" className="mb-[16px] text-[#374151] font-medium text-[14px]">
          SUBSCRIPTION INFORMATION
        </div>
        <div className="mb-[16px] bg-[#F3F4F6] h-[88px] rounded-[8px] text-[40px] text-[#344C38] flex justify-center items-center font-GTSuper">
          {subscriptionData.serviceType}
        </div>
        <div data-testid="service-plan-section" className="">
          <div data-testid="service-plan-title" className="text-[#6B7280] font-medium text-[14px] leading-[22px]">
            Service Plan
          </div>
          <div data-testid="service-plan-type" className="text-[#111827] leading-[22px] font-semibold text-[14px]">
            {subscriptionData.serviceType} - {subscriptionData.agreementLength}{' '}
            {Number(subscriptionData.agreementLength) > 1 ? 'months' : 'month'}
          </div>
          <div data-testid="service-plan-price" className="text-[#111827] leading-[22px] font-regular text-[14px]">
            ${subscriptionData.pricePerTreatment}/treatment
          </div>
        </div>
        {subscriptionData.agreementDate && (
          <div data-testid="agreement-effective-date-section" className="pt-[16px] mt-[16px] border-t-[1px] border-[#D1D5DB]">
            <div data-testid="agreement-effective-date-title" className="text-[#4B5563] text-[14px]">
              Agreement Effective Date
            </div>
            <div className="text-[#4B5563] text-[14px]">
              <span data-testid="agreement-effective-date-value" className="font-semibold">
                {DatetimeHelper.format(subscriptionData.agreementDate, DATE_SEPARATE_YEAR_FORMAT)}
              </span>{' '}
              (
              <span className="italic" data-testid="agreement-effective-date-remain">
                {moment(subscriptionData.agreementDate)
                  .add(subscriptionData?.agreementLength, 'M')
                  .diff(moment(subscriptionData.agreementDate), 'days') -
                  Math.round(moment.duration(moment(new Date()).diff(subscriptionData.agreementDate), 'milliseconds').asDays()) -
                  1}{' '}
                days remain
              </span>
              )
            </div>
          </div>
        )}
        {subscriptionData.specialtyPests && !isEmpty(subscriptionData.specialtyPests) && (
          <div data-testid="specialty-pests-section" className="mt-[16px] border-t-[1px] border-[#D1D5DB] pt-[16px]">
            <div data-testid="specialty-pests-head" className="text-[#6B7280] font-medium text-[14px] leading-[22px]">
              Specialty Pests
            </div>
            {subscriptionData.specialtyPests && (
              <div data-testid="specialty-pests-value" className="text-[#111827] leading-[22px] font-semibold text-[14px]">
                {Object.values(subscriptionData.specialtyPests).join(', ')}
              </div>
            )}
          </div>
        )}
        {subscriptionData.isUpgradeAvailable && (
          <div data-testid="button-section" className="pt-[16px] mt-[16px] border-t-[1px] border-[#D1D5DB]">
            <div data-testid="redirec-question" className="text-[#4B5563] text-[14px] italic mb-[16px]">
              Did you know that we cover other pests at an additional cost?
            </div>
            <Link to="/dashboard/subscription-renewal">
              <Button
                disabled={!subscriptionData.isUpgradeAvailable}
                testId="redirect-btn"
                label="View Available Upgrades"
                type="button"
                color="primary"
                className="w-full rounded-[6px]"
              />
            </Link>
          </div>
        )}
      </div>
    );
  }
};

export default SubscriptionInformation;
