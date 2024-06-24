import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SelectAmount from './SelectAmount';

const onChangeAmount = jest.fn();

const getTotalBalanceRadio = () => screen.getByTestId('total-balance') as HTMLInputElement;

describe('SelectAmount', () => {
  it('renders correctly', () => {
    render(<SelectAmount totalBalance={100} onChangeAmount={() => {}} />);
    expect(screen.getByText('Total Balance')).toBeInTheDocument();
    expect(getTotalBalanceRadio().checked).toBe(false);
    expect(screen.getByText('$1.00')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument();
  });

  it('selects total balance and updates amount', () => {
    render(<SelectAmount totalBalance={100} onChangeAmount={onChangeAmount} />);
    fireEvent.click(getTotalBalanceRadio());
    expect(onChangeAmount).toHaveBeenCalledWith(100);
  });

  it('selects other amount and updates amount when other amount changes', () => {
    render(<SelectAmount totalBalance={100} onChangeAmount={onChangeAmount} />);
    const otherAmountRadio = screen.getByTestId('other-amount-radio') as HTMLInputElement;
    const otherAmountInput = screen.getByTestId('other-amount-input') as HTMLInputElement;
    fireEvent.click(otherAmountRadio);
    expect(otherAmountRadio.checked).toBe(false);
    fireEvent.change(otherAmountInput, { target: { value: '50' } });
    expect(otherAmountInput.value).not.toBe('50');
    expect(onChangeAmount).toHaveBeenCalledWith(0);
  });
});
