import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardCreditBalance from './DashboardCreditBalance';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { toDollars } from '../helpers';

const mockUserData1 = {
  officeId: 39,
  firstName: 'Ftest0405 long nme',
  lastName: 'Ltest0405 long name',
  companyName: null,
  spouse: null,
  isCommercial: false,
  status: 1,
  email: 's.tsybin.qa@gmail.com',
  phones: [
    {
      phone: '2312312323',
      extension: null,
      isPrimary: true,
    },
    {
      phone: '2312312324',
      extension: null,
      isPrimary: false,
    },
  ],
  address: {
    address: '77 W 4800 N',
    city: 'Provo',
    state: 'UT',
    zip: '84604',
  },
  billingInformation: {
    accountId: 2869416,
    companyName: null,
    firstName: 'Ftest0405 long nme',
    lastName: 'Ltest0405 long name',
    address: {
      address: '77 W 4800 N',
      city: 'Provo',
      state: 'UT',
      zip: '84604',
      countryCode: 'US',
    },
    phone: '2312312323',
    email: 's.tsybin.qa@gmail.com',
  },
  latitude: 40.297268,
  longitude: -111.66008,
  squareFeet: 0,
  addedBy: 529041,
  dateAdded: '2023-04-05T13:21:39+00:00',
  dateCancelled: null,
  dateUpdated: '2023-08-01T11:07:46+00:00',
  source: null,
  autoPay: 'ACH',
  preferredTechId: 75445,
  paidInAdvance: false,
  subscriptionIds: [2958839],
  balance: 0,
  balanceAge: 0,
  responsibleBalance: -1,
  responsibleBalanceAge: 0,
  customerLink: null,
  masterAccountId: null,
  preferredDayForBilling: 0,
  paymentHoldDate: null,
  mostRecentCardLastFour: '1111',
  mostRecentCardExpirationDate: '06/23',
  regionId: null,
  mapCode: null,
  mapPage: null,
  specialScheduling: null,
  taxRate: 0,
  smsReminders: false,
  phoneReminders: false,
  emailReminders: true,
  customerSource: null,
  maxMonthlyCharge: 100,
  county: 'Utah',
  useStructures: false,
  isMultiUnit: false,
  autoPayPaymentProfileId: 5076114,
  divisionId: -1,
  portalLogin: 'https://demoawsaptivepest.PestPortals.com/loginc/fg8t0r16ogqqphejccj6p0rrt15lhn3t$demoaptivepest$2869416',
  portalLoginExpires: '2023-08-14T15:54:28+00:00',
};

const mockUserData2 = {
  officeId: 39,
  firstName: 'Ftest0405 long nme',
  lastName: 'Ltest0405 long name',
  companyName: null,
  spouse: null,
  isCommercial: false,
  status: 1,
  email: 's.tsybin.qa@gmail.com',
  phones: [
    {
      phone: '2312312323',
      extension: null,
      isPrimary: true,
    },
    {
      phone: '2312312324',
      extension: null,
      isPrimary: false,
    },
  ],
  address: {
    address: '77 W 4800 N',
    city: 'Provo',
    state: 'UT',
    zip: '84604',
  },
  billingInformation: {
    accountId: 2869416,
    companyName: null,
    firstName: 'Ftest0405 long nme',
    lastName: 'Ltest0405 long name',
    address: {
      address: '77 W 4800 N',
      city: 'Provo',
      state: 'UT',
      zip: '84604',
      countryCode: 'US',
    },
    phone: '2312312323',
    email: 's.tsybin.qa@gmail.com',
  },
  latitude: 40.297268,
  longitude: -111.66008,
  squareFeet: 0,
  addedBy: 529041,
  dateAdded: '2023-04-05T13:21:39+00:00',
  dateCancelled: null,
  dateUpdated: '2023-08-01T11:07:46+00:00',
  source: null,
  autoPay: 'ACH',
  preferredTechId: 75445,
  paidInAdvance: false,
  subscriptionIds: [2958839],
  balance: 100,
  balanceAge: 0,
  responsibleBalance: 2,
  responsibleBalanceAge: 0,
  customerLink: null,
  masterAccountId: null,
  preferredDayForBilling: 0,
  paymentHoldDate: null,
  mostRecentCardLastFour: '1111',
  mostRecentCardExpirationDate: '06/23',
  regionId: null,
  mapCode: null,
  mapPage: null,
  specialScheduling: null,
  taxRate: 0,
  smsReminders: false,
  phoneReminders: false,
  emailReminders: true,
  customerSource: null,
  maxMonthlyCharge: 100,
  county: 'Utah',
  useStructures: false,
  isMultiUnit: false,
  autoPayPaymentProfileId: 5076114,
  divisionId: -1,
  portalLogin: 'https://demoawsaptivepest.PestPortals.com/loginc/fg8t0r16ogqqphejccj6p0rrt15lhn3t$demoaptivepest$2869416',
  portalLoginExpires: '2023-08-14T15:54:28+00:00',
};

describe('DashboardCreditBalance component', () => {
  it('should show the DashboardCreditBalance if the user data responsibleBalance is zero or smaller than zero', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <DashboardCreditBalance userData={mockUserData1} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const dashboardCreditBalance = screen.queryByTestId('dashboard-credit-balance-1');
    const dashboardBalance = screen.queryByTestId('dashboard-balance-1');
    expect(dashboardCreditBalance).toBeInTheDocument();
    expect(screen.getByText('Credit Balance')).toBeInTheDocument();
    expect(dashboardBalance).toBeInTheDocument();
    expect(dashboardBalance).toHaveTextContent(toDollars(mockUserData1.responsibleBalance));
  });
});

describe('DashboardCreditBalance component', () => {
  it('should NOT show the DashboardCreditBalance if the user data responsibleBalance is greater than or equal to 0', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <DashboardCreditBalance userData={mockUserData2} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const dashboardCreditBalance = screen.queryByTestId('dashboard-credit-balance-1');
    expect(dashboardCreditBalance).not.toBeInTheDocument();
  });
});
