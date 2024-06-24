import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { customerInfoDataState } from '../../../app-recoil/atoms/customer-info';
import { DatetimeHelper } from '../../../helpers/datetime';
import { DATE_SEPARATE_YEAR_FORMAT } from '../../../constants/datetime';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';

const Icon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="79" height="80" viewBox="0 0 79 80" fill="none">
      <circle cx="39.0526" cy="39.9999" r="39.0526" fill="#78856E" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.1883 56.4414C44.9565 59.1885 41.2399 60.4004 37.281 60.4004C31.4638 60.4004 25.9698 57.815 22.4956 53.7752C19.4254 50.2203 17.4863 45.3726 17.4863 40.0401C17.4863 28.4865 26.0506 19.5991 36.7154 19.5991C41.1591 19.5991 45.1181 21.0534 48.1883 23.5581V20.4071H58.2876V59.5924H48.1883V56.4414ZM27.9896 40.0401C27.9896 46.1805 32.4333 50.705 38.3313 50.705C42.2903 50.705 45.7644 48.7659 47.7843 45.8573V34.1421C45.6028 31.2335 42.1287 29.2944 38.0889 29.2944C31.9485 29.2944 27.9896 34.3844 27.9896 40.0401Z"
        fill="white"
      />
    </svg>
  );
};
const CurrentPlan = () => {
  const customerInfoData = useRecoilValue(customerInfoDataState);
  const currentPlan = useMemo(() => customerInfoData?.currentPlan, [customerInfoData]);

  return (
    <div data-testid="current-plan-info" className="p-[24px] shadow-mode-2 rounded-[8px] bg-white flex flex-col gap-2">
      <div className="text-black text-2xl">Current Plan</div>
      <div data-testid="plan-type" className="text-black text-base">
        {currentPlan?.name}
      </div>
      <div data-testid="agreement-date" className="text-gray-500 text-sm">
        Customer Since: {DatetimeHelper.format(currentPlan?.subscription_start, DATE_SEPARATE_YEAR_FORMAT)}
      </div>
      <div className="flex flex-col gap-4 text-gray-600 text-sm">
        {currentPlan?.included_products && currentPlan?.included_products.length !== 0 && (
          <div data-testid="specialty-pests-section">
            <span className="font-bold">Includes:</span> {currentPlan.included_products.join(', ')}.
          </div>
        )}
        <Link to="/dashboard/documents">
          <div className="underline cursor-pointer">View agreement</div>
        </Link>
        {/*Temporary hide this, will be back soon*/}
        {/*{currentPlan?.subscription_end && (*/}
        {/*  <div data-testid="agreement-date">*/}
        {/*    Agreement Effective Date - {DatetimeHelper.format(currentPlan?.subscription_end, DATE_SEPARATE_YEAR_FORMAT)}*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
      <div data-testid="aptive-icon" className="mt-3 rounded-0.5 bg-[#F3F4F6] h-[140px] flex justify-center items-center">
        <Icon />
      </div>
    </div>
  );
};

export default CurrentPlan;
