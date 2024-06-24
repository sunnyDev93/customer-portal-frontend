import { render, screen } from '@testing-library/react';
import AutoPaySettings from './AutoPaySettings';
import getByTextMatcher from 'shared/test/getTextMatcher';
import moment from 'moment';

describe('AutoPaySettings', () => {
  const nextPaymentDate = moment().add(1, 'month').toISOString();
  const formattedNextPaymentDate = moment(nextPaymentDate).format('MMMM Do');
  const customerAutoPaySettings = {
    isEnabled: true,
    cardLastFour: '1234',
    cardType: 'Visa',
    planName: 'Saving',
    nextPaymentAmount: 100,
    nextPaymentDate,
    preferredBillingDate: '',
  };
  const nextPaymentAmount = 100;
  const isOnMonthlyBilling = true;

  it('displays the correct auto pay settings information', () => {
    render(
      <AutoPaySettings
        customerAutoPaySettings={customerAutoPaySettings}
        nextPaymentAmount={nextPaymentAmount}
        isOnMonthlyBilling={isOnMonthlyBilling}
        isMonthlyBillingEnabled={true}
      />
    );

    expect(screen.getByText('Auto Pay Settings')).toBeInTheDocument();
    expect(screen.getByText('Manage your automatic settings')).toBeInTheDocument();

    expect(screen.getByText('Automatic Payment')).toBeInTheDocument();
    expect(screen.getByText('Enabled')).toBeInTheDocument();

    expect(screen.getByText('Next Payment Amount')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();

    expect(screen.getByText('Date of Next Payment')).toBeInTheDocument();
    expect(screen.getByText(formattedNextPaymentDate)).toBeInTheDocument();

    expect(screen.getByText('Payment Method')).toBeInTheDocument();
    expect(screen.getByText(getByTextMatcher('Visa ending in 1234'))).toBeInTheDocument();
    expect(screen.getByText(/By enabling autopay you authorize Aptive/)).toBeInTheDocument();
  });

  it('displays correct payment date message when not on monthly billing', () => {
    const { rerender } = render(
      <AutoPaySettings
        customerAutoPaySettings={customerAutoPaySettings}
        nextPaymentAmount={nextPaymentAmount}
        isOnMonthlyBilling={false}
        isMonthlyBillingEnabled
      />
    );

    expect(
      screen.getByText('Payment will be charged at the time of each Treatment according to your Service Agreement')
    ).toBeInTheDocument();

    rerender(
      <AutoPaySettings
        customerAutoPaySettings={customerAutoPaySettings}
        nextPaymentAmount={nextPaymentAmount}
        isOnMonthlyBilling={true}
        isMonthlyBillingEnabled
      />
    );

    expect(screen.getByText(formattedNextPaymentDate)).toBeInTheDocument();
  });

  it('displays correct payment method message when no card is on file', () => {
    const { rerender } = render(
      <AutoPaySettings
        customerAutoPaySettings={{ ...customerAutoPaySettings, cardType: '' }}
        nextPaymentAmount={nextPaymentAmount}
        isOnMonthlyBilling={isOnMonthlyBilling}
      />
    );

    expect(screen.getByText(getByTextMatcher('Bank Account ending in 1234'))).toBeInTheDocument();

    rerender(
      <AutoPaySettings
        customerAutoPaySettings={{ ...customerAutoPaySettings, cardType: 'MasterCard' }}
        nextPaymentAmount={nextPaymentAmount}
        isOnMonthlyBilling={isOnMonthlyBilling}
      />
    );

    expect(screen.getByText(getByTextMatcher('MasterCard ending in 1234'))).toBeInTheDocument();
  });

  it('displays "Not Enabled" when auto pay is not enabled', () => {
    render(
      <AutoPaySettings
        customerAutoPaySettings={{ ...customerAutoPaySettings, isEnabled: false }}
        nextPaymentAmount={nextPaymentAmount}
        isOnMonthlyBilling={isOnMonthlyBilling}
      />
    );

    expect(screen.getByText('Not Enabled')).toBeInTheDocument();
  });
});
