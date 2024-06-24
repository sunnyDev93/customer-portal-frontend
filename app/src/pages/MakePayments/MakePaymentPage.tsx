import React, { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { withAuthenticationRequired } from '../../shared/hooks/AptiveAuth';
import Button from 'shared/components/Button';
import LoadingSpinner from 'components/LoadingSpinner';
import AptiveMessageModal from 'components/modals/AptiveMessageModal';
import AptiveModal from 'components/modals/AptiveModal';
import PageTitle from 'components/PageTitle';
import WarningMessage from 'components/WarningMessage';
import { getCardType, toDollars } from 'helpers';
import SelectAmount from 'pages/MakePayments/components/SelectAmount';
import { useCreateCustomerPayment } from 'pages/MakePayments/hooks/useCreateCustomerPayment';
import { useGetCustomerPaymentProfilesWrapper } from 'shared/hooks/useGetCustomerPaymentProfiles';
import { useRecoilValue } from 'recoil';
import aptiveUserAccountId from 'app-recoil/selectors/aptive-user-account-id';
import { useTrackingClick } from 'shared/hooks/useTrackingClick';
import { customerInfoDataState } from 'app-recoil/atoms/customer-info';
import { useTrackingView } from '../../shared/hooks/useTrackingView';
import useAuth from 'shared/hooks/useAuth';
import { useFeatureFlag } from 'configcat-react';
import PaymentMethods from 'components/PaymentMethods';
import { PaymentMethodProps } from 'components/PaymentMethodItem';

export enum AmountType {
  Full = 'full',
  Other = 'other',
}

const MakePaymentPage = () => {
  const { value: useLegacyPaymentProvider, loading: isUseLegacyPaymentProviderLoading } = useFeatureFlag('useLegacyPaymentProvider', false);
  const accountId = useRecoilValue(aptiveUserAccountId);
  const { isLoadingFetchCustomerById, isLoading, refetchCustomerById } = useAuth();
  const [isLoadingDone, setIsLoadingDone] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const navigate = useNavigate();

  const [amount, setAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmPaymentDialog, setShowConfirmPaymentDialog] = useState(false);
  const [showPaymentSuccessDialog, setShowPaymentSuccessDialog] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodProps | undefined>(undefined);
  const [amountType, setAmountType] = useState<AmountType.Full | AmountType.Other | null>(null);

  const { trackClick } = useTrackingClick();

  useTrackingView();
  const canSubmit = useMemo(() => amount && selectedPaymentMethod, [amount, selectedPaymentMethod]);

  const {
    data: paymentMethods,
    isLoading: isGettingCustomerPaymentProfiles,
    error: paymentMethodsError,
  } = useGetCustomerPaymentProfilesWrapper(accountId, {
    statuses: ['valid', 'failed'],
  });

  const customerInfo = useRecoilValue(customerInfoDataState);

  const handleSubmitSuccess = () => {
    setShowPaymentSuccessDialog(true);
    setShowConfirmPaymentDialog(false);
  };

  const handleSubmitError = (err: AxiosError) => {
    setShowConfirmPaymentDialog(false);
    if (err.response?.status === 402) {
      setErrorMessage('The payment has failed, please use another payment method');
    } else {
      setErrorMessage(err.message);
    }
  };

  const { isSubmittingForm, createCustomerPaymentMutation } = useCreateCustomerPayment(useLegacyPaymentProvider ? 1 : 2);

  const submitForm = () => {
    const payload = useLegacyPaymentProvider
      ? {
          amount_cents: amount,
          payment_method: selectedPaymentMethod?.paymentMethodType,
          payment_profile_id: selectedPaymentMethod?.id ? Number(selectedPaymentMethod.id) : 0,
        }
      : {
          amount_cents: amount,
          payment_method_id: selectedPaymentMethod?.id || null,
        };

    createCustomerPaymentMutation(
      { accountId, payload },
      {
        onSuccess: handleSubmitSuccess,
        onError: handleSubmitError,
      }
    );
  };

  const reloadPage = async () => {
    navigate('/billing/make-payments');
    setAmountType(null);
    setSelectedPaymentMethod(undefined);
    setIsLoadingDone(true);
    await refetchCustomerById();
    setIsLoadingDone(false);
    setShowPaymentSuccessDialog(false);
    setIsPaymentDone(true);
  };

  const handleOnSubmit = () => {
    if (canSubmit) {
      trackClick('submit_payment/from/methods');
      setShowConfirmPaymentDialog(true);
    }
  };

  return (
    <>
      <PageTitle title="Make a Payment" />

      {errorMessage && <WarningMessage type="error" message={errorMessage} />}
      {isPaymentDone && (
        <div className="mb-[16px]">
          <WarningMessage
            onClose={() => setIsPaymentDone(false)}
            type="checked"
            message="Payment Successful"
            isCloseable
            description="Your payment has been successfully processed. It may take a short while for the updated balance to reflect in your account."
          />
        </div>
      )}

      {isGettingCustomerPaymentProfiles || isUseLegacyPaymentProviderLoading || isLoading || isLoadingFetchCustomerById ? (
        <LoadingSpinner centered />
      ) : (
        <div id="main-wrapper">
          <SelectAmount
            amountType={amountType}
            setAmountType={setAmountType}
            totalBalance={customerInfo?.balanceCents || 0}
            onChangeAmount={(updatedAmount: number) => setAmount(updatedAmount)}
          />
          <div className="">
            <div className="bg-white overflow-hidden sm:rounded-md border border-gray-300 mb-5">
              <PaymentMethods
                paymentMethods={paymentMethods || []}
                showButtons={false}
                isSelectionEnabled
                onSelectPaymentMethod={setSelectedPaymentMethod}
                selectedPaymentMethod={selectedPaymentMethod}
              />

              <div className="col-span-12 p-4 sm:block flex justify-center items-center">
                <Button label="Submit Payment" onClick={handleOnSubmit} color="primary" disabled={!canSubmit} />
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedPaymentMethod && showConfirmPaymentDialog && (
        <AptiveModal
          title="Confirm Payment"
          subTitle={
            <div>
              Amount: <span className="fs-exclude">{toDollars(amount / 100)}</span>
            </div>
          }
          description={
            <div>
              Source: {selectedPaymentMethod?.bankName ? selectedPaymentMethod.bankName + ' - ' : ''}
              {getCardType(selectedPaymentMethod)} - ******
              <span className="fs-exclude">{selectedPaymentMethod?.lastFour}</span>
            </div>
          }
          approveButtonText="Continue with Payment"
          approveButtonColor="primary"
          isOpen={showConfirmPaymentDialog}
          setOpen={setShowConfirmPaymentDialog}
          isLoading={isSubmittingForm}
          confirmCallback={submitForm}
          trackingInfo={{ name: 'payment_popup', buttonApproval: 'continue_with_payment', buttonCancel: 'cancel' }}
        />
      )}

      {showPaymentSuccessDialog && (
        <AptiveMessageModal
          title="Success"
          description="Your payment has been submitted"
          approveButtonText="Done"
          approveButtonColor="primary"
          isOpen={showPaymentSuccessDialog}
          setOpen={setShowPaymentSuccessDialog}
          confirmCallback={reloadPage}
          isLoading={isLoadingFetchCustomerById || isLoading || isLoadingDone}
          trackingInfo={{ name: 'payment_popup', buttonApproval: 'done', buttonCancel: 'cancel' }}
        />
      )}
    </>
  );
};

export default withAuthenticationRequired(MakePaymentPage, {
  onRedirecting: () => <LoadingSpinner data-testid="payment-page-loader" centered />,
});
