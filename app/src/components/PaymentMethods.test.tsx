import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PaymentMethods from './PaymentMethods';
import userEvent from '@testing-library/user-event';
import { PaymentMethodProps } from 'components/PaymentMethodItem';
import { TestRoot } from 'config/test/react-query';
import getByTextMatcher from 'shared/test/getTextMatcher';
import { useTrackingClick } from 'shared/hooks/useTrackingClick';
import axios from 'axios';

const mockPaymentMethods: PaymentMethodProps[] = [
  {
    id: '1',
    accountId: 'sampleAccountId1',
    bankName: 'Sample Bank 1',
    isAutoPay: false,
    isExpired: false,
    lastFour: '1234',
    paymentMethodType: 'CC',
    accountType: 'Checking',
    cardType: 'Visa',
  },
  {
    id: '2',
    accountId: 'sampleAccountId2',
    bankName: 'Sample Bank 2',
    isAutoPay: true,
    isExpired: false,
    lastFour: '5678',
    paymentMethodType: 'ACH',
    accountType: 'Savings',
    cardType: '',
  },
];

const mockOnSelectPaymentMethod = jest.fn();
const mockOnError = jest.fn();
const mockTrackClick = jest.fn();
jest.mock('axios');

beforeEach(() => {
  (useTrackingClick as jest.Mock).mockReturnValue({
    trackClick: mockTrackClick,
  });
});
describe('PaymentMethods', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('renders PaymentMethods correctly', () => {
    render(
      <PaymentMethods
        paymentMethods={mockPaymentMethods}
        onSelectPaymentMethod={mockOnSelectPaymentMethod}
        isSelectionEnabled={true}
        showButtons={true}
        onError={mockOnError}
      />,
      { wrapper: TestRoot }
    );

    expect(screen.getByText('Payment Methods')).toBeInTheDocument();

    mockPaymentMethods.forEach(method => {
      expect(screen.getByText(method.bankName)).toBeInTheDocument();
      expect(screen.getByText(method.lastFour)).toBeInTheDocument();
    });

    expect(mockOnError).not.toHaveBeenCalled();
    expect(mockOnSelectPaymentMethod).not.toHaveBeenCalled();

    const removeButton = screen.getAllByText('Remove')[1];
    expect(removeButton).toBeDisabled();
  });

  it('handles selection of a payment method', () => {
    render(
      <PaymentMethods
        paymentMethods={mockPaymentMethods}
        onSelectPaymentMethod={mockOnSelectPaymentMethod}
        isSelectionEnabled={true}
        showButtons={true}
        onError={mockOnError}
      />,
      { wrapper: TestRoot }
    );

    fireEvent.click(screen.getByTestId('1'));

    expect(mockOnSelectPaymentMethod).toHaveBeenCalledWith(mockPaymentMethods[0]);
  });

  it('should call onChange Profile', async () => {
    render(
      <PaymentMethods
        paymentMethods={mockPaymentMethods}
        onSelectPaymentMethod={mockOnSelectPaymentMethod}
        isSelectionEnabled={true}
        showButtons={true}
        onError={mockOnError}
      />,
      { wrapper: TestRoot }
    );

    const nonSelectedProfileCheckbox = screen.getByTestId('1');
    expect((nonSelectedProfileCheckbox as HTMLInputElement).checked).toBeFalsy();
    await userEvent.click(nonSelectedProfileCheckbox);

    expect(mockOnSelectPaymentMethod).toBeCalled();
  });

  it('should show add more message', () => {
    render(
      <PaymentMethods
        paymentMethods={[]}
        onSelectPaymentMethod={mockOnSelectPaymentMethod}
        isSelectionEnabled={true}
        showButtons={true}
        onError={mockOnError}
      />
    );

    expect(screen.getByText('Please add a new payment method to make a payment.')).toBeInTheDocument();
  });

  it('navigates to Add Payment Methods page when Add a Payment Method button is clicked', async () => {
    render(
      <PaymentMethods
        paymentMethods={[mockPaymentMethods[0]]}
        onSelectPaymentMethod={mockOnSelectPaymentMethod}
        isSelectionEnabled={true}
        showButtons={true}
        onError={mockOnError}
      />,
      { wrapper: TestRoot }
    );

    fireEvent.click(screen.getByText(getByTextMatcher('Add a Payment Method')));

    expect(mockTrackClick).toBeCalled();

    (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Simulated error'));

    const removeButton = screen.getByRole('button', { name: /Remove/i });
    fireEvent.click(removeButton);

    const deleteButton = screen.getByRole('button', { name: /Delete Payment Method/i });
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(screen.queryByText('Are you sure you want to remove payment method ending in 7890?')).not.toBeInTheDocument();
      expect(mockOnError).toHaveBeenCalled();
      expect(mockOnSelectPaymentMethod).not.toHaveBeenCalled(); // Assuming there is no selection in this scenario
    });
  });
});
