import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { withAuthenticationRequired } from '../../shared/hooks/AptiveAuth';
import useLocalStorage from 'use-local-storage';
import LoadingSpinner from 'components/LoadingSpinner';
import { useTrackingView } from 'shared/hooks/useTrackingView';
import useCompleteTransactionSetup from 'pages/WorldPay/hooks/useCompleteTransactionSetup';
import { AuthType, Token } from '../../constants/auth';
import { configRequestToken } from '../../services/config';

export interface CompleteTransactionSetupPayload {
  HostedPaymentStatus: string;
  ValidationCode: string;
  PaymentAccountID?: string;
}

const WorldPayPage = () => {
  const navigate = useNavigate();
  useTrackingView();

  const [searchParams] = useSearchParams();
  const transactionSetupID = searchParams.get('TransactionSetupID') || '';
  const isCancelingPaymentMethod = searchParams.get('HostedPaymentStatus') === 'Cancelled';

  const [aptiveUserPersist] = useLocalStorage('aptiveUserPersist', { accountId: '', email: '' });

  const [transactionData] = useState<CompleteTransactionSetupPayload>({
    HostedPaymentStatus: searchParams.get('HostedPaymentStatus') ?? '',
    ValidationCode: searchParams.get('ValidationCode') ?? '',
    PaymentAccountID: searchParams.get('PaymentAccountID') ?? '',
  });

  const { mutate } = useCompleteTransactionSetup();

  useEffect(() => {
    if (isCancelingPaymentMethod) {
      navigate('/billing/add-payment-methods');
    } else {
      const authType = window.localStorage.getItem('authType');
      if (authType === AuthType.MagicLink) {
        const idToken = window.localStorage.getItem(Token.AccessToken);
        configRequestToken({ newToken: idToken || undefined, authType: AuthType.MagicLink });
      }
      mutate(
        { accountId: aptiveUserPersist?.accountId || '', transactionId: transactionSetupID, payload: transactionData },
        {
          onSuccess: () => navigate('/billing/payment-settings'),
          onError: () => {
            navigate('/billing/payment-settings');
          },
        }
      );
    }
  }, [transactionSetupID, aptiveUserPersist?.accountId, transactionData, mutate, navigate, isCancelingPaymentMethod]);

  return (
    <div data-testid="world-pay" className="w-full flex items-center justify-center pt-14">
      <div>
        {!isCancelingPaymentMethod && <h1>Please be patient, we are saving your data now</h1>}

        <LoadingSpinner className="mt-5" centered />
      </div>
    </div>
  );
};

export default withAuthenticationRequired(WorldPayPage, {
  onRedirecting: () => <LoadingSpinner centered />,
});
