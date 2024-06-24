import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { TestRoot } from 'config/test/react-query';
import { useFeatureFlag } from 'configcat-react';

import { render, screen, waitFor } from '@testing-library/react';

import PaymentSettings from './index';
import { getCustomerPaymentProfilesResponse } from 'mocks/responseMocks';
import getByTextMatcher from 'shared/test/getTextMatcher';
import { server } from 'mocks/server';
import { getCustomerPaymentProfilesHandler } from 'mocks/mock-handlers';

jest.mock('@auth0/auth0-react', () => ({
  ...jest.requireActual('@auth0/auth0-react'),
  withAuthenticationRequired: (component: React.ReactNode) => component,
}));
jest.mock('configcat-react');

const mockUseFeatureFlag = useFeatureFlag as jest.Mock;
let isOn = true;

describe('PaymentSettings', () => {
  beforeAll(() => {
    mockUseFeatureFlag.mockImplementation(() => {
      return {
        loading: false,
        value: isOn,
      };
    });
  });
  it(`should render correctly`, async () => {
    render(<PaymentSettings />, { wrapper: TestRoot });
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Payment Settings')).toBeInTheDocument());

    Object.values(getCustomerPaymentProfilesResponse).forEach(method => {
      expect(screen.getByText(method.lastFour)).toBeInTheDocument();
    });

    // hide the radio button for selecting payment methods
    expect(screen.queryByTestId('5077613')).not.toBeInTheDocument();
    expect(screen.queryByTestId('5078812')).not.toBeInTheDocument();

    expect(screen.getByText('Auto Pay Settings')).toBeInTheDocument();
    expect(screen.getByText('Manage your automatic settings')).toBeInTheDocument();

    expect(screen.getByText('Automatic Payment')).toBeInTheDocument();
    expect(screen.getByText('Enabled')).toBeInTheDocument();

    expect(screen.getByText('Next Payment Amount')).toBeInTheDocument();
    expect(screen.getByText('$0.00')).toBeInTheDocument();

    expect(screen.getByText('Date of Next Payment')).toBeInTheDocument();
    expect(
      screen.getByText('Payment will be charged at the time of each Treatment according to your Service Agreement')
    ).toBeInTheDocument();

    expect(screen.getByText('Payment Method')).toBeInTheDocument();
    expect(screen.getByText(getByTextMatcher('Visa ending in 1234'))).toBeInTheDocument();
    expect(screen.getByText(/By enabling autopay you authorize Aptive/)).toBeInTheDocument();
  });

  it('should show auto payment method expiration message', async () => {
    server.use(getCustomerPaymentProfilesHandler.withAutoPayExpiredHandler);
    render(<PaymentSettings />, { wrapper: TestRoot });
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('AutoPay (Expired)')).toBeInTheDocument());
  });

  it('should show error message when there is an error', async () => {
    server.use(getCustomerPaymentProfilesHandler.badRequestHandler);
    render(<PaymentSettings />, { wrapper: TestRoot });
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Something went wrong. Please refresh the page and try again.')).toBeInTheDocument());
  });
});
