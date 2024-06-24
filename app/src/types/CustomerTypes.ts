import { ReactNode } from 'react';

export interface Customer {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  balance_cents: number;
}

export interface ACH {
  customer_id: string;
  billing_name: string;
  billing_address_line_1: string;
  billing_address_line_2?: string;
  billing_city: string;
  billing_state: string;
  billing_zip: string;
  bank_name: string;
  routing_number: string;
  account_number: string;
  account_number_confirmation: string;
  // account_nickname?: string;
  check_type: number;
  account_type: number;
  auto_pay: boolean | number;
}

export interface ACHV2 {
  customer_id: string;
  billing_name: string;
  billing_address_line_1: string;
  billing_address_line_2?: string;
  billing_city: string;
  billing_state: string;
  billing_zip: string;
  bank_name: string;
  routing_number: string;
  account_number: string;
  account_number_confirmation: string;
  check_type: number;
  account_type: 'personal_checking' | 'personal_savings' | 'business_checking' | 'business_savings';
  auto_pay: boolean | number;
  cc_type: 'VISA' | 'MASTERCARD' | 'AMEX' | 'DISCOVER' | 'OTHER';
}

export interface TransactionCustomerObject {
  email: string;
  first_name: string;
  id: string;
  is_email_valid: boolean;
  is_phone_number_valid: boolean;
  last_name: string;
  name: string;
  officeID: string;
  office_id: number;
  phone_number: string;
  status_name: string;
}

export interface CustomerTransaction {
  accountNumber: number;
  billing_address_line_1: string;
  billing_address_line_2?: string;
  billing_city: string;
  billing_name: string;
  billing_state: string;
  billing_zip: string;
  created_at: string;
  customer: TransactionCustomerObject;
  deleted_at: string;
  id: number;
  last_4: string;
  slug: string;
  status: string;
  transaction_setup_id: string;
  updated_at: string;
}

export interface paymentProfileType {
  customerID: number;
  description: string;
  status: number;
  billingName: string;
  billingAddress1: string;
  billingAddress2: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingPhone: string;
  billingEmail: string;
  paymentMethod: number;
  merchantID: string;
  lastFour: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  checkType: boolean;
  accountType: boolean;
  id: number;
  cardType: string;
  expMonth: string;
  expYear: string;
  isExpired: boolean;
}

export interface CustomerBillingPayload {
  billing_address_line_1: string;
  billing_address_line_2?: string;
  billing_city: string;
  billing_name: string;
  billing_state: string;
  billing_zip: string;
  auto_pay: boolean;
  // account_nickname?: string;
}

export interface TokenexCustomerBillingPayload extends CustomerBillingPayload {
  card_type: string;
  cc_token: string;
  cc_expiration_month: number;
  cc_expiration_year: number;
  description?: string;
  cc_last_four: string;
  cc_type: 'VISA' | 'MASTERCARD' | 'AMEX' | 'DISCOVER' | 'OTHER';
}

export interface PaymentPayload {
  amount_cents: number;
  payment_method: 'CC' | 'ACH';
  payment_profile_id: number;
}

export interface ErrorsObject {
  [key: string]: any;
}

export interface PaymentProfile {
  id: number;
  customer_id: number;
  description: string;
  billing_name: string;
  payment_method: 'CC' | 'ACH';
  lastFour: string;
  cardType: string;
}

export interface paymentProfileType {
  customerID: number;
  description: string;
  status: number;
  billingName: string;
  billingAddress1: string;
  billingAddress2: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingPhone: string;
  billingEmail: string;
  paymentMethod: number;
  merchantID: string;
  lastFour: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  checkType: boolean;
  accountType: boolean;
  id: number;
}

export interface AutoPayAttribute {
  cardLastFour: string;
  cardType: string;
  isEnabled: boolean;
  nextPaymentAmount: string;
  nextPaymentDate: string;
  planName: string;
  preferredBillingDate: string;
}

