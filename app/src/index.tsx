import React from 'react';
import { createRoot } from 'react-dom/client';
import FullStory from 'react-fullstory';
import { ConfigCatProvider } from 'configcat-react';

import { createBrowserHistory } from 'history';

import { BrowserRouter as Router, Routes } from 'react-router-dom';

import { getConfig } from 'config';

import './index.scss';
import {
  authLayoutRoute,
  mainLayoutRoute,
  authRoute,
  renderSiteMap,
  magicLinkRoute,
  magicLinkExpiredRoute,
  fusionAuthRedirectRoute,
} from 'routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MyAccountRoot } from 'routes/my-account';
import { RecoilRoot } from 'recoil';
import TrackingReporter from 'components/TrackingReporter';
import AptiveAuthProvider from './shared/hooks/AptiveAuth/AptiveAuthProvider';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: 1000,
    },
  },
});

if (process.env.REACT_APP_API_MOCKING === 'enabled') {
  require('./mocks');
}

const onRedirectCallback = (appState: any) => {
  createBrowserHistory().push(appState && appState.returnTo ? appState.returnTo : window.location.pathname);
};

const config = getConfig();

const initializeRecoilState = (initialRecoilState: any) => () => {
  return initializeRecoilState;
};

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: `${window.location.origin}${MyAccountRoot.path}`,
  onRedirectCallback,
};

const FULLSTORY_ORG_ID = process.env.REACT_APP_FULLSTORY_ORG_ID || '';

// ConfigCat
const CONFIGCAT_SDK_KEY = process.env.REACT_APP_CONFIGCAT_SDK_KEY || '';

const container = document.getElementById('root-app');
const root = createRoot(container!); // Create a root.

root.render(
  <QueryClientProvider client={queryClient}>
    <ConfigCatProvider sdkKey={CONFIGCAT_SDK_KEY}>
      <AptiveAuthProvider>
        <RecoilRoot initializeState={initializeRecoilState({})}>
          {process.env.NODE_ENV === 'production' ? <FullStory org={FULLSTORY_ORG_ID} /> : null}
          <TrackingReporter />
          <Router>
            <Routes>
              {renderSiteMap({
                magicLinkRoute,
                fusionAuthRedirectRoute,
                magicLinkExpiredRoute,
                authRoute,
                authLayoutRoute,
                mainLayoutRoute,
              })}
            </Routes>
          </Router>
        </RecoilRoot>
      </AptiveAuthProvider>
    </ConfigCatProvider>
  </QueryClientProvider>
);
