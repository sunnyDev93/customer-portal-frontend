import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { aptiveUserState } from 'app-recoil/atoms/auth/aptive-user';
import { aptiveUserDataState } from 'app-recoil/atoms/auth/aptive-user-data';
import { customerInfoDataState } from 'app-recoil/atoms/customer-info';
import { CustomerInfoResponse } from 'types/request';
import { ConfigCatProvider } from 'configcat-react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockedUserDataState = {
  officeId: 1,
  firstName: 'Tendy',
  lastName: 'Customer',
  companyName: null,
  spouse: null,
  isCommercial: false,
  status: 1,
  email: 'tendy.esto+cust1@gmail.com',
  phones: [
    { phone: '23009565', extension: null, isPrimary: true },
    { phone: '321009565', extension: null, isPrimary: false },
  ],
  address: { address: '1330 Ormewood Ave', city: 'Atlanta', state: 'GA', zip: '30316' },
  billingInformation: {
    accountId: 2868157,
    companyName: null,
    firstName: 'Tendy',
    lastName: 'Customer',
    address: { address: '1330 Ormewood Ave', city: 'Atlanta', state: 'GA', zip: '30316', countryCode: 'US' },
    phone: '23009565',
    email: 'tendy.esto+cust1@gmail.com',
  },
  latitude: 33.734261,
  longitude: -84.343994,
  squareFeet: 0,
  addedBy: 527729,
  dateAdded: '2023-01-19T10:31:24+00:00',
  dateCancelled: null,
  dateUpdated: '2023-09-20T15:35:44+00:00',
  source: null,
  autoPay: 'ACH',
  preferredTechId: null,
  paidInAdvance: false,
  subscriptionIds: [2957492, 2957905, 2957985, 2957986],
  balance: 1,
  balanceAge: 9,
  responsibleBalance: 1,
  responsibleBalanceAge: 9,
  customerLink: null,
  masterAccountId: null,
  preferredDayForBilling: 0,
  paymentHoldDate: '2023-04-14T12:13:26+00:00',
  mostRecentCardLastFour: '1117',
  mostRecentCardExpirationDate: '09/25',
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
  county: 'DeKalb',
  useStructures: false,
  isMultiUnit: false,
  autoPayPaymentProfileId: 5075830,
  divisionId: -1,
  portalLogin: 'https://demoawsaptivepest.PestPortals.com/loginc/7452be0df8ddf0fdd0a02a3846015ab6$demoaptivepest$2868157',
  portalLoginExpires: '2023-10-04T15:30:54+00:00',
};

const mockedCustomerInfoData: CustomerInfoResponse = {
  name: 'Tendy Customer',
  isPhoneNumberValid: true,
  isEmailValid: true,
  statusName: 'Active',
  autoPay: true,
  officeId: 1,
  firstName: 'Tendy',
  lastName: 'Customer',
  email: 'tendy.esto+cust1@gmail.com',
  phoneNumber: '8707559155',
  balanceCents: 35050,
  isOnMonthlyBilling: false,
  dueDate: '2024-01-11',
  paymentProfileId: 5078812,
  autoPayProfileLastFour: '3333',
  isDueForStandardTreatment: true,
  lastTreatmentDate: '2023-10-11',
  subscription: {
    id: 2962747,
    serviceType: 'Pro',
    pricePerTreatment: 33,
    agreementDate: '2023-10-11',
    agreementLength: 12,
    specialtyPests: { 1: 'Rodent Outdoor pest' },
    isUpgradeAvailable: true,
  },
  currentPlan: {
    name: 'Pro',
    included_products: ['Indoor Fly Trap Service', 'Outdoor Wasp Trap Service'],
    subscription_start: '2024-01-16T00:45:39+00:00',
    subscription_end: '2025-01-16T00:45:39+00:00',
  },
};
export const CONFIGCAT_SDK_KEY = 'wiTbCHuCNkeKfI_d1eqT1Q/ssDQflaklEyO1mGSAMQKeA';

export const TestRoot = ({ children }: { children: React.ReactNode }) => (
  <RecoilRoot
    initializeState={snapshot => {
      snapshot.set(aptiveUserState, {
        accountId: '2868157',
        firstName: 'Tendy',
        lastName: 'Customer',
        email: 'tendy.esto+cust1@gmail.com',
      });
      snapshot.set(aptiveUserDataState, mockedUserDataState);
      snapshot.set(customerInfoDataState, mockedCustomerInfoData);
    }}
  >
    <QueryClientProvider client={queryClient}>
      <ConfigCatProvider sdkKey={CONFIGCAT_SDK_KEY}>
        <MemoryRouter initialEntries={['']}>{children}</MemoryRouter>
      </ConfigCatProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
