import { useAuth0 } from '@auth0/auth0-react';
import { AuthType, Token } from '../../../constants/auth';
import useFusionAuth from './useFusionAuth';
import { useAptiveAuthContext } from './AptiveAuthProvider';

export const useAptiveAuth = () => {
  const { useLegacyAuthProvider } = useAptiveAuthContext();
  const authType =
    window.localStorage.getItem('authType') === AuthType.MagicLink
      ? AuthType.MagicLink
      : useLegacyAuthProvider
      ? AuthType.Auth0
      : AuthType.FusionAuth;
  window.localStorage.setItem('authType', authType);

  const { getIdTokenClaims, loginWithRedirect, logout, isAuthenticated, isLoading, user } = useAuth0();
  const { isLoggedIn, isLoadingFusionAuth, startLogin, startLogout } = useFusionAuth();
  if (authType === AuthType.MagicLink) {
    const loginWithRedirect = () => {
      window.localStorage.removeItem('authType');
      window.localStorage.removeItem(Token.AccessToken);
      window.location.href = '/';
    };
    const logout = () => {
      window.localStorage.removeItem('authType');
      window.localStorage.removeItem(Token.AccessToken);
      setTimeout(() => {
        window.location.href = '/logout';
      });
    };

    const getMagicLinkToken = () => window.localStorage.getItem(Token.AccessToken);
    return {
      authType,
      isAuthenticated: true,
      isLoading: false,
      user: {
        email_verified: true,
        email: '',
      },
      getIdTokenClaims: undefined,
      getMagicLinkToken,
      loginWithRedirect,
      logout,
    };
  }
  const loginWithAuth0 = () => {
    return loginWithRedirect({ redirectUri: encodeURI(window.location.origin + '/dashboard') });
  };
  return {
    getIdTokenClaims: useLegacyAuthProvider ? getIdTokenClaims : undefined,
    loginWithRedirect: useLegacyAuthProvider ? loginWithAuth0 : startLogin,
    logout: useLegacyAuthProvider ? logout : startLogout,
    isAuthenticated: useLegacyAuthProvider ? isAuthenticated : isLoggedIn,
    isLoading: useLegacyAuthProvider ? isLoading : isLoadingFusionAuth,
    user: useLegacyAuthProvider ? user : { email_verified: true, email: '' },
    authType: useLegacyAuthProvider ? AuthType.Auth0 : AuthType.FusionAuth,
  };
};
