import { useMutation } from 'react-query';
import { completeTransactionSetup } from 'services/CustomerService';
import { CompleteTransactionSetupPayload } from 'pages/WorldPay/index';
import { useAptiveAuth } from 'shared/hooks/AptiveAuth';
import { AuthType, Token } from '../../../constants/auth';

const useCompleteTransactionSetup = () => {
  const { getIdTokenClaims, authType } = useAptiveAuth();

  return useMutation(
    async ({
      accountId,
      transactionId,
      payload,
    }: {
      accountId: string;
      transactionId: string;
      payload: CompleteTransactionSetupPayload;
    }) => {
      let idToken;
      if (authType === AuthType.MagicLink || authType === AuthType.FusionAuth) {
        idToken = window.localStorage.getItem(Token.AccessToken);
      } else if (authType === AuthType.Auth0) {
        idToken = (await getIdTokenClaims?.())?.__raw;
      }

      return completeTransactionSetup(accountId, transactionId, payload, idToken || '', localStorage.getItem('authType') || '');
    }
  );
};

export default useCompleteTransactionSetup;
