import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TestRoot } from 'config/test/react-query';
import { useFeatureFlag } from 'configcat-react';
import { createCustomerPaymentProfilesHandler } from 'mocks/mock-handlers';
import { getCustomerPaymentProfilesResponse } from 'mocks/responseMocks';
import { server } from 'mocks/server';
import MakePaymentPage from './MakePaymentPage';

jest.mock('../../shared/hooks/AptiveAuth', () => ({
  ...jest.requireActual('../../shared/hooks/AptiveAuth'),
  withAuthenticationRequired: (component: React.ReactNode) => component,
}));

jest.mock('configcat-react');

const mockUseFeatureFlag = useFeatureFlag as jest.Mock;
const isOn = true;

const { reload } = window.location;

const getTotalBalanceRadio = () => screen.getByTestId('total-balance') as HTMLInputElement;
const getFirstPaymentMethodRadio = () => screen.getByTestId('5077613') as HTMLInputElement;
const getSubmitButton = () => screen.getByRole('button', { name: 'Submit Payment' });
const getContinueButton = () => screen.getByRole('button', { name: 'Continue with Payment' });
const getDoneButton = () => screen.getByRole('button', { name: 'Done' });
const makePayment = () => {
  const submitButton = getSubmitButton();
  expect(submitButton).not.toBeEnabled();

  // select the radio buttons
  const totalBalanceRadio = getTotalBalanceRadio();
  const firstPaymentMethodRadio = getFirstPaymentMethodRadio();

  fireEvent.click(totalBalanceRadio);
  fireEvent.click(firstPaymentMethodRadio);

  expect(submitButton).toBeEnabled();
  fireEvent.click(submitButton);
};

describe('MakePayment', () => {
  beforeAll(() => {
    mockUseFeatureFlag.mockImplementation(() => {
      return {
        loading: false,
        value: isOn,
      };
    });
  });

  beforeEach(() => {
    window.location.reload = jest.fn();
  });
  afterAll(() => {
    window.location.reload = reload;
  });

  it(`should reload page after making payment successful`, async () => {
    render(<MakePaymentPage />, { wrapper: TestRoot });

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(await screen.findByTestId('total-balance')).toBeInTheDocument();
    expect(screen.getByText('Total Balance')).toBeInTheDocument();
    expect(screen.getByText('$350.50')).toBeInTheDocument();
    expect(screen.getByTestId('other-amount-input')).toBeInTheDocument();

    makePayment();

    const confirmPaymentModalTitle = await screen.findByText('Confirm Payment');
    expect(confirmPaymentModalTitle).toBeInTheDocument();
    fireEvent.click(getContinueButton());

    const successModalTitle = await screen.findByText('Success');
    expect(successModalTitle).toBeInTheDocument();
    expect(getDoneButton()).toBeInTheDocument();
    fireEvent.click(getDoneButton());
    expect(window.location.reload).not.toBeCalled();
  });

  it(`should render correctly`, async () => {
    render(<MakePaymentPage />, { wrapper: TestRoot });

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(await screen.findByTestId('total-balance')).toBeInTheDocument();
    expect(screen.getByText('Total Balance')).toBeInTheDocument();
    expect(screen.getByText('$350.50')).toBeInTheDocument();
    expect(screen.getByTestId('other-amount-input')).toBeInTheDocument();
    Object.values(getCustomerPaymentProfilesResponse).forEach(method => {
      expect(screen.getByText(method.lastFour)).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: 'Submit Payment' })).toBeInTheDocument();
  });

  it(`should reload page after making payment unsuccessful with Payment Required error`, async () => {
    server.use(createCustomerPaymentProfilesHandler.paymentRequiredErrorHandler);
    render(<MakePaymentPage />, { wrapper: TestRoot });
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(await screen.findByTestId('total-balance')).toBeInTheDocument();

    makePayment();

    const confirmPaymentModalTitle = await screen.findByText('Confirm Payment');
    expect(confirmPaymentModalTitle).toBeInTheDocument();
    fireEvent.click(getContinueButton());

    await screen.findByText('The payment has failed, please use another payment method');
  });

  it(`should reload page after making payment unsuccessful with bad request error`, async () => {
    server.use(createCustomerPaymentProfilesHandler.badRequestErrorHandler);
    render(<MakePaymentPage />, { wrapper: TestRoot });
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(await screen.findByTestId('total-balance')).toBeInTheDocument();

    makePayment();

    const confirmPaymentModalTitle = await screen.findByText('Confirm Payment');
    expect(confirmPaymentModalTitle).toBeInTheDocument();
    fireEvent.click(getContinueButton());

    await screen.findByText('Request failed with status code 400');
  });
});
