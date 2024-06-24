import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PaymentBalance from './PaymentBalance';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { toDollars } from '../helpers';

describe('PaymentBalance component', () => {
  it('should always have the title Balance on screen', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <PaymentBalance balance={10} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const balanceTitle = screen.queryByTestId('balance-title');
    expect(balanceTitle).toHaveTextContent('Balance');
  });

  it('should have the balance value is 0 when the props balance is 0 or smaller than 0', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <PaymentBalance balance={-10} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const balanceValue = screen.queryByTestId('balance-value');
    expect(balanceValue).toHaveTextContent('$0.00');
  });

  it('should have the balance value not $0.00 when balance is greater than 0', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <PaymentBalance balance={10} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const balanceValue = screen.queryByTestId('balance-value');
    expect(balanceValue).toHaveTextContent('$10.00');
  });

  it('should have credit block when balance is smaller than 0, with title of Credit and value', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <PaymentBalance balance={-10} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const creditBlock = screen.queryByTestId('credit-block');
    const creditTitle = screen.queryByTestId('credit-title');
    const creditValue = screen.queryByTestId('credit-value');
    expect(creditBlock).toBeInTheDocument();
    expect(creditTitle).toHaveTextContent('Credit');
    expect(creditValue).toHaveTextContent(`${toDollars(Math.abs(-10))}`);
  });

  it('should have the warning when the balance is smaller than 0', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <PaymentBalance balance={-10} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const balanceWarning = screen.queryByTestId('balance-warning');
    expect(balanceWarning).toBeInTheDocument();
    expect(balanceWarning).toHaveTextContent('You have no pending balance, but you can add credit to your account');
  });
});
