import React, { useMemo } from 'react';
import { CustomerAutoPaySettingsResponseAttributes } from 'types/request';
import AutoPaySettingsItem from 'pages/PaymentSettings/components/AutoPaySettingItem';
import { toDollars } from 'helpers';
import { DatetimeHelper } from 'helpers/datetime';

interface AutoPaySettingsProps {
  customerAutoPaySettings: CustomerAutoPaySettingsResponseAttributes | undefined;
  nextPaymentAmount: number | undefined;
  isOnMonthlyBilling: boolean;
  isMonthlyBillingEnabled?: boolean;
}

const AutoPaySettings = ({
  customerAutoPaySettings,
  nextPaymentAmount,
  isOnMonthlyBilling,
  isMonthlyBillingEnabled = false,
}: AutoPaySettingsProps) => {
  const nextPaymentDateMessage = useMemo(() => {
    return isOnMonthlyBilling
      ? isMonthlyBillingEnabled
        ? DatetimeHelper.format(customerAutoPaySettings?.nextPaymentDate, 'MMMM Do')
        : 'Payment will be charged on the first day of each month'
      : 'Payment will be charged at the time of each Treatment according to your Service Agreement';
  }, [isOnMonthlyBilling, customerAutoPaySettings]);

  const paymentMethodMessage = useMemo(() => {
    return (
      customerAutoPaySettings?.cardLastFour && (
        <div>
          {customerAutoPaySettings?.cardType || 'Bank Account'} ending in{' '}
          <span className="fs-exclude">{customerAutoPaySettings?.cardLastFour}</span>
        </div>
      )
    );
  }, [customerAutoPaySettings?.cardLastFour, customerAutoPaySettings?.cardType]);

  const renderAutoPaySettingsItems = () => (
    <>
      <AutoPaySettingsItem label="Next Payment Amount">
        <>{toDollars(nextPaymentAmount)}</>
      </AutoPaySettingsItem>
      <AutoPaySettingsItem label="Date of Next Payment">
        <span className="fs-exclude">{nextPaymentDateMessage}</span>
      </AutoPaySettingsItem>
      <AutoPaySettingsItem label="Payment Method">{paymentMethodMessage}</AutoPaySettingsItem>

      <li>
        <div className="px-4 py-5 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="w-100 text-[14px]">
              <p className="items-center text-gray-500 font-medium sm:mt-0">
                By enabling autopay you authorize Aptive or its assignee(s) to charge the amount indicated above to this account at the time
                of each treatment, or the 1st day of each month if you selected Aptive’s monthly payment plan under your Service Agreement.
                You can revoke your authorization at anytime by disabling Autopay, calling us at 855-BUG-FREE, writing us at{' '}
                <a href="mailto:customersupport@goaptive.com" className="text-green-600 underline">
                  customersupport@goaptive.com
                </a>{' '}
                or 5123 N 300 W, Provo UT 84601
              </p>
            </div>
          </div>
        </div>
      </li>
    </>
  );

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md mb-5">
      <ul className="divide-y divide-gray-200">
        <li>
          <div className="px-4 py-6 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="space-y-1">
                <p className="text-[16px] font-medium">Auto Pay Settings</p>
                <p className="text-[14px] flex items-center text-gray-500 sm:mt-0">Manage your automatic settings</p>
              </div>
            </div>
          </div>
        </li>

        <li>
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="w-1/2 md:w-1/3">
                <p className="flex items-center text-gray-500 pl--[0px] text-[14px] font-medium sm:mt-0">Automatic Payment</p>
              </div>

              <div className="ml-2 flex w-full items-center">
                <p className="font-medium text-[14px]  mb-1 text-gray-900">
                  {customerAutoPaySettings?.isEnabled ? 'Enabled' : 'Not Enabled'}
                </p>
              </div>
            </div>
          </div>
        </li>
        {customerAutoPaySettings?.isEnabled && renderAutoPaySettingsItems()}
      </ul>
    </div>
  );
};

export default AutoPaySettings;
