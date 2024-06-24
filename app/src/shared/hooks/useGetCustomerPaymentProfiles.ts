import { customerInfoDataState } from 'app-recoil/atoms/customer-info';
import { AxiosError } from 'axios';
import { useFeatureFlag } from 'configcat-react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { PaymentMethodProps } from 'components/PaymentMethodItem';
import { ACHAccountType } from 'constants/common';
import { QueryKeys } from 'constants/query-keys';
import { getAccountType } from 'helpers';
import { getCustomerPaymentProfiles, getCustomerPaymentProfilesV2 } from 'services/CustomerService';
import { CustomerPaymentProfile, CustomerPaymentProfileV2 } from 'types/request';

interface TransformDataParams {
  accountId: string;
  params?: { statuses?: string[]; payment_methods?: string[] };
  paymentProfileId?: number;
}

const transformDataV1 = async ({ accountId, params, paymentProfileId }: TransformDataParams) => {
  try {
    const data = await getCustomerPaymentProfiles(accountId, params);

    return Object.values(data).map((paymentMethod: CustomerPaymentProfile) => ({
      id: paymentMethod.id.toString(),
      accountId,
      bankName: paymentMethod.bankName,
      isAutoPay: paymentProfileId === paymentMethod.id,
      isExpired: !!paymentMethod.isExpired,
      lastFour: paymentMethod.lastFour,
      paymentMethodType: paymentMethod.paymentMethod === 1 ? 'CC' : 'ACH',
      accountType: getAccountType(paymentMethod),
      cardType: paymentMethod.cardType,
    }));
  } catch (err) {
    return Promise.reject(err);
  }
};
const transformDataV2 = async ({ accountId, params }: TransformDataParams) => {
  try {
    const data = await getCustomerPaymentProfilesV2(accountId, params);

    return data.data.map((paymentMethod: CustomerPaymentProfileV2) => ({
      id: paymentMethod.payment_method_id,
      accountId,
      bankName: paymentMethod.ach_bank_name || '',
      isAutoPay: paymentMethod.is_autopay,
      isExpired: paymentMethod.is_expired,
      lastFour: paymentMethod[paymentMethod.type === 'CC' ? 'cc_last_four' : 'ach_account_last_four'],
      paymentMethodType: paymentMethod.type,
      accountType: ACHAccountType[paymentMethod.ach_account_type],
      cardType: paymentMethod.cc_type,
    }));
  } catch (err) {
    return Promise.reject(err);
  }
};

export const useGetCustomerPaymentProfilesWrapper = (accountId: string, params?: { statuses?: string[]; payment_methods?: string[] }) => {
  const customerInfo = useRecoilValue(customerInfoDataState);

  const { value: useLegacyPaymentProvider, loading } = useFeatureFlag('useLegacyPaymentProvider', false);

  return useQuery<PaymentMethodProps[], AxiosError>(
    [QueryKeys.GetCustomerPaymentProfiles],
    async () => {
      return useLegacyPaymentProvider
        ? transformDataV1({ accountId, params, paymentProfileId: customerInfo?.paymentProfileId })
        : transformDataV2({ accountId, params });
    },
    {
      enabled: !loading && !!customerInfo,
    }
  );
};
