import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainNavUI from './MainNav';
import logo from '../../images/aptive-logo-green.png';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { formatName } from 'helpers/format';

const mockAptiveUser = {
  accountId: '2869416',
  firstName: 'Ftest0405 long nme',
  lastName: 'Ltest0405 long name',
  email: 's.tsybin.qa@gmail.com',
};

const mockAptiveUserAccounts = [
  {
    type: 'Customer',
    id: '2869416',
    attributes: {
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
      responsibleBalance: 0,
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
    },
  },
  {
    type: 'Customer',
    id: '2869624',
    attributes: {
      officeId: 1,
      firstName: 'Test',
      lastName: 'Customer CXP-784',
      companyName: null,
      spouse: null,
      isCommercial: false,
      status: 1,
      email: 's.tsybin.qa@gmail.com',
      phones: [],
      address: {
        address: '2811 Deerwood Dr',
        city: 'Atlanta',
        state: 'GA',
        zip: '30331',
      },
      billingInformation: {
        accountId: 2869624,
        companyName: null,
        firstName: 'Test',
        lastName: 'Customer CXP-784',
        address: {
          address: '2811 Deerwood Dr',
          city: 'Atlanta',
          state: 'GA',
          zip: '30331',
          countryCode: 'US',
        },
        phone: null,
        email: 's.tsybin.qa@gmail.com',
      },
      latitude: 33.669788,
      longitude: -84.516342,
      squareFeet: 0,
      addedBy: 529523,
      dateAdded: '2023-04-27T08:01:34+00:00',
      dateCancelled: null,
      dateUpdated: '2023-07-29T21:30:05+00:00',
      source: null,
      autoPay: 'No',
      preferredTechId: null,
      paidInAdvance: false,
      subscriptionIds: [],
      balance: 0,
      balanceAge: 0,
      responsibleBalance: 0,
      responsibleBalanceAge: 0,
      customerLink: null,
      masterAccountId: null,
      preferredDayForBilling: 0,
      paymentHoldDate: null,
      mostRecentCardLastFour: null,
      mostRecentCardExpirationDate: null,
      regionId: null,
      mapCode: null,
      mapPage: null,
      specialScheduling: null,
      taxRate: 0,
      smsReminders: false,
      phoneReminders: false,
      emailReminders: true,
      customerSource: null,
      maxMonthlyCharge: 0,
      county: 'Fulton',
      useStructures: false,
      isMultiUnit: false,
      autoPayPaymentProfileId: null,
      divisionId: -1,
      portalLogin: 'https://demoawsaptivepest.PestPortals.com/loginc/jo32cemub1cukgeajbh002sqgn8f1un8$demoaptivepest$2869624',
      portalLoginExpires: '2023-08-14T15:54:28+00:00',
    },
  },
  {
    type: 'Customer',
    id: '2869626',
    attributes: {
      officeId: 4,
      firstName: 'Test',
      lastName: 'Customer CXP-784',
      companyName: null,
      spouse: null,
      isCommercial: false,
      status: 1,
      email: 's.tsybin.qa@gmail.com',
      phones: [],
      address: {
        address: null,
        city: null,
        state: 'UT',
        zip: null,
      },
      billingInformation: {
        accountId: 2869626,
        companyName: null,
        firstName: 'Test',
        lastName: 'Customer CXP-784',
        address: {
          address: null,
          city: null,
          state: 'UT',
          zip: null,
          countryCode: 'US',
        },
        phone: null,
        email: 's.tsybin.qa@gmail.com',
      },
      latitude: 39.32098,
      longitude: -111.093735,
      squareFeet: 0,
      addedBy: 529524,
      dateAdded: '2023-04-27T08:52:21+00:00',
      dateCancelled: null,
      dateUpdated: '2023-07-29T21:30:05+00:00',
      source: null,
      autoPay: 'No',
      preferredTechId: null,
      paidInAdvance: false,
      subscriptionIds: [],
      balance: 0,
      balanceAge: 0,
      responsibleBalance: 0,
      responsibleBalanceAge: 0,
      customerLink: null,
      masterAccountId: null,
      preferredDayForBilling: 0,
      paymentHoldDate: null,
      mostRecentCardLastFour: null,
      mostRecentCardExpirationDate: null,
      regionId: null,
      mapCode: null,
      mapPage: null,
      specialScheduling: null,
      taxRate: 0,
      smsReminders: false,
      phoneReminders: false,
      emailReminders: true,
      customerSource: null,
      maxMonthlyCharge: 0,
      county: null,
      useStructures: false,
      isMultiUnit: false,
      autoPayPaymentProfileId: null,
      divisionId: -1,
      portalLogin: 'https://demoawsaptivepest.PestPortals.com/loginc/ukef9pmvbmcpvbc1rpm13tchk8qji33u$demoaptivepest$2869626',
      portalLoginExpires: '2023-08-14T15:54:28+00:00',
    },
  },
  {
    type: 'Customer',
    id: '2869637',
    attributes: {
      officeId: 5,
      firstName: 'Stanislav',
      lastName: 'Test Bay Area North',
      companyName: null,
      spouse: null,
      isCommercial: false,
      status: 1,
      email: 's.tsybin.qa@gmail.com',
      phones: [],
      address: {
        address: '570 Huntington Way',
        city: 'Livermore',
        state: 'CA',
        zip: '94551',
      },
      billingInformation: {
        accountId: 2869637,
        companyName: null,
        firstName: 'Stanislav',
        lastName: 'Test Bay Area North',
        address: {
          address: '570 Huntington Way',
          city: 'Livermore',
          state: 'CA',
          zip: '94551',
          countryCode: 'US',
        },
        phone: null,
        email: 's.tsybin.qa@gmail.com',
      },
      latitude: 37.693508,
      longitude: -121.792931,
      squareFeet: 0,
      addedBy: 529525,
      dateAdded: '2023-04-27T14:33:58+00:00',
      dateCancelled: null,
      dateUpdated: '2023-07-29T21:30:05+00:00',
      source: null,
      autoPay: 'No',
      preferredTechId: null,
      paidInAdvance: false,
      subscriptionIds: [],
      balance: 0,
      balanceAge: 0,
      responsibleBalance: 0,
      responsibleBalanceAge: 0,
      customerLink: null,
      masterAccountId: null,
      preferredDayForBilling: 0,
      paymentHoldDate: null,
      mostRecentCardLastFour: '1111',
      mostRecentCardExpirationDate: '01/24',
      regionId: null,
      mapCode: null,
      mapPage: null,
      specialScheduling: null,
      taxRate: 0,
      smsReminders: true,
      phoneReminders: true,
      emailReminders: true,
      customerSource: null,
      maxMonthlyCharge: 0,
      county: 'Alameda',
      useStructures: false,
      isMultiUnit: false,
      autoPayPaymentProfileId: null,
      divisionId: -1,
      portalLogin: 'https://demoawsaptivepest.PestPortals.com/loginc/p7r4rtq8ovqc57uj32verr020800hgi5$demoaptivepest$2869637',
      portalLoginExpires: '2023-08-14T15:54:28+00:00',
    },
  },
  {
    type: 'Customer',
    id: '2870665',
    attributes: {
      officeId: 27,
      firstName: 'Stas',
      lastName: 'Tsybin',
      companyName: null,
      spouse: null,
      isCommercial: false,
      status: 1,
      email: 's.tsybin.qa@gmail.com',
      phones: [
        {
          phone: '7548765567',
          extension: null,
          isPrimary: true,
        },
      ],
      address: {
        address: '320 500 N',
        city: 'Provo',
        state: 'UT',
        zip: '84601',
      },
      billingInformation: {
        accountId: 2870665,
        companyName: null,
        firstName: 'Stas',
        lastName: 'Tsybin',
        address: {
          address: '320 500 N',
          city: 'Provo',
          state: 'UT',
          zip: '84601',
          countryCode: 'US',
        },
        phone: '7548765567',
        email: 's.tsybin.qa@gmail.com',
      },
      latitude: 0,
      longitude: 0,
      squareFeet: 0,
      addedBy: 76354,
      dateAdded: '2023-06-29T12:41:10+00:00',
      dateCancelled: null,
      dateUpdated: '2023-07-29T21:30:05+00:00',
      source: {
        id: 2091,
        name: 'SERVICE PRO',
      },
      autoPay: 'No',
      preferredTechId: null,
      paidInAdvance: false,
      subscriptionIds: [2960486, 2960487, 2960488, 2960492],
      balance: 0,
      balanceAge: 0,
      responsibleBalance: 0,
      responsibleBalanceAge: 0,
      customerLink: null,
      masterAccountId: null,
      preferredDayForBilling: 0,
      paymentHoldDate: null,
      mostRecentCardLastFour: null,
      mostRecentCardExpirationDate: null,
      regionId: null,
      mapCode: null,
      mapPage: null,
      specialScheduling: null,
      taxRate: 0,
      smsReminders: false,
      phoneReminders: false,
      emailReminders: false,
      customerSource: null,
      maxMonthlyCharge: 0,
      county: null,
      useStructures: false,
      isMultiUnit: false,
      autoPayPaymentProfileId: null,
      divisionId: null,
      portalLogin: 'https://demoawsaptivepest.PestPortals.com/loginc/0hvsil9jig7uq2ph8sm7q2t6vbkv2lbh$demoaptivepest$2870665',
      portalLoginExpires: '2023-08-14T15:54:28+00:00',
    },
  },
  {
    type: 'Customer',
    id: '2870692',
    attributes: {
      officeId: 23,
      firstName: '1f',
      lastName: '1l',
      companyName: null,
      spouse: null,
      isCommercial: false,
      status: 1,
      email: 's.tsybin.qa@gmail.com',
      phones: [
        {
          phone: '5555551234',
          extension: null,
          isPrimary: true,
        },
      ],
      address: {
        address: '125 W Main St',
        city: 'Mesa',
        state: 'AZ',
        zip: '85201',
      },
      billingInformation: {
        accountId: 2870692,
        companyName: null,
        firstName: '1f',
        lastName: '1l',
        address: {
          address: '125 W Main St',
          city: 'Mesa',
          state: 'AZ',
          zip: '85201',
          countryCode: 'US',
        },
        phone: '5555551234',
        email: 's.tsybin.qa@gmail.com',
      },
      latitude: 0,
      longitude: 0,
      squareFeet: 0,
      addedBy: 371816,
      dateAdded: '2023-07-04T15:03:38+00:00',
      dateCancelled: null,
      dateUpdated: '2023-07-29T21:30:05+00:00',
      source: {
        id: 2091,
        name: 'SERVICE PRO',
      },
      autoPay: 'No',
      preferredTechId: null,
      paidInAdvance: false,
      subscriptionIds: [2960527],
      balance: 0,
      balanceAge: 0,
      responsibleBalance: 0,
      responsibleBalanceAge: 0,
      customerLink: null,
      masterAccountId: null,
      preferredDayForBilling: 0,
      paymentHoldDate: null,
      mostRecentCardLastFour: null,
      mostRecentCardExpirationDate: null,
      regionId: null,
      mapCode: null,
      mapPage: null,
      specialScheduling: null,
      taxRate: 0,
      smsReminders: false,
      phoneReminders: false,
      emailReminders: false,
      customerSource: null,
      maxMonthlyCharge: 0,
      county: null,
      useStructures: false,
      isMultiUnit: false,
      autoPayPaymentProfileId: null,
      divisionId: null,
      portalLogin: 'https://demoawsaptivepest.PestPortals.com/loginc/plmk3p6k48j35th737vme8cl75fhtr0j$demoaptivepest$2870692',
      portalLoginExpires: '2023-08-14T15:54:28+00:00',
    },
  },
];

