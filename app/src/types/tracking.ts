import { PathEntity } from '../constants/routes';

export type TrackingType = 'clicked' | 'view' | '';

export type TrackingRoot =
  | 'account'
  | 'navigation'
  | 'home'
  | 'documents'
  | 'payment'
  | 'setting'
  | 'make_a_payment'
  | 'add_payment_method'
  | 'invoice_history'
  | 'appointments'
  | 'upcoming'
  | 'schedule'
  | string;

export interface TrackingItem {
  date_created: string;
  product: string;
  from: string;
  name: string;
}
export const SpecialTrackingRootMap: {
  [key: PathEntity]: TrackingRoot;
} = {
  '/dashboard': 'account/home',
};
export const TrackingRootMap: {
  [key: PathEntity]: TrackingRoot;
} = {
  logout: 'logout',
  'not-verified': 'not_verified',
  'not-found': 'not_found',
  'server-error': 'server_error',
  'empty-account-page': 'empty_account_page',
  'sign-in': 'sign_in',
  worldpay: 'worldpay',
  'transaction-setup-callback': 'transaction_setup_callback',
  dashboard: 'account',
  documents: 'documents',
  inbox: 'inbox',
  'my-plan': 'my_plan',
  'my-contract-info': 'my_contract_info',
  preferences: 'preferences',
  billing: 'payments',
  'make-payments': 'make_a_payment',
  'payment-settings': 'setting',
  'add-payment-methods': 'add_payment_method',
  'invoice-history': 'invoice_history',
  appointments: 'appointments',
  upcoming: 'upcoming',
  scheduleWrapper: 'schedule',
  schedule: 'schedule',
  reschedule: 'schedule',
  history: 'history',
};
