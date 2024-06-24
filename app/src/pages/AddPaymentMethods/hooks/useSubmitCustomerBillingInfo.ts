import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { submitCustomerBillingInfo, submitTokenexCustomerBillingInfo } from 'services/CustomerService';
import { CustomerBillingPayload, TokenexCustomerBillingPayload } from 'types';
import { CustomerBillingInfoResponse, TokenexCustomerBillingInfoResponse } from 'types/request';

interface SubmitCustomerBillingInfoRequest {
  accountId: string;
  payload: CustomerBillingPayload;
}

interface SubmitTokenexCustomerBillingInfoRequest {
  accountId: string;
  payload: TokenexCustomerBillingPayload;
}
type SubmitCustomerBillingInfoError = AxiosError & {
  data: {
    message: string;
    errors: {
      [key: string]: string[];
    };
  };
};

const useSubmitCustomerBillingInfo = (version = 1) => {
  return useMutation<CustomerBillingInfoResponse, SubmitCustomerBillingInfoError, SubmitCustomerBillingInfoRequest>(
    ({ accountId, payload }) => submitCustomerBillingInfo(accountId, payload, version)
  );
};

export const useSubmitTokenexCustomerBillingInfo = () => {
  return useMutation<TokenexCustomerBillingInfoResponse, SubmitCustomerBillingInfoError, SubmitTokenexCustomerBillingInfoRequest>(
    ({ accountId, payload }) => submitTokenexCustomerBillingInfo(accountId, payload)
  );
};

export default useSubmitCustomerBillingInfo;
