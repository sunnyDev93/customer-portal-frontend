import { useQuery } from 'react-query';
import { getCustomerAutoPaySettings } from 'services/CustomerService';
import { CustomerAutoPaySettingsResponse, CustomerAutoPaySettingsResponseAttributes } from 'types/request';
import sumBy from 'lodash/sumBy';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { QueryKeys } from 'constants/query-keys';
import { useFeatureFlag } from 'configcat-react';

const calculateNextPaymentAmount = (autoPaySettings: CustomerAutoPaySettingsResponse['data']) =>
  sumBy(autoPaySettings, 'attributes.nextPaymentAmount');

export const useGetCustomerAutoPaySettings = (accountId: string) => {
  const { value: useLegacyPaymentProvider, loading } = useFeatureFlag('useLegacyPaymentProvider', false);

  const [nextPaymentAmount, setNextPaymentAmount] = useState<number | undefined>();
  const [customerAutoPaySettings, setCustomerAutoPaySettings] = useState<CustomerAutoPaySettingsResponseAttributes | undefined>();

  const { isLoading, error } = useQuery<CustomerAutoPaySettingsResponse, AxiosError>(
    QueryKeys.GetCustomerAutoPaySettings,
    () => getCustomerAutoPaySettings(accountId, useLegacyPaymentProvider ? 1 : 2),
    {
      enabled: !!accountId && !loading,
      onSuccess: data => {
        const isMonthToMonth = (planName: string | undefined) => planName?.includes('30 day');

        const searchAttribute = data?.data.find(item => isMonthToMonth(item?.attributes.planName));
        setNextPaymentAmount(calculateNextPaymentAmount(data.data));

        setCustomerAutoPaySettings(typeof searchAttribute === 'undefined' ? data.data[0].attributes : searchAttribute.attributes);
      },
    }
  );

  return { isLoading, customerAutoPaySettings, nextPaymentAmount, error };
};
