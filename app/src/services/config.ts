import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { WebAuth } from 'auth0-js';
import set from 'lodash/set';
import { AuthType, Token } from '../constants/auth';

const auth0 = new WebAuth({
  domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
  redirectUri: `${window.location.origin}`,
});

export const baseURL = process.env.REACT_APP_API_URL || 'http://localhost/api/v1';
const aptiveAPI: AxiosInstance = axios.create({
  baseURL,
});

let requestInterceptor: number;
let persistToken: string;
type ConfigRequestTokenProps = { newToken?: string; authType?: string };
export const configRequestToken = ({ newToken, authType }: ConfigRequestTokenProps = {}) => {
  if (requestInterceptor) {
    aptiveAPI.interceptors.request.eject(requestInterceptor);
  }

  if (newToken) {
    persistToken = newToken;
  }

  requestInterceptor = aptiveAPI.interceptors.request.use(
    config => {
      let token = null;
      if (persistToken) {
        token = persistToken;
      } else {
        token = localStorage.getItem(Token.AccessToken)?.replace(/['"]+/g, '') || null;
      }

      if (config.headers && token !== 'null' && token !== null) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (config.headers && authType) {
        config.headers['X-Auth-Type'] = authType;
      }

      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );
};

aptiveAPI.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const status = error?.response?.status;
    const redirectOnInternalErr = error?.response?.config?.headers?.['_client_internal_err_redirect'] !== false;
    const originalRequest = error.config;

    if (status === 403 || status === 401) {
      const authType = error.config.headers['X-Auth-Type'];
      if (authType === AuthType.Auth0) {
        auth0.checkSession(
          {
            responseType: 'token id_token',
            scope: 'openid profile email email_verified',
          },
          (err: any, result: any) => {
            if (err) {
              auth0.logout({
                returnTo: '/',
              });
            } else {
              // Check if the user's email is verified
              if (!result.idTokenPayload.email_verified) {
                window.location.href = '/not-verified';
              } else {
                auth0.logout({
                  returnTo: '/',
                });
              }
            }
          }
        );
      }
      if (authType === AuthType.FusionAuth && !originalRequest._retry && !isRefreshingToken(originalRequest)) {
        return handleRefreshToken(error);
      }
      sessionStorage.removeItem('aptiveUserAccounts');
      localStorage.removeItem(Token.AccessToken);
      sessionStorage.removeItem('aptiveUserData');
      sessionStorage.removeItem('aptiveUser');

      window.location.href = '/logout';
    }

    if (status === 412) {
      window.location.href = '/not-found';
    }

    if (status === 429) {
      window.location.href = '/server-error?error=429';
    }

    if (status === 500 && redirectOnInternalErr) {
      window.location.href = '/server-error';
    }

    return Promise.reject(error);
  }
);

const refreshToken = () => {
  const accessToken = localStorage.getItem(Token.AccessToken);
  const refreshToken = localStorage.getItem(Token.RefreshToken);
  return aptiveAPI.get(`/fusionreauth?refreshToken=${refreshToken}&accessToken=${accessToken}`);
};
const isRefreshingToken = (requestObject: AxiosRequestConfig) => {
  const { url } = requestObject;
  return url?.includes('/fusionreauth?refreshToken');
};

const handleRefreshToken = async (error: AxiosError) => {
  const originalRequest = error.config as AxiosRequestConfig;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  originalRequest['_retry'] = true;
  try {
    const { data } = await refreshToken();
    const accessToken = data.access_token;
    if (accessToken) {
      // Update access token to current and previous requests
      set(aptiveAPI, 'defaults.headers.common.Authorization', `Bearer ${accessToken}`);
      set(originalRequest, 'headers.Authorization', `Bearer ${accessToken}`);
      localStorage.setItem(Token.AccessToken, accessToken);
      localStorage.setItem(Token.RefreshToken, data.refresh_token);
      configRequestToken({ newToken: accessToken || '', authType: AuthType.FusionAuth });

      return aptiveAPI(originalRequest);
    } else {
      throw error;
    }
  } catch (error: AxiosError | unknown) {
    if (error && (error as AxiosError).response?.status === 401) {
      sessionStorage.removeItem('aptiveUserAccounts');
      localStorage.removeItem(Token.AccessToken);
      sessionStorage.removeItem('aptiveUserData');
      sessionStorage.removeItem('aptiveUser');
      localStorage.removeItem('codeVerifier');
    }
    throw error;
  }
};
export default aptiveAPI;
