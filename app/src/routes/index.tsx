import AuthLayout from 'layouts/AuthLayout';
import AuthPage from 'pages/AuthPage';
import LogoutPage from 'pages/LogoutPage';
import NotVerified from 'pages/NotVerified';
import UserNotFound from 'pages/UserNotFound';
import InternalServerError from 'pages/InternalServerError';
import MaintenancePage from 'pages/MaintenancePage';
import { Navigate, Outlet, Route } from 'react-router-dom';
import { RouteInfo, SiteMap } from 'types';
import EmptyAccountPage from 'pages/EmptyAccountPage';
import PageNotFound from 'pages/PageNotFound';
import WorldPayPage from 'pages/WorldPay';
import MainLayout from 'layouts/MainLayout';
import { MyAccountRoot } from 'routes/my-account';
import { PaymentAndInvoiceRoot } from 'routes/payment-and-invoice';
import { AppointmentsRoot } from 'routes/appointments';
import MagicLink from '../pages/MagicLink';
import MagicLinkExpired from 'pages/MagicLinkExpired';
import RedirectPage from '../pages/Redirect';

export const authRoute: RouteInfo = {
  key: 'AuthPage',
  label: 'Auth',
  path: '/',
  element: <AuthPage />,
};

export const authLayoutRoute: RouteInfo = {
  key: 'Root',
  label: 'Root',
  path: '/',
  element: (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
  children: {
    LogoutPage: {
      key: 'LogoutPage',
      label: 'Logout',
      path: '/logout',
      element: <LogoutPage />,
    },
    NotVerified: {
      key: 'NotVerified',
      label: 'Not Verified',
      path: '/not-verified',
      element: <NotVerified />,
    },
    UserNotFound: {
      key: 'UserNotFound',
      label: 'Not Found',
      path: '/not-found',
      element: <UserNotFound />,
    },
    InternalServerError: {
      key: 'InternalServerError',
      label: 'Server Error',
      path: '/server-error',
      element: <InternalServerError />,
    },
    PageNotFound: {
      key: 'PageNotFound',
      label: 'Page Not Found',
      path: '*',
      element: <PageNotFound />,
    },
    EmptyAccountPage: {
      key: 'EmptyAccountPage',
      label: 'Empty Account Page',
      path: '/empty-account-page',
      element: <EmptyAccountPage />,
    },
    MaintenancePage: {
      key: 'MaintenancePage',
      label: 'Maintenance Page',
      path: '/maintenance',
      element: <MaintenancePage />,
    },
    SignInRoute: {
      key: 'SignInRoute',
      label: 'SignIn',
      path: '/sign-in',
      element: <Navigate to={MyAccountRoot.path} />,
    },
    WorldPayRoute: {
      key: 'WorldPayRoute',
      label: 'Make a Payment',
      path: '/worldpay/transaction-setup-callback',
      element: <WorldPayPage />,
    },
  },
};

export const mainLayoutRoute: RouteInfo = {
  key: 'Root',
  label: 'Root',
  path: '/',
  element: (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
  children: {
    MyAccountRoot,
    PaymentAndInvoiceRoot,
    AppointmentsRoot,
  },
};

export const navLinkRoute: RouteInfo = {
  key: 'Root',
  label: '',
  path: '',
  element: (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
  children: {
    MyAccountRoot,
    PaymentAndInvoiceRoot,
    AppointmentsRoot,
  },
};

export const fusionAuthRedirectRoute: RouteInfo = {
  key: 'FusionAuthRedirectRoute',
  label: 'Fusion Auth Redirect',
  path: '/redirect',
  element: (
    <AuthLayout>
      <RedirectPage />
    </AuthLayout>
  ),
};
export const magicLinkRoute: RouteInfo = {
  key: 'MagicLinkRoute',
  label: 'Magic Link',
  path: '/magic-link/:token',
  element: (
    <AuthLayout>
      <MagicLink />
    </AuthLayout>
  ),
};

export const magicLinkExpiredRoute: RouteInfo = {
  key: 'MagicLinkExpiredRoute',
  label: 'Magic Link Expired',
  path: '/magic-link-expired',
  element: (
    <AuthLayout>
      <MagicLinkExpired />
    </AuthLayout>
  ),
};

export const renderRoute = (route: RouteInfo) => (
  <Route key={route.key} path={route.path} element={route.element}>
    {route?.children && renderSiteMap(route.children)}
  </Route>
);

export const renderSiteMap = (siteMap: SiteMap) => Object.values(siteMap).map(route => renderRoute(route));
