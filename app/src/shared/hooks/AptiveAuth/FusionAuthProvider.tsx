import React, { PropsWithChildren, useState } from 'react';
import { useMutation } from 'react-query';
import { AuthType, FUSION_AUTH_REDIRECT_URL, Token } from '../../../constants/auth';
import { UseMutateFunction } from 'react-query/types/react/types';
import aptiveAPI from '../../../services/config';

const config = {
  clientId: process.env.REACT_APP_FUSIONAUTH_CLIENT_ID || '7a3583ae-a744-4c51-90e0-abfccf2940ec',
  redirectUri: FUSION_AUTH_REDIRECT_URL,
  serverUrl: process.env.REACT_APP_FUSIONAUTH_SERVER_URL || 'https://fusionauth.dev.goaptive.com',
  shouldAutoFetchUserInfo: true,
  shouldAutoRefresh: true,
};

const generateRandomString = (length: number) => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    randomString += charset[array[i] % charset.length];
  }
  return randomString;
};

const base64URLEncode = (str: ArrayBuffer) => {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(str) as unknown as number[]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};
// Function to hash the code verifier and create code challenge
const sha256 = async (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return await window.crypto.subtle.digest('SHA-256', data);
};

export interface FusionAuthProviderContext {
  /**
   * Whether the user is logged in.
   */
  isLoggedIn: boolean;

  /**
   * Initiates login flow.
   */
  startLogin: () => void;

  /**
   * Initiates logout flow.
   */
  startLogout: () => void;
  isLoadingFusionAuth: boolean;
  getAccessToken: UseMutateFunction<any, unknown, { code: string }, unknown>;
}
export const defaultContext: FusionAuthProviderContext = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  startLogin: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  startLogout: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getAccessToken: () => {},

  isLoggedIn: false,
  isLoadingFusionAuth: false,
};
export const FusionAuthContext = React.createContext<FusionAuthProviderContext>(defaultContext);
const FusionAuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem(Token.AccessToken) !== null);

  const { isLoading: isLoadingFusionAuth, mutate: getAccessToken } = useMutation(
    async ({ code }: { code: string }) => {
      const codeVerifier = localStorage.getItem('codeVerifier');
      const authEndpoint = `/fusionauth?code=${code}&codeVerifier=${codeVerifier}&redirectUri=${encodeURIComponent(
        FUSION_AUTH_REDIRECT_URL
      )}`;

      return aptiveAPI.get(authEndpoint);
    },
    {
      onSuccess: data => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { access_token: accessToken, refresh_token: refreshToken, error } = data.data;
        if (error) {
          throw new Error(error);
        } else {
          localStorage.setItem('authType', AuthType.FusionAuth);
          localStorage.setItem(Token.AccessToken, accessToken);
          localStorage.setItem('aptiveUserRefreshToken', refreshToken);
          setIsLoggedIn(true);
        }
      },
      onError: () => {
        setIsLoggedIn(false);
      },
    }
  );

  const startLogin = async () => {
    const codeVerifier = generateRandomString(128);
    const codeChallenge = base64URLEncode(await sha256(codeVerifier));

    const authorizationUrl = `${config.serverUrl}/oauth2/authorize?client_id=${
      config.clientId
    }&response_type=code&redirect_uri=${encodeURIComponent(
      config.redirectUri
    )}&scope=offline_access&state=b4e81o2iibvqg2aj7uv0qiqr2pm4sigtlqqdf9w4t6cs00qlvt0knhatc6rhr23&code_challenge=${codeChallenge}&code_challenge_method=S256`;

    localStorage.setItem('codeVerifier', codeVerifier);
    localStorage.setItem('authType', AuthType.FusionAuth);

    window.location.href = authorizationUrl;
  };

  const startLogout = () => {
    const logoutUrl = `${config.serverUrl}/oauth2/logout?client_id=${config.clientId}&post_logout_redirect_uri=${encodeURIComponent(
      `${window.location.origin}/logout`
    )}`;
    setTimeout(() => {
      window.localStorage.removeItem('authType');
      window.localStorage.removeItem(Token.AccessToken);
      window.localStorage.removeItem(Token.RefreshToken);
    }, 100);
    window.location.href = logoutUrl;
  };

  const providerValue: FusionAuthProviderContext = {
    startLogin,
    startLogout,
    getAccessToken,
    isLoggedIn,
    isLoadingFusionAuth,
  };

  return <FusionAuthContext.Provider value={providerValue}>{children}</FusionAuthContext.Provider>;
};

export default FusionAuthProvider;
