import { useEffect, useState } from 'react';
import { aptiveUserState } from 'app-recoil/atoms/auth/aptive-user';
import { useRecoilState, useSetRecoilState } from 'recoil';
import aptiveAPI, { configRequestToken } from 'services/config';
import { aptiveUserAccountsState } from 'app-recoil/atoms/auth/aptive-user-accounts';
import { aptiveUserTokenState } from 'app-recoil/atoms/auth/aptive-user-token';
import { aptiveUserDataState } from 'app-recoil/atoms/auth/aptive-user-data';
import useSessionStorageState from 'use-session-storage-state';
import useLocalStorage from 'use-local-storage';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useGetCustomerInfo } from 'shared/hooks/useGetCustomerInfo';
import { customerInfoDataState } from 'app-recoil/atoms/customer-info';
import { generateApiUrlByVersion } from 'services/CustomerService';
import { useFeatureFlag } from 'configcat-react';
import { useAptiveAuth } from './AptiveAuth';
import { AuthType, Token } from '../../constants/auth';

export default function useAuth() {
  const navigate = useNavigate();
  const { authType, getIdTokenClaims, loginWithRedirect, isAuthenticated, isLoading: auth0Loading } = useAptiveAuth();
  const { value: useLegacyPaymentProvider, loading: isLoadingFeatureFlag } = useFeatureFlag('useLegacyPaymentProvider', false);

  const [token, setToken] = useState('');
  const [aptiveUserIndex, setAptiveUserIndex] = useSessionStorageState<number>('aptiveUserIndex', { defaultValue: 0 });
  const [aptiveUserPersist, setAptiveUserPersist] = useLocalStorage('aptiveUserPersist', { accountId: '', email: '' });
  const [aptiveUser, setAptiveUser] = useRecoilState(aptiveUserState);
  const setAptiveUserAccounts = useSetRecoilState(aptiveUserAccountsState);
  const setAptiveUserToken = useSetRecoilState(aptiveUserTokenState);
  const setAptiveUserData = useSetRecoilState(aptiveUserDataState);
  const setCustomerInfoData = useSetRecoilState(customerInfoDataState);

  const { isLoading, refetch: refetchAuthInfo } = useQuery(
    ['getUserAccounts', useLegacyPaymentProvider, isLoadingFeatureFlag],
    async () => {
      if (isLoadingFeatureFlag) return null;
      let idToken;
      if (authType === AuthType.MagicLink || authType === AuthType.FusionAuth) {
        idToken = window.localStorage.getItem(Token.AccessToken);
      } else if (authType === AuthType.Auth0) {
        idToken = (await getIdTokenClaims?.())?.__raw;
      }

      configRequestToken({ newToken: idToken || '', authType });

      if (idToken || authType === AuthType.FusionAuth) {
        const { data } = await aptiveAPI.get(
          `${generateApiUrlByVersion(useLegacyPaymentProvider ? 1 : 2)}/${useLegacyPaymentProvider ? 'user' : 'customer'}/accounts`
        );

        if (data.data.length === 0) {
          navigate('/empty-account-page', { replace: true });
        }
        const selectedAccount = data.data[aptiveUserIndex] ? data.data[aptiveUserIndex] : data.data[0];
        const accountId = selectedAccount.id;
        const firstName = selectedAccount.attributes.firstName;
        const lastName = selectedAccount.attributes.lastName;
        const email = selectedAccount.attributes.email;

        const user = {
          accountId,
          firstName,
          lastName,
          email,
        };

        setAptiveUser(user);
        setAptiveUserAccounts(data.data);
        setAptiveUserData(selectedAccount.attributes);
        setAptiveUserPersist({ accountId, email });
        if (idToken) {
          setAptiveUserToken(idToken);
          setToken(idToken);
        }
        return data;
      }
      return null;
    },
    {
      enabled: isAuthenticated && !isLoadingFeatureFlag,
    }
  );

  const { isLoading: isLoadingFetchCustomerById, refetch: refetchCustomerById } = useGetCustomerInfo(aptiveUserPersist?.accountId, {
    enabled: isAuthenticated && !!token && !!aptiveUserPersist?.accountId && !isLoadingFeatureFlag,
    onSuccess: data => {
      setCustomerInfoData(data);
    },
  });

  useEffect(() => {
    if (!isAuthenticated && !auth0Loading) {
      loginWithRedirect?.();
    }
  }, [isAuthenticated, auth0Loading, loginWithRedirect]);

  return { isLoading, refetchAuthInfo, refetchCustomerById, isLoadingFetchCustomerById };
}
