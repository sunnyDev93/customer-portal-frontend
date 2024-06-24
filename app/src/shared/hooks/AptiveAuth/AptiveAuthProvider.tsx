import React, { PropsWithChildren, useContext } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { createBrowserHistory } from 'history';
import { getConfig } from '../../../config';
import { isUsingMagicLinkAuthen } from '../../../helpers';
import FusionAuthProvider from './FusionAuthProvider';
import { useFeatureFlag } from 'configcat-react';

const config = getConfig();

const onRedirectCallback = (appState: any) => {
  createBrowserHistory().push(appState && appState.returnTo ? appState.returnTo : window.location.pathname);
};

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: `${window.location.origin}`,
  onRedirectCallback,
};

export interface AptiveAuthProviderContext {
  useLegacyAuthProvider: boolean;
  loadingFeatureFlag: boolean;
}
const defaultContext: AptiveAuthProviderContext = {
  useLegacyAuthProvider: false,
  loadingFeatureFlag: true,
};
export const AptiveAuthContext = React.createContext<AptiveAuthProviderContext>(defaultContext);
export const useAptiveAuthContext = () => useContext(AptiveAuthContext);
const AptiveAuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { loading, value: useLegacyAuthProvider } = useFeatureFlag('useLegacyAuth', false);

  if (loading) return <></>;
  return (
    <AptiveAuthContext.Provider value={{ loadingFeatureFlag: loading, useLegacyAuthProvider }}>
      {isUsingMagicLinkAuthen() ? (
        <>{children}</>
      ) : (
        <>
          {useLegacyAuthProvider ? (
            <Auth0Provider {...providerConfig}>{children}</Auth0Provider>
          ) : (
            <FusionAuthProvider>{children}</FusionAuthProvider>
          )}
        </>
      )}
    </AptiveAuthContext.Provider>
  );
};

export default AptiveAuthProvider;
