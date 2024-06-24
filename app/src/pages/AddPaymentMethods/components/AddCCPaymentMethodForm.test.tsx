import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddCCPaymentMethodForm from './AddCCPaymentMethodForm';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { CONFIGCAT_SDK_KEY, queryClient } from 'config/test/react-query';
import { ConfigCatProvider } from 'configcat-react';

const mockSetShowForm = jest.fn();
const mockPaymentMethod = {
  customer_id: '8885253',
  billing_name: 'HOANG VAN CUONG',
  billing_address_line_1: 'Bac Giang Vietnam',
  billing_address_line_2: 'Hanoi Vietnam',
  billing_city: 'Hanoi',
  billing_state: 'Nam Tu Liem',
  billing_zip: '000000',
  bank_name: 'ACB',
  routing_number: 'routing number',
  account_number: '123525125112',
  account_number_confirmation: '123525125112',
  check_type: 1,
  account_type: 1,
  auto_pay: false,
};

const descriptionText =
  'By enabling autopay you authorize Aptive or its assignee(s) to charge the amount indicated above to this account at the time of each treatment';

describe('AddCCPaymentMethodForm component', () => {
  it('should have title Credit Card Billing Address displated on screen', async () => {
    render(
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ConfigCatProvider sdkKey={CONFIGCAT_SDK_KEY}>
            <BrowserRouter>
              <AddCCPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />
            </BrowserRouter>
          </ConfigCatProvider>
        </QueryClientProvider>
      </RecoilRoot>
    );

    expect(screen.getByText('Credit Card Billing Address')).toBeInTheDocument();
  });

  it(`should always have billing name block`, async () => {
    render(
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ConfigCatProvider sdkKey={CONFIGCAT_SDK_KEY}>
            <BrowserRouter>
              <AddCCPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />
            </BrowserRouter>
          </ConfigCatProvider>
        </QueryClientProvider>
      </RecoilRoot>
    );

    const element = screen.queryByTestId('billing_name');
    expect(element).toBeInTheDocument();
  });

  it(`should always have billing zip block`, async () => {
    render(
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ConfigCatProvider sdkKey={CONFIGCAT_SDK_KEY}>
            <BrowserRouter>
              <AddCCPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />
            </BrowserRouter>
          </ConfigCatProvider>
        </QueryClientProvider>
      </RecoilRoot>
    );

    const element = screen.queryByTestId('billing_zip');
    expect(element).toBeInTheDocument();
  });

  it(`should always have billing address 1 block`, async () => {
    render(
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ConfigCatProvider sdkKey={CONFIGCAT_SDK_KEY}>
            <BrowserRouter>
              <AddCCPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />
            </BrowserRouter>
          </ConfigCatProvider>
        </QueryClientProvider>
      </RecoilRoot>
    );

    const element = screen.queryByTestId('billing_address_line_1');
    expect(element).toBeInTheDocument();
  });

  it(`should have title terms of use text displated on screen`, async () => {
    render(
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ConfigCatProvider sdkKey={CONFIGCAT_SDK_KEY}>
            <BrowserRouter>
              <AddCCPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />
            </BrowserRouter>
          </ConfigCatProvider>
        </QueryClientProvider>
      </RecoilRoot>
    );

    const useTerm = screen.getByTestId('description').innerHTML;
    expect(useTerm.toString().indexOf(descriptionText)).not.toBe(-1);
  });

  it(`should always have billing address 2 block`, async () => {
    render(
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ConfigCatProvider sdkKey={CONFIGCAT_SDK_KEY}>
            <BrowserRouter>
              <AddCCPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />
            </BrowserRouter>
          </ConfigCatProvider>
        </QueryClientProvider>
      </RecoilRoot>
    );

    const element = screen.queryByTestId('billing_address_line_2');
    expect(element).toBeInTheDocument();
  });

  it(`should always have billing city block`, async () => {
    render(
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ConfigCatProvider sdkKey={CONFIGCAT_SDK_KEY}>
            <BrowserRouter>
              <AddCCPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />
            </BrowserRouter>
          </ConfigCatProvider>
        </QueryClientProvider>
      </RecoilRoot>
    );

    const element = screen.queryByTestId('billing_city');
    expect(element).toBeInTheDocument();
  });

  it(`should always have billing state block`, async () => {
    render(
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ConfigCatProvider sdkKey={CONFIGCAT_SDK_KEY}>
            <BrowserRouter>
              <AddCCPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />
            </BrowserRouter>
          </ConfigCatProvider>
        </QueryClientProvider>
      </RecoilRoot>
    );

    const element = screen.queryByTestId('billing_state');
    expect(element).toBeInTheDocument();
  });

  it(`should always have auto pay block`, async () => {
    render(
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ConfigCatProvider sdkKey={CONFIGCAT_SDK_KEY}>
            <BrowserRouter>
              <AddCCPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />
            </BrowserRouter>
          </ConfigCatProvider>
        </QueryClientProvider>
      </RecoilRoot>
    );

    const element = screen.queryByTestId('auto_pay');
    expect(element).toBeInTheDocument();
  });

  it(`should always have a Save Button`, async () => {
    render(
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ConfigCatProvider sdkKey={CONFIGCAT_SDK_KEY}>
            <BrowserRouter>
              <AddCCPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />
            </BrowserRouter>
          </ConfigCatProvider>
        </QueryClientProvider>
      </RecoilRoot>
    );

    const element = screen.queryByTestId('save-button');
    expect(element).toBeInTheDocument();
  });

  it(`should always have a a link to redirect to Add an ACH Instead`, async () => {
    render(
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ConfigCatProvider sdkKey={CONFIGCAT_SDK_KEY}>
            <BrowserRouter>
              <AddCCPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />
            </BrowserRouter>
          </ConfigCatProvider>
        </QueryClientProvider>
      </RecoilRoot>
    );

    const element = screen.queryByTestId('add_ach');
    expect(element).toBeInTheDocument();
  });
});
