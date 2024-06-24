import React from 'react';
import CurrencyInput from 'react-currency-input-field';

import { toDollars } from '../helpers';

interface AmountSelectProps {
  balance: number;
  selectedAmount: string;
  onSelect: (option: string) => void;
  onOtherAmountChange: (amount: any) => void;
}

const AmountSelect: React.FC<AmountSelectProps> = ({ balance, selectedAmount, onSelect, onOtherAmountChange }) => {
  return (
    <div className="grid space-y-2 mt-3">
      {balance > 0 && (
        <label
          data-testid="full-balance"
          htmlFor="payment-amount-full"
          className="flex p-3 w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
        >
          <input
            data-testid="input-radio"
            type="radio"
            name="payment-amount-radio"
            className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
            id="payment-amount-full"
            onChange={() => onSelect('full')}
            checked={selectedAmount === 'full'}
          />
          <span className="text-sm text-gray-500 ml-3 dark:text-gray-400">Full Balance</span>

          <div className="ml-auto flex items-center">
            <span className="mr-1 text-slate-600 font-bold">{toDollars(balance)}</span>
          </div>
        </label>
      )}

      <label
        htmlFor="payment-amount-other"
        className="flex p-3 py-1 pr-1 w-full items-center bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
      >
        <input
          type="radio"
          name="payment-amount-radio"
          className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
          id="payment-amount-other"
          onChange={() => onSelect('other')}
          checked={selectedAmount === 'other'}
        />
        <span className="text-sm text-gray-500 ml-3 dark:text-gray-400">Other Amount</span>

        <div data-testid="currency" className="ml-auto flex items-center">
          <span className="mr-1 text-slate-600 font-bold">$</span>
          <CurrencyInput
            name="otherAmount"
            placeholder="Enter Amount"
            defaultValue={0}
            decimalsLimit={2}
            decimalScale={2}
            className="py-2 px-3 w-[120px] block border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            disabled={selectedAmount !== 'other'}
            onValueChange={value => onOtherAmountChange(value)}
          />
        </div>
      </label>
    </div>
  );
};

export default AmountSelect;
