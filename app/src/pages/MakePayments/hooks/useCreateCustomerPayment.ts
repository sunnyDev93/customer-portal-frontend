import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { createCustomerPayment } from 'services/CustomerService';
import { CreateCustomerPaymentResponse } from 'types/request';

interface CreateCustomerPaymentPayload {
  amount_cents?: number;
  payment_method?: string;
  payment_profile_id?: number;
  payment_method_id?: number | string | null | undefined;
}

export const useCreateCustomerPayment = (apiVersion = 1) => {
  const { isLoading, mutate: createCustomerPaymentMutation } = useMutation<
    CreateCustomerPaymentResponse,
    AxiosError,
    { payload: CreateCustomerPaymentPayload; accountId: string }
  >(({ accountId, payload }) => createCustomerPayment(accountId, payload, apiVersion));

  return { isSubmittingForm: isLoading, createCustomerPaymentMutation };
};
