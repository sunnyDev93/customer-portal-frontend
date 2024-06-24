import { Auth0Context, useAuth0, WithAuthenticationRequiredOptions } from '@auth0/auth0-react';
import React, { ComponentType, FC, useEffect } from 'react';
import { isUsingMagicLinkAuthen } from '../../../helpers';
import LoadingSpinner from '../../../components/LoadingSpinner';
import useFusionAuth from './useFusionAuth';
import { useAptiveAuthContext } from './AptiveAuthProvider';

const defaultOnRedirecting = (): JSX.Element => <></>;

const withThirdPartyProvider = <P extends object>(Component: ComponentType<P>, options: WithAuthenticationRequiredOptions = {}): FC<P> => {
  return function WithThirdPartyProvider(props: P): JSX.Element {
    const { loadingFeatureFlag, useLegacyAuthProvider } = useAptiveAuthContext();

    const { startLogin, isLoggedIn } = useFusionAuth();
    useEffect(() => {
      if (!isLoggedIn && !loadingFeatureFlag && !useLegacyAuthProvider) {
        startLogin();
      }
    }, [isLoggedIn, startLogin, loadingFeatureFlag, useLegacyAuthProvider]);

    const {
      returnTo,
      onRedirecting = defaultOnRedirecting,
      claimCheck = (): boolean => true,
      loginOptions,
      context = Auth0Context,
    } = options;

    const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0(context);

    const routeIsAuthenticated = isAuthenticated && claimCheck(user);

    useEffect(() => {
      if (isLoading || routeIsAuthenticated || loadingFeatureFlag || (!loadingFeatureFlag && !useLegacyAuthProvider)) {
        return;
      }
      const opts = {
        ...loginOptions,
        appState: {
          ...(loginOptions && loginOptions.appState),
          returnTo: typeof returnTo === 'function' ? returnTo() : returnTo,
        },
      };
      (async (): Promise<void> => {
        await loginWithRedirect(opts);
      })();
    }, [isLoading, routeIsAuthenticated, loginWithRedirect, loginOptions, returnTo, loadingFeatureFlag, useLegacyAuthProvider]);

    if (useLegacyAuthProvider) {
      return routeIsAuthenticated ? <Component {...props} /> : onRedirecting();
    }
    return isLoggedIn ? <Component {...props} /> : <LoadingSpinner />;
  };
};

const withAuthenticationRequired = <P extends object>(
  Component: ComponentType<P>,
  options: WithAuthenticationRequiredOptions = {}
): FC<P> => {
  if (isUsingMagicLinkAuthen()) {
    return function WithAuthenticationRequired(props: P): JSX.Element {
      return <Component {...props} />;
    };
  }

  return withThirdPartyProvider(Component, options);
};

export { withAuthenticationRequired };
