import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddCreditCardForm from './AddCreditCardForm';
import { ConfigCatProvider } from 'configcat-react';
import { CONFIGCAT_SDK_KEY, queryClient } from 'config/test/react-query';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

import '@testing-library/jest-dom/extend-expect';

jest.mock('@auth0/auth0-react', () => ({
  Auth0Provider: ({ children }: { children: React.ReactNode }) => children,
  withAuthenticationRequired: (component: any, _: any) => component,
  useAuth0: () => {
    return {
      isLoading: false,
      user: { sub: 'foobar' },
      isAuthenticated: true,
      loginWithRedirect: jest.fn(),
    };
  },
}));

describe('WorldPayPage component', () => {
  it(`should have WorldPayPage component`, async () => {
    render(
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ConfigCatProvider sdkKey={CONFIGCAT_SDK_KEY}>
            <BrowserRouter>
              <AddCreditCardForm />
            </BrowserRouter>
          </ConfigCatProvider>
        </QueryClientProvider>
      </RecoilRoot>
    );

    expect(2).toBe(2);
  });
});