const mockLogout = jest.fn();
const mockTrackClick = jest.fn();
const mockCloseMobileMenu = jest.fn();
const mockOpenMobileMenu = jest.fn();
const mockIsMobileUserMenuOpen = false;

jest.mock('configcat-react', () => ({
  useFeatureFlag: () => ({ value: true }),
}));

describe('MainNav component', () => {
  const originalWindowLocation = window.location;

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: new URL(window.location.href),
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: originalWindowLocation,
    });
  });
  it(`should have logo with url ${logo}`, async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <MainNavUI
            logout={mockLogout}
            trackClick={mockTrackClick}
            aptiveUser={mockAptiveUser}
            aptiveUserAccounts={mockAptiveUserAccounts}
          />
        </BrowserRouter>
      </RecoilRoot>
    );
    const siteLogo = screen.queryByTestId('site-logo');
    expect(siteLogo).toBeInTheDocument();
    expect(siteLogo).toHaveAttribute('src', logo);
  });

  it('should have service address block when aptiveUserAccounts is not null or undefined', () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <MainNavUI
            logout={mockLogout}
            trackClick={mockTrackClick}
            aptiveUser={mockAptiveUser}
            aptiveUserAccounts={mockAptiveUserAccounts}
          />
        </BrowserRouter>
      </RecoilRoot>
    );
    const serviceAddress = screen.queryByTestId('service-address');
    const accountSwitcher = screen.queryByTestId('account-switcher');
    expect(serviceAddress).toBeInTheDocument();
    expect(accountSwitcher).toBeInTheDocument();
    expect(screen.getByText('Service Address:')).toBeInTheDocument();
  });

  it('should have service address block when aptiveUserAccounts is null or undefined', () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <MainNavUI logout={mockLogout} trackClick={mockTrackClick} aptiveUser={mockAptiveUser} aptiveUserAccounts={null} />
        </BrowserRouter>
      </RecoilRoot>
    );
    const serviceAddress = screen.queryByTestId('service-address');
    const accountSwitcher = screen.queryByTestId('account-switcher');
    expect(serviceAddress).not.toBeInTheDocument();
    expect(accountSwitcher).not.toBeInTheDocument();
    expect(screen.queryByText('Service Address:')).not.toBeInTheDocument();
  });

  it('should have NavBar component', () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <MainNavUI logout={mockLogout} trackClick={mockTrackClick} aptiveUser={null} aptiveUserAccounts={null} />
        </BrowserRouter>
      </RecoilRoot>
    );
    const navBar = screen.queryByTestId('nav-bar');
    expect(navBar).toBeInTheDocument();
  });

  it('should have user selector block when aptiveUser is null or undefined', () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <MainNavUI logout={mockLogout} trackClick={mockTrackClick} aptiveUser={null} aptiveUserAccounts={null} />
        </BrowserRouter>
      </RecoilRoot>
    );
    const serviceAddress = screen.queryByTestId('user-selector-block');
    expect(serviceAddress).not.toBeInTheDocument();
  });

  it('should have user selector block when aptiveUser is not null or undefined', () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <MainNavUI logout={mockLogout} trackClick={mockTrackClick} aptiveUser={mockAptiveUser} aptiveUserAccounts={null} />
        </BrowserRouter>
      </RecoilRoot>
    );
    const serviceAddress = screen.queryByTestId('user-selector-block');
    const userDropdown = screen.queryByTestId('user-dropdown');
    expect(userDropdown).toBeInTheDocument();
    expect(serviceAddress).toBeInTheDocument();
  });

  it('should only show one user dropdown on desktop screen', () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <MainNavUI
            logout={mockLogout}
            trackClick={mockTrackClick}
            aptiveUser={mockAptiveUser}
            aptiveUserAccounts={mockAptiveUserAccounts}
          />
        </BrowserRouter>
      </RecoilRoot>
    );
    const userDropdown = screen.queryByTestId('user-dropdown');
    expect(userDropdown).toHaveClass('md:block');
  });

  it('should show first name and last name of user on the block', () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <MainNavUI
            logout={mockLogout}
            trackClick={mockTrackClick}
            aptiveUser={mockAptiveUser}
            aptiveUserAccounts={mockAptiveUserAccounts}
          />
        </BrowserRouter>
      </RecoilRoot>
    );
    const nameDesktop = screen.queryByTestId('fullname-desktop');
    const nameMobile = screen.queryByTestId('fullname-mobile');
    expect(nameDesktop).toHaveTextContent(`${mockAptiveUser?.firstName} ${mockAptiveUser?.lastName}`);
    expect(nameMobile).toHaveTextContent(`${formatName(mockAptiveUser?.firstName)} ${formatName(mockAptiveUser?.lastName)}`);
  });

  it('should show the user info list on mobile', () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <MainNavUI
            logout={mockLogout}
            trackClick={mockTrackClick}
            aptiveUser={mockAptiveUser}
            aptiveUserAccounts={mockAptiveUserAccounts}
          />
        </BrowserRouter>
      </RecoilRoot>
    );
    const userInfo = screen.queryByTestId('user-info-mobile');
    expect(userInfo).toHaveClass('md:hidden');
  });

  it('should show the humberger button on mobile', () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <MainNavUI
            logout={mockLogout}
            trackClick={mockTrackClick}
            aptiveUser={mockAptiveUser}
            aptiveUserAccounts={mockAptiveUserAccounts}
          />
        </BrowserRouter>
      </RecoilRoot>
    );
    const humbergerMenuButton = screen.queryByTestId('humberger');
    expect(humbergerMenuButton).toHaveClass('sm:hidden');
  });

  it('should toggle the menu on mobile when click humberger menu button', () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <MainNavUI
            logout={mockLogout}
            trackClick={mockTrackClick}
            aptiveUser={mockAptiveUser}
            aptiveUserAccounts={mockAptiveUserAccounts}
          />
        </BrowserRouter>
      </RecoilRoot>
    );
    const humbergerMenuButton1 = screen.getByTestId('humberger');
    fireEvent.click(humbergerMenuButton1);
    expect(screen.getAllByText('Payments & Invoices').length).toBe(2);
    expect(screen.getAllByText('My Account').length).toBe(2);
    expect(screen.getAllByText('Appointments').length).toBe(2);

    fireEvent.click(humbergerMenuButton1);
    expect(screen.getAllByText('Payments & Invoices').length).toBe(1);
    expect(screen.getAllByText('My Account').length).toBe(1);
    expect(screen.getAllByText('Appointments').length).toBe(1);
  });
});
