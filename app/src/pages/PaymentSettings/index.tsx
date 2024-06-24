import React, { useMemo } from 'react';
import { customerInfoDataState } from 'app-recoil/atoms/customer-info';
import aptiveUserAccountId from 'app-recoil/selectors/aptive-user-account-id';
import LoadingSpinner from 'components/LoadingSpinner';
import PageTitle from 'components/PageTitle';
import PaymentMethods from 'components/PaymentMethods';
import WarningMessage from 'components/WarningMessage';
import AutoPaySettings from 'pages/PaymentSettings/components/AutoPaySettings';
import { useGetCustomerAutoPaySettings } from 'pages/PaymentSettings/hooks/useGetCustomerAutoPaySettings';
import { useRecoilValue } from 'recoil';
import { useGetCustomerPaymentProfilesWrapper } from 'shared/hooks/useGetCustomerPaymentProfiles';
import { useTrackingView } from '../../shared/hooks/useTrackingView';
import MessageBox, { MessageBoxTypes } from 'components/MessageBox';
import { useFeatureFlag } from 'configcat-react';

const API_ERROR_MESSAGE = 'Something went wrong. Please refresh the page and try again.';

const PaymentSettingsPage = () => {
  useTrackingView();
  const { value: isMonthlyBillingEnabled, loading: isLoadingMonthlyBillingEnabled } = useFeatureFlag('isMonthlyBillingEnabled', false);

  const accountId = useRecoilValue(aptiveUserAccountId);
  const customerInfo = useRecoilValue(customerInfoDataState);

  const {
    isLoading: isGettingCustomerAutoPaySettings,
    customerAutoPaySettings,
    nextPaymentAmount,
    error: customerAutoPaySettingsError,
  } = useGetCustomerAutoPaySettings(accountId);

  const {
    data: paymentMethods,
    isLoading,
    error: paymentMethodsError,
  } = useGetCustomerPaymentProfilesWrapper(accountId, {
    statuses: ['valid', 'failed'],
  });

  const isAutoPayExpired = useMemo(
    () => paymentMethods?.filter(paymentMethod => paymentMethod.isAutoPay)?.[0]?.isExpired || false,
    [paymentMethods]
  );

  const apiErrorMessage = useMemo(
    () => (paymentMethodsError || customerAutoPaySettingsError ? customerAutoPaySettingsError?.message || API_ERROR_MESSAGE : ''),
    [paymentMethodsError, customerAutoPaySettingsError]
  );

  return (
    <>
      {isLoading || isGettingCustomerAutoPaySettings || !customerInfo || isLoadingMonthlyBillingEnabled ? (
        <LoadingSpinner className="mt-5" label="" centered />
      ) : (
        <>
          <PageTitle title="Payment Settings" />

          {isAutoPayExpired && (
            <MessageBox
              title="AutoPay (Expired)"
              subtitle="Your AutoPay payment method is expired, please add a new payment method"
              className={MessageBoxTypes.danger}
            />
          )}

          {apiErrorMessage && <WarningMessage message={apiErrorMessage} type="error" />}

          <PaymentMethods className="sm:rounded-md mb-5" paymentMethods={paymentMethods || []} showButtons isSelectionEnabled={false} />

          <AutoPaySettings
            customerAutoPaySettings={customerAutoPaySettings}
            nextPaymentAmount={nextPaymentAmount}
            isOnMonthlyBilling={!!customerInfo?.isOnMonthlyBilling}
            isMonthlyBillingEnabled={isMonthlyBillingEnabled}
          />
        </>
      )}
    </>
  );
};

export default PaymentSettingsPage;
