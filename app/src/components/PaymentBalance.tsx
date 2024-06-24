import React from 'react';

import { toDollars } from '../helpers';

interface PaymentBalanceProps {
  balance: number;
}

const PaymentBalance: React.FC<PaymentBalanceProps> = ({ balance }) => {
  return (
    <>
      <div className="flex">
        <div>
          <span data-testid="balance-title" className="text-slate-500 font-medium">
            Balance
          </span>
          <div data-testid="balance-value" className="text-4xl font-semibold text-slate-800">
            {toDollars(balance < 0 ? 0 : balance)}
          </div>
        </div>

        {balance < 0 && (
          <div data-testid="credit-block" className="ml-auto flex flex-col">
            <span data-testid="credit-title" className="text-slate-500 font-medium text-right">
              Credit
            </span>
            <div data-testid="credit-value" className="text-4xl font-semibold text-slate-800">
              {toDollars(Math.abs(balance))}
            </div>
          </div>
        )}
      </div>
      {balance <= 0 && (
        <div data-testid="balance-warning" className="text-slate-400 font-light text-sm">
          You have no pending balance, but you can add credit to your account
        </div>
      )}
    </>
  );
};

export default PaymentBalance;
