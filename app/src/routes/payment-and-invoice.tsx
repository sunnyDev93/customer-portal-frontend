import { Outlet } from 'react-router-dom';

import WithSidebar from 'layouts/WithSidebar';
import AddPaymentMethodsPage from 'pages/AddPaymentMethods';
import MakePaymentPage from 'pages/MakePayments/MakePaymentPage';
import PaymentSettingsPage from 'pages/PaymentSettings';
import InvoiceHistoryPage from 'pages/InvoiceHistory/InvoiceHistoryPage';
import { SiteMap } from 'types';

export const MakePaymentsRoute = {
  key: 'MakePaymentsPage',
  label: 'Make a Payment',
  path: 'make-payments',
  trackingName: 'payments_and_invoices/make_a_payment',
  element: <MakePaymentPage />,
};

export const PaymentSettingsRoute = {
  key: 'PaymentSettingsPage',
  label: 'Payment Settings',
  path: 'payment-settings',
  fullPath: '/billing/payment-settings',
  trackingName: 'payments_and_invoices/payment_settings',
  element: <PaymentSettingsPage />,
};

export const AddPaymentMethodsRoute = {
  key: 'AddPaymentMethodsPage',
  label: 'Add Payment Method',
  path: 'add-payment-methods',
  trackingName: 'payments_and_invoices/add_payment_method',
  element: <AddPaymentMethodsPage />,
};

export const InvoiceHistoryRoute = {
  key: 'InvoiceHistoryPage',
  label: 'Invoice History',
  path: 'invoice-history',
  fullPath: 'invoice-history',
  trackingName: 'payments_and_invoices/invoice_history',
  element: <InvoiceHistoryPage />,
};

export const paymentAndInvoiceSiteMap: SiteMap = {
  MakePaymentsRoute,
  PaymentSettingsRoute,
  AddPaymentMethodsRoute,
  InvoiceHistoryRoute,
};

export const PaymentAndInvoiceRoot = {
  key: 'PaymentAndInvoiceRoot',
  label: 'Payments & Invoices',
  path: '/billing',
  element: (
    <WithSidebar siteMap={paymentAndInvoiceSiteMap}>
      <Outlet />
    </WithSidebar>
  ),
  children: paymentAndInvoiceSiteMap,
  default: PaymentSettingsRoute,
  defaultPath: '/billing/payment-settings',
  trackingName: 'payments_and_invoices',
};
