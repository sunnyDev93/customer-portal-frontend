import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { getCustomerInvoices, submitCustomerACHInformation } from 'services/CustomerService';
import { QueryKeys } from 'constants/query-keys';
import { useRecoilValue } from 'recoil';
import aptiveUserAccountId from 'app-recoil/selectors/aptive-user-account-id';
import { InvoiceType } from 'types/request';
import { ACH } from '../../../types';
import { UnpackNestedValue } from 'react-hook-form';

export const useACHPaymentMethod = (customerId: string, version = 1) => {
  const getPayload = (formData: UnpackNestedValue<ACH>): ACH => ({
    ...formData,
    auto_pay: formData.auto_pay ? 1 : 0,
    account_type: version === 1 ? formData.account_type.toString() === '1' ? 1 : 0 : formData.account_type,
  });

  const { mutateAsync: add, isLoading } = useMutation((payload: ACH) => submitCustomerACHInformation(customerId, payload, version));

  return { add, getPayload, isLoading };
};
