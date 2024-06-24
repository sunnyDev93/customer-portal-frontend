import React from 'react';

import { render, screen } from '@testing-library/react';
import LatestBillWidget from './LatestBillWidget';
import '@testing-library/jest-dom';
import { TestRoot } from 'config/test/react-query';
import * as getSubscriptionsHook from 'shared/hooks/useGetSubscriptions';
import * as getCustomerInvoicesHook from 'shared/hooks/useGetInvoices';

const withInvoicesSubscriptions = ({ data = {}, hasInvoices = true, hasSubscriptions = true }) => ({
  ...data,
  invoices: hasInvoices
    ? [
        {
          attributes: {
            invoiceDate: '2022-10-14T08:00:00.000000+0000',
            active: 1,
            total: 777,
          },
        },
      ]
    : [],
  subscriptions: hasSubscriptions
    ? [
        {
          attributes: {
            recurringCharge: 777,
            serviceType: 'Pro Plus',
          },
        },
      ]
    : [],
});

const defaultBilling = {
  accountId: '123456',
  autoPay: true,
  balance: 0,
};

const noAutoPay = {
  accountId: '123456',
  autoPay: false,
  balance: 0,
};

const pastDue = {
  accountId: '123456',
  autoPay: false,
  balance: 100,
};

const noSubscriptions = {
  invoices: [],
  subscriptions: [],
  isLoadingInvoices: false,
  isLoadingSubscriptions: false,
};

const noInvoices = {
  invoices: [],
  subscriptions: [
    {
      attributes: {
        recurringCharge: 777,
        serviceType: 'Pro Plus',
      },
    },
  ],
  isLoadingInvoices: false,
  isLoadingSubscriptions: false,
};

const defaultContext = {
  invoices: [
    {
      attributes: {
        invoiceDate: '2022-10-14T08:00:00.000000+0000',
      },
    },
  ],
  subscriptions: [
    {
      attributes: {
        recurringCharge: 777,
        serviceType: 'Pro Plus',
      },
    },
  ],
  isLoadingInvoices: false,
  isLoadingSubscriptions: false,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function renderLatestBillWidget(userValues, widgetValues) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  jest.spyOn(getSubscriptionsHook, 'useGetSubscriptions').mockReturnValue({ isLoading: false, data: widgetValues.subscriptions });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  jest.spyOn(getCustomerInvoicesHook, 'useGetCustomerInvoices').mockReturnValue({ isLoading: false, data: widgetValues.invoices });
  render(<LatestBillWidget accountId={widgetValues.accountId} autoPay={widgetValues.autoPay} balance={widgetValues.balance} />, {
    wrapper: TestRoot,
  });
}

describe('LatestBillWidget', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('when invoices and subscriptions were  provided', () => {
    it('should render Latest Bill Section', () => {
      renderLatestBillWidget(defaultContext, withInvoicesSubscriptions({ data: defaultBilling }));

      const latestBillLabelElem = screen.getByText(/^Latest Bill$/i);
      // const autoPayLabelElem = screen.getByText(/Autopay will be charged at the time of service./i);
      const recurringChargeAmount = screen.getAllByText(/\$777.00/i)[0];
      const planType = screen.getAllByText(/Pro Plus/i)[0];
      expect(latestBillLabelElem).toBeInTheDocument();
      // expect(autoPayLabelElem).toBeInTheDocument();
      expect(recurringChargeAmount).toBeInTheDocument();
      expect(planType).toBeInTheDocument();
    });

    it('should render Past Due Section', () => {
      renderLatestBillWidget(defaultContext, withInvoicesSubscriptions({ data: pastDue }));

      const pastDueLabelElem = screen.getByText(/Your account has a past due balance of/i);
      expect(pastDueLabelElem).toBeInTheDocument();
    });

    it('should not render Auto Pay Section', () => {
      renderLatestBillWidget(defaultContext, withInvoicesSubscriptions({ data: noAutoPay }));

      const autoPayLabelElem = screen.queryByText(/Autopay will be charged at the time of service./i);
      expect(autoPayLabelElem).toBeNull();
    });
  });

  describe('when subscriptions were NOT provided', () => {
    it('should not render the widget', () => {
      renderLatestBillWidget(noSubscriptions, defaultBilling);

      expect(screen.queryByText(/Latest Bill/i)).toBeNull();
      expect(screen.queryByText(/Autopay will be charged at the time of service./i)).toBeNull();
      expect(screen.queryByText(/\$777.00/i)).toBeNull();
      expect(screen.queryByText(/Pro Plus/i)).toBeNull();
    });

    it('should render the bill unavailable message Section', () => {
      renderLatestBillWidget(noInvoices, withInvoicesSubscriptions({ data: defaultBilling, hasInvoices: false }));

      const billUnavailableLabelElem = screen.getByText(/Your latest bill is not available. Please check back later./i);
      expect(billUnavailableLabelElem).toBeInTheDocument();
    });
  });

  describe('when invoices were NOT provided', () => {
    // TODO - Uncomment this once CXP-265 is done
    /*
    it('should render Action Buttons as disabled', () => {
      renderLatestBillWidget(noInvoices, defaultBilling);

      const viewBillButton = screen.getByText(/View Bill/i)
      const makePaymentButton = screen.getByText(/Make Payment/i)

      expect(viewBillButton).toBeInTheDocument()
      expect(viewBillButton).toBeDisabled();
      expect(makePaymentButton).toBeInTheDocument();
      expect(makePaymentButton).toBeDisabled();
    })
    */

    it('should render the bill unavailable message Section', () => {
      renderLatestBillWidget(noInvoices, withInvoicesSubscriptions({ data: defaultBilling, hasInvoices: false }));

      const billUnavailableLabelElem = screen.getByText(/Your latest bill is not available. Please check back later./i);
      expect(billUnavailableLabelElem).toBeInTheDocument();
    });
  });
});
