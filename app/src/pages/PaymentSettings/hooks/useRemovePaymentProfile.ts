import { AxiosError } from 'axios';
import { useFeatureFlag } from 'configcat-react';
import { useMutation, useQueryClient } from 'react-query';
import { QueryKeys } from 'constants/query-keys';
import { PaymentMethodProps } from 'components/PaymentMethodItem';
import { removeCustomerPaymentProfile } from 'services/CustomerService';

interface RemovePaymentProfileRequest {
  accountId: string;
  paymentProfileId: number | string;
}

export const useRemovePaymentProfile = () => {
  const { value: useLegacyPaymentProvider } = useFeatureFlag('useLegacyPaymentProvider', false);

  const queryClient = useQueryClient();

  const { isLoading, mutate: removePaymentProfileMutate } = useMutation<unknown, AxiosError, RemovePaymentProfileRequest>(
    ({ accountId, paymentProfileId }) => removeCustomerPaymentProfile(accountId, paymentProfileId, useLegacyPaymentProvider ? 1 : 2),
    {
      onSuccess: (_data, { paymentProfileId }) => {
        queryClient.setQueryData(QueryKeys.GetCustomerPaymentProfiles, cachedData => {
          return (cachedData as PaymentMethodProps[])?.filter(item => item.id != paymentProfileId);
        });
      },
    }
  );

  return { isLoading, removePaymentProfileMutate };
};
