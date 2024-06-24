import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddACHPaymentMethodForm } from './index';
import { TestRoot } from '../../config/test/react-query';

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

describe('AddACHPaymentMethodForm component', () => {
  it('should have title Billing Address displated on screen', async () => {
    render(<AddACHPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />, {
      wrapper: TestRoot,
    });
    expect(screen.getByText('Billing Address')).toBeInTheDocument();
  });
  it('should have title Account Information displated on screen', async () => {
    render(<AddACHPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />, {
      wrapper: TestRoot,
    });

    expect(screen.getByText('Account Information')).toBeInTheDocument();
  });

  it(`should have title terms of use text displated on screen`, async () => {
    render(<AddACHPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />, {
      wrapper: TestRoot,
    });

    const useTerm = screen.getByTestId('description').innerHTML;
    expect(useTerm.toString().indexOf(descriptionText)).not.toBe(-1);
  });

  it(`should always have billing name block`, async () => {
    render(<AddACHPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />, {
      wrapper: TestRoot,
    });

    const element = screen.queryByTestId('billing_name');
    expect(element).toBeInTheDocument();
  });

  it(`should always have billing address 1 block`, async () => {
    render(<AddACHPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />, {
      wrapper: TestRoot,
    });

    const element = screen.queryByTestId('billing_address_line_1');
    expect(element).toBeInTheDocument();
  });

  it(`should always have billing address 2 block`, async () => {
    render(<AddACHPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />, {
      wrapper: TestRoot,
    });

    const element = screen.queryByTestId('billing_address_line_2');
    expect(element).toBeInTheDocument();
  });

  it(`should always have billing city block`, async () => {
    render(<AddACHPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />, {
      wrapper: TestRoot,
    });

    const element = screen.queryByTestId('billing_city');
    expect(element).toBeInTheDocument();
  });

  it(`should always have billing state block`, async () => {
    render(<AddACHPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />, {
      wrapper: TestRoot,
    });

    const element = screen.queryByTestId('billing_state');
    expect(element).toBeInTheDocument();
  });

  it(`should always have bank name block`, async () => {
    render(<AddACHPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />, {
      wrapper: TestRoot,
    });

    const element = screen.queryByTestId('bank_name');
    expect(element).toBeInTheDocument();
  });

  it(`should always have routing number block`, async () => {
    render(<AddACHPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />, {
      wrapper: TestRoot,
    });

    const element = screen.queryByTestId('routing_number');
    expect(element).toBeInTheDocument();
  });

  it(`should always have account number block`, async () => {
    render(<AddACHPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />, {
      wrapper: TestRoot,
    });

    const element = screen.queryByTestId('account_number');
    expect(element).toBeInTheDocument();
  });

  it(`should always have account number confirmation block`, async () => {
    render(<AddACHPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />, {
      wrapper: TestRoot,
    });

    const element = screen.queryByTestId('account_number_confirmation');
    expect(element).toBeInTheDocument();
  });

  it(`should always have account type block`, async () => {
    render(<AddACHPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />, {
      wrapper: TestRoot,
    });

    const element = screen.queryByTestId('account_type');
    expect(element).toBeInTheDocument();
  });

  it(`should always have auto pay block`, async () => {
    render(<AddACHPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />, {
      wrapper: TestRoot,
    });

    const element = screen.queryByTestId('auto_pay');
    expect(element).toBeInTheDocument();
  });

  it(`should always have a Save Button`, async () => {
    render(<AddACHPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />, {
      wrapper: TestRoot,
    });

    const element = screen.queryByTestId('save-button');
    expect(element).toBeInTheDocument();
  });

  it(`should always have a a link to redirect to Add Credit Card`, async () => {
    render(<AddACHPaymentMethodForm setShowForm={mockSetShowForm} paymentMethod={mockPaymentMethod} />, {
      wrapper: TestRoot,
    });

    const element = screen.queryByTestId('add_credit_card');
    expect(element).toBeInTheDocument();
  });
});
