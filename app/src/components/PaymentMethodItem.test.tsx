import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { PaymentMethodItem, PaymentMethodProps } from './PaymentMethodItem';
import { useRemovePaymentProfile } from '../../src/pages/PaymentSettings/hooks/useRemovePaymentProfile';
import { TestRoot } from 'config/test/react-query';
import getByTextMatcher from 'shared/test/getTextMatcher';

jest.mock('../../src/pages/PaymentSettings/hooks/useRemovePaymentProfile');

const removePaymentProfileMutate = jest.fn();

const paymentMethod: PaymentMethodProps = {
  id: '1',
  accountId: '123',
  bankName: 'Sample Bank',
  isAutoPay: false,
  isExpired: false,
  lastFour: '1234',
  paymentMethodType: 'CC',
  accountType: 'Checking',
  cardType: 'Visa',
};
const onError = jest.fn();
const onSelectPaymentMethod = jest.fn();
const autoPayId = 1;

describe('PaymentMethodItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRemovePaymentProfile as jest.Mock).mockReturnValue({
      isLoading: false,
      removePaymentProfileMutate,
    });
  });

  it('should render payment method details', () => {
    render(
      <PaymentMethodItem
        paymentMethod={paymentMethod}
        onError={onError}
        isSelectionEnabled={true}
        showButtons={true}
        onSelectPaymentMethod={onSelectPaymentMethod}
      />
    );

    expect(screen.getByTestId('1')).toBeInTheDocument();
    expect(screen.getByText('Sample Bank')).toBeInTheDocument();
    expect(screen.getByText(getByTextMatcher('Visa - ****** 1234'))).toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('1'));
    expect(onSelectPaymentMethod).toHaveBeenCalledWith(paymentMethod);
  });

  it('should show card expired message if payment method is expired', () => {
    const expiredPaymentMethod = { ...paymentMethod, isExpired: true };
    render(
      <PaymentMethodItem
        paymentMethod={expiredPaymentMethod}
        onError={onError}
        isSelectionEnabled={true}
        showButtons={true}
        onSelectPaymentMethod={onSelectPaymentMethod}
      />,
      { wrapper: TestRoot }
    );

    const cardExpired = screen.getByText(/Card Expired/i);

    expect(cardExpired).toBeInTheDocument();
  });

  it('should disable remove button if payment method id is same as autoPayId', () => {
    render(
      <PaymentMethodItem
        paymentMethod={{ ...paymentMethod, isAutoPay: true }}
        onError={onError}
        isSelectionEnabled={true}
        showButtons={true}
        onSelectPaymentMethod={onSelectPaymentMethod}
      />,
      { wrapper: TestRoot }
    );

    const removeButton = screen.getByRole('button', { name: /Remove/i });

    expect(removeButton).toBeDisabled();
  });

  it('should open remove payment method modal when remove button is clicked', async () => {
    render(
      <PaymentMethodItem
        paymentMethod={paymentMethod}
        onError={onError}
        isSelectionEnabled={true}
        showButtons={true}
        onSelectPaymentMethod={onSelectPaymentMethod}
      />,
      { wrapper: TestRoot }
    );

    const removeButton = screen.getByRole('button', { name: /Remove/i });
    act(() => {
      fireEvent.click(removeButton);
    });
    const modalTitle = await waitFor(() => screen.queryByTestId('modal-title'));
    const deleteButton = screen.getByRole('button', { name: /Delete Payment Method/i });

    expect(modalTitle?.textContent).toBe('Are you sure you want to remove payment method ending in 1234?');
    expect(deleteButton).toBeInTheDocument();
  });

  it('closes the confirmation modal when the remove button is clicked', async () => {
    const { getByText, queryByText } = render(
      <PaymentMethodItem
        paymentMethod={paymentMethod}
        onError={onError}
        isSelectionEnabled={true}
        showButtons={true}
        onSelectPaymentMethod={onSelectPaymentMethod}
      />,
      {
        wrapper: TestRoot,
      }
    );
    const removeButton = getByText('Remove');

    fireEvent.click(removeButton);

    const cancelButton = getByText('Cancel');

    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(queryByText('Are you sure you want to remove payment method ending in 7890?')).not.toBeInTheDocument();
    });
  });

  it('should call removePaymentProfileMutate function when delete button is clicked in remove payment method modal', async () => {
    render(
      <PaymentMethodItem
        paymentMethod={paymentMethod}
        onError={onError}
        isSelectionEnabled={true}
        showButtons={true}
        onSelectPaymentMethod={onSelectPaymentMethod}
      />,
      { wrapper: TestRoot }
    );

    const removeButton = screen.getByRole('button', { name: /Remove/i });
    fireEvent.click(removeButton);

    const deleteButton = screen.getByRole('button', { name: /Delete Payment Method/i });
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(removePaymentProfileMutate).toHaveBeenCalled();
      expect(screen.queryByText('Are you sure you want to remove payment method ending in 7890?')).not.toBeInTheDocument();
    });
  });
});