export interface CustomerPaymentSettingsType {
  autoPayProfileLastFour: string;
  balanceCents: number;
  dueDate: string;
  first_name: string;
  id?: number;
  isEmailValid: boolean;
  isPhoneNumberValid: boolean;
  lastName: string;
  name: string;
  officeID: number;
  officeId: number;
  phoneNumber: string;
  statusName: string;
  autoPay: boolean;
}

export interface DocumentAttribute {
  officeId: number;
  customerId: number;
  dateAdded: Date;
  addedBy: number;
  showCustomer: boolean;
  showTech: boolean;
  appointmentId: number;
  prefix: string;
  description: string;
  documentLink: string;
}

export interface DocumentType {
  type: string;
  id: number;
  attributes: DocumentAttribute;
}

export interface DataTableFieldType {
  heading: string;
  key: string;
  link?: string;
  downloadable?: boolean;
  className?: string;
  headerClassName?: string;
  itemClassName?: string;
  itemShouldRender?: (item: any) => ReactNode;
  headerShouldRender?: () => ReactNode;
}

export interface AppointmentHistoryAttribute {
  officeId: number;
  customerId: number;
  subscriptionId: number;
  subscriptionRegionId: number;
  routeId: number;
  spotId: number;
  start: string;
  end: string;
  duration: string;
  serviceTypeId: number;
  dateAdded: string;
  employeeId: number;
  status: number;
  callAhead: number;
  isInitial: boolean;
  completedBy: number;
  servicedBy: number;
  dateCompleted: string;
  notes: string;
  officeNotes: string;
  timeIn: string;
  timeOut: string;
  checkIn: string;
  checkOut: string;
  windSpeed: number;
  windDirection: string;
  temperature: number;
  amountCollected: number;
  paymentMethod: number;
  servicedInterior: boolean;
  ticketId: number;
  dateCancelled: string;
  additionalTechs?: any;
  cancellationReason?: string;
  targetPests?: any;
  appointmentNotes?: string;
  doInterior: boolean;
  dateUpdated: string;
  cancelledBy?: string;
  assignedTech?: string;
  latIn: number;
  latOut: number;
  longIn: number;
  longOut: number;
  sequence: number;
  lockedBy: number;
  unitIds: any;
}

export interface CustomerAppointmentHistoryType {
  type: string;
  id: number;
  attributes: AppointmentHistoryAttribute;
  relationships: {
    documents: {
      data: [
        {
          type: string;
          id: number;
        }
      ];
    };
  };
}

export interface CustomerType {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  statusName: string;
  officeId: number;
  isPhoneNumberValid: boolean;
  isEmailValid: boolean;
  autoPay: boolean;
  autoPayProfileLastFour: string;
  balanceCents: number;
  dueDate: string;
  isDueForStandardTreatment: boolean;
  lastTreatmentDate: string;
  isOnMonthlyBilling: boolean;
  paymentProfileId: number | null;
}

export interface InvoiceItems {
  id: number;
  ticketId: number;
  description: string;
  quantity: number;
  amount: number;
  isTaxable: boolean;
  creditTo: number;
  productId: number;
  serviceId: number;
  unitId?: number;
  category?: string;
  code?: string;
  dynamicPriceNumber?: number;
  glNumber?: string;
  unitOfMeasure?: number;
  measurementSf?: number;
  measurementLf?: number;
  qboAccountIdAr?: number;
  qboAccountIdInc?: number;
  qboAccountIdTax?: number;
  prepaymentAmount?: number;
}

export interface InvoiceAttribute {
  customerId: number;
  billToAccountId: number;
  officeId: number;
  dateCreated: string;
  invoiceDate: string;
  dateUpdated: string;
  active: number;
  subTotal: number;
  taxAmount: number;
  total: number;
  serviceCharge: number;
  isServiceTaxable: boolean;
  productionValue: number;
  taxRate: number;
  appointmentId: number;
  balance: number;
  subscriptionId?: number;
  autoGenerated?: number;
  autoGeneratedType?: string;
  renewalId?: number;
  serviceId: number;
  items: Array<InvoiceItems>;
  invoiceNumber: number;
  templateType?: number;
  glNumber?: number;
}

export interface InvoiceType {
  attributes: InvoiceAttribute;
  id: number;
  type: string;
}
