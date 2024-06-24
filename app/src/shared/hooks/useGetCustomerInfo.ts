import { AxiosError } from 'axios';
import { useFeatureFlag } from 'configcat-react';
import { useQuery, UseQueryOptions } from 'react-query';
import { getCustomerInfo } from 'services/CustomerService';
import { CustomerInfoResponse } from 'types/request';

export const useGetCustomerInfo = (
  accountId: string,
  options?: UseQueryOptions<CustomerInfoResponse | null, AxiosError, CustomerInfoResponse | null>
) => {
  const { value, loading } = useFeatureFlag('useLegacyPaymentProvider', false);
  return useQuery<CustomerInfoResponse | null, AxiosError>(
    'getCustomerInfo',
    () => {
      if (loading) return null;
      return getCustomerInfo(accountId, value ? 1 : 2);
    },
    {
      enabled: !!accountId,
      ...options,
    }
  );
};
