import DashboardPage from 'pages/Dashboard';
import WithSidebar from 'layouts/WithSidebar';
import { Outlet } from 'react-router-dom';
import { RouteInfo, SiteMap } from 'types';
import DocumentPage from 'pages/Document';
import SubscriptionRenewalPage from 'pages/SubscriptionRenewal';

export const HomeRoute: RouteInfo = {
  key: 'HomeRoute',
  label: 'Home',
  path: '',
  trackingName: 'my_account/home',
  element: <DashboardPage />,
};

export const InboxRoute: RouteInfo = {
  key: 'InboxRoute',
  label: 'Inbox',
  path: 'inbox',
  trackingName: 'my_account/inbox',
  disabled: true,
  element: <div />,
};

export const MyPlanRoute: RouteInfo = {
  key: 'MyPlanRoute',
  label: 'My Plan',
  path: 'my-plan',
  trackingName: 'my_account/my_plan',
  disabled: true,
  element: <div />,
};

export const MyContactInfoRoute: RouteInfo = {
  key: 'MyContactInfoRoute',
  label: 'My Contact Info',
  path: 'my-contract-info',
  trackingName: 'my_account/my_contract_info',
  disabled: true,
  element: <div />,
};

export const PreferencesRoute: RouteInfo = {
  key: 'PreferencesRoute',
  label: 'Preferences',
  path: 'preferences',
  trackingName: 'my_account/preferences',
  disabled: true,
  element: <div />,
};

export const DocumentsRoute: RouteInfo = {
  key: 'DocumentsRoute',
  label: 'Documents',
  path: 'documents',
  trackingName: 'my_account/documents',
  element: <DocumentPage />,
};

export const SubscriptionRenewalRoute: RouteInfo = {
  key: 'SubscriptionRenewalRoute',
  label: 'Subscription Renewal',
  path: 'subscription-renewal',
  trackingName: 'my_account/subscription-renewal',
  element: <SubscriptionRenewalPage />,
};

export const myAccountSiteMap: SiteMap = {
  HomeRoute,
  InboxRoute,
  MyPlanRoute,
  MyContactInfoRoute,
  PreferencesRoute,
  DocumentsRoute,
  SubscriptionRenewalRoute,
};

export const MyAccountRoot = {
  key: 'MyAccountRoot',
  label: 'My Account',
  path: '/dashboard',
  element: (
    <WithSidebar siteMap={myAccountSiteMap}>
      <Outlet />
    </WithSidebar>
  ),
  children: myAccountSiteMap,
  default: HomeRoute,
  defaultPath: '/dashboard',
  trackingName: 'my_account',
};
