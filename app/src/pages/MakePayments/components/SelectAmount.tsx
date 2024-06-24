import React, { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

import { toDollars } from 'helpers';
import { useTrackingClick } from '../../../shared/hooks/useTrackingClick';
import { AmountType } from '../MakePaymentPage';

interface SelectAmountProps {
  totalBalance: number;
  onChangeAmount: (amount: number) => void;
  amountType?: AmountType.Full | AmountType.Other | null;
  setAmountType?: (val: AmountType.Full | AmountType.Other | null) => void;
}

const SelectAmount = ({ totalBalance, onChangeAmount, amountType, setAmountType }: SelectAmountProps) => {
  const { trackClick } = useTrackingClick();

  const [otherAmount, setOtherAmount] = useState<string | undefined>('');

  const handleSelectMount = (type: AmountType.Full | AmountType.Other, balance: number) => {
    setAmountType && setAmountType(type);
    onChangeAmount(balance);
  };

  const handleOtherAmountChange = (newAmount: string | undefined) => {
    if (amountType === AmountType.Other) {
      setOtherAmount(newAmount);
      onChangeAmount((Number(newAmount) ?? 0) * 100);
    }
  };

  return (
    <div className="bg-white overflow-hidden sm:rounded-md mb-5 border border-gray-300">
      <p className="text-gray-900 text-base font-medium leading-16px border-b border-gray-300 p-4">Select Amount</p>

      {totalBalance > 0 && (
        <div className="w-full flex justify-start items-center p-4 border-b border-gray-300">
          <input
            id="total_balance"
            data-testid="total-balance"
            type="radio"
            className="w-4 h-4 p-2"
            name="amount"
            onChange={() => handleSelectMount(AmountType.Full, totalBalance)}
            checked={amountType === AmountType.Full}
            onClick={() => trackClick('choose_total_balance/from/select_amount')}
          />
          <label className="ml-4 text-sm font-medium text-gray-700">
            Total Balance
            <p className="text-dark-600 mt-2 text-base font-bold">{toDollars(totalBalance / 100)}</p>
          </label>
        </div>
      )}
      <div className="w-full flex justify-start items-center p-4 lg:w-1/3 ">
        <input
          id="other_amount"
          data-testid="other-amount-radio"
          type="radio"
          className="w-4 h-4 p-2"
          name="amount"
          onChange={() => handleSelectMount(AmountType.Other, Number((Number(otherAmount) ?? 0) * 100 || 0))}
          checked={amountType === AmountType.Other}
          onClick={() => trackClick('choose_other_amount/from/select_amount')}
        />
        <label className="ml-4 text-sm font-medium text-gray-700 w-full">
          Other Amount
          <div className="relative mt-1 fs-exclude">
            <CurrencyInput
              intlConfig={{ locale: 'en-US' }}
              data-testid="other-amount-input"
              name="otherAmount"
              placeholder="0.00"
              decimalsLimit={2}
              decimalScale={2}
              min={0}
              value={amountType === AmountType.Other ? otherAmount : ''}
              className="py-2 pr-3 pl-6 w-full block border border-gray-200 bg-white rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={amountType !== AmountType.Other}
              allowNegativeValue={false}
              onValueChange={value => handleOtherAmountChange(value)}
              onBlur={() => handleOtherAmountChange(otherAmount)}
            />
            <span className="absolute top-2 left-3 text-base">$</span>
          </div>
        </label>
      </div>
    </div>
  );
};

export default SelectAmount;
