import { QueryKeys } from 'constants/query-keys';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { getPaymentServiceAuthToken } from 'services/CustomerService';
import { PaymentServiceAuthTokenResponse } from 'types/request';

export const usePaymentServiceAuthToken = (payload: { origin: string; timestamp: string }, enabled: boolean) => {
  const { isLoading, data, error } = useQuery<PaymentServiceAuthTokenResponse, AxiosError>(
    QueryKeys.GetPaymentServiceAuthToken,
    () => getPaymentServiceAuthToken(payload),
    { enabled }
  );

  return { isLoading, data: data?.data, error };
};
