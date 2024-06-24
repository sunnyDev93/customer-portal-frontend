import { AxiosError, AxiosResponse } from 'axios';

import aptiveAPI from './config';
import { ACH, CustomerBillingPayload, TokenexCustomerBillingPayload } from '../types/CustomerTypes';
import {
  CreateCustomerPaymentResponse,
  CustomerAutoPaySettingsResponse,
  CustomerBillingInfoResponse,
  CustomerDocumentResponse,
  CustomerInfoResponse,
  CustomerPaymentProfileResponse,
  CustomerSpot,
  CustomerSpotsResponse,
  CustomerUpcomingAppointmentResponse,
  InvoiceType,
  ScheduleAppointmentRequest,
  Subscription,
  TokenexCustomerBillingInfoResponse,
  CustomerPaymentProfileResponseV2,
  CustomerProductResponse,
  CustomerProductUpgradesResponse,
} from 'types/request';
import { CompleteTransactionSetupPayload } from 'pages/WorldPay';

export const getCustomerByAccountNumber = async (accountNumber: string) => {
  try {
    const { data } = await aptiveAPI.get(`/customer/${accountNumber}`);
    return {
      status: 'success',
      data: data,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      status: err.response?.status || 500,
      data: err.response?.data || {},
    };
  }
};

export const sendNotificationToSMS = async (accountNumber: string) => {
  try {
    const { data } = await aptiveAPI.post(`/customer/${accountNumber}/notifications/sms`);
    return {
      status: 'success',
      data: data,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      status: err.response?.status || 500,
      data: err.response?.data || {},
    };
  }
};

export const sendNotificationToEmail = async (accountNumber: string) => {
  try {
    const { data } = await aptiveAPI.post(`/customer/${accountNumber}/notifications/email`);
    return {
      status: 'success',
      data: data,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      status: err.response?.status || 500,
      data: err.response?.data || {},
    };
  }
};

export const submitCustomerACHInformation = async (accountNumber: string, payload: ACH, version = 1) => {
  return aptiveAPI.post(`${generateApiUrlByVersion(version)}/customer/${accountNumber}/paymentprofiles/ach`, {
    ...payload,
    customer_id: accountNumber,
    check_type: 0,
  });
};

export const getTransactionBySlug = async (slug: string) => {
  try {
    const { data } = await aptiveAPI.get(`/transaction-setup/${slug}`);
    return {
      status: 'success',
      data: data,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      status: err.response?.status || 500,
      data: err.response?.data || {},
    };
  }
};

// Call API for react query
export function getCustomerInfo(accountId: string, versionApi = 1): Promise<CustomerInfoResponse> {
  return aptiveAPI.get(`${generateApiUrlByVersion(versionApi)}/customer/${accountId}`).then(response => response.data?.data?.attributes);
}
export function getCustomerAutoPaySettings(accountId: string, versionApi = 1): Promise<CustomerAutoPaySettingsResponse> {
  return aptiveAPI.get(`${generateApiUrlByVersion(versionApi)}/customer/${accountId}/autopay`).then(response => response.data);
}

export function getCustomerPaymentProfiles(
  accountId: string,
  params?: { statuses?: string[]; payment_methods?: string[] }
): Promise<CustomerPaymentProfileResponse> {
  return aptiveAPI.get(`${generateApiUrlByVersion(1)}/customer/${accountId}/paymentprofiles`, { params }).then(response => response.data);
}

export function getCustomerPaymentProfilesV2(
  accountId: string,
  params?: { statuses?: string[]; payment_methods?: string[] }
): Promise<CustomerPaymentProfileResponseV2> {
  return aptiveAPI.get(`${generateApiUrlByVersion(2)}/customer/${accountId}/paymentprofiles`, { params }).then(response => response.data);
}

export function createCustomerPayment<T>(accountId: string, payload: T, apiVersion = 1): Promise<CreateCustomerPaymentResponse> {
  return aptiveAPI.post(`${generateApiUrlByVersion(apiVersion)}/customer/${accountId}/payments`, payload);
}

export function removeCustomerPaymentProfile(accountNumber: string, paymentProfileId: number | string, apiVersion = 1): Promise<undefined> {
  return aptiveAPI
    .delete(
      `${generateApiUrlByVersion(apiVersion)}/${
        apiVersion === 2 ? 'customer' : 'user/accounts'
      }/${accountNumber}/paymentprofiles/${paymentProfileId}`
    )
    .then(response => response.data);
}

export function getCustomerUpcomingAppointment(accountNumber: string): Promise<CustomerUpcomingAppointmentResponse> {
  return aptiveAPI.get(`/customer/${accountNumber}/appointments/upcoming`).then(response => response.data);
}

export function getCustomerDocuments(accountNumber: string): Promise<CustomerDocumentResponse> {
  return aptiveAPI.get(`${generateApiUrlByVersion(2)}/customer/${accountNumber}/documents`).then(response => response.data);
}

export function cancelCustomerUpcomingAppointment(accountNumber: string, appointmentId: string): Promise<undefined> {
  return aptiveAPI.delete(`/customer/${accountNumber}/appointments/${appointmentId}`).then(response => response.data);
}

export function getCustomerSpots(accountNumber: string, payload: { dateStart: string; dateEnd: string }): Promise<CustomerSpotsResponse> {
  return aptiveAPI
    .post(`${generateApiUrlByVersion(1)}/customer/${accountNumber}/spots`, { date_start: payload.dateStart, date_end: payload.dateEnd })
    .then(response => response.data);
}

export function getCustomerInvoices(accountNumber: string): Promise<InvoiceType[]> {
  return aptiveAPI.get(`/customer/${accountNumber}/invoices`).then(response => response.data.data);
}

export function getCustomerSubscriptions(accountNumber: string): Promise<Subscription[]> {
  return aptiveAPI.get(`/customer/${accountNumber}/subscriptions`).then(response => response.data.data);
}

export const getDirectCustomerAppointmentsHistory = (accountNumber: string) => {
  return aptiveAPI.get(`/customer/${accountNumber}/appointments/history`).then(response => response.data.data);
};

export function submitCustomerBillingInfo<T>(
  accountId: string,
  payload: CustomerBillingPayload,
  version = 1
): Promise<CustomerBillingInfoResponse> {
  return aptiveAPI
    .post(`${generateApiUrlByVersion(version)}/customer/${accountId}/paymentprofiles/credit-card`, {
      ...payload,
      auto_pay: Number(payload.auto_pay),
    })
    .then(response => response.data);
}

export function submitTokenexCustomerBillingInfo(
  accountId: string,
  payload: TokenexCustomerBillingPayload
): Promise<TokenexCustomerBillingInfoResponse> {
  return aptiveAPI
    .post(`${generateApiUrlByVersion(2)}/customer/${accountId}/paymentprofiles/credit-card`, payload)
    .then(response => response.data);
}

export const completeTransactionSetup = (
  accountNumber: string,
  transactionId: string,
  payload: CompleteTransactionSetupPayload,
  token: string,
  authType: string
) => {
  return aptiveAPI
    .post(`/customer/${accountNumber}/paymentprofiles/credit-card/${transactionId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Auth-Type': authType,
      },
    })
    .then(response => response.data);
};

export function getAvailableSpots(accountNumber: string): Promise<CustomerSpot[]> {
  return aptiveAPI.get(`${generateApiUrlByVersion(2)}/customer/${accountNumber}/spots`).then(response => response.data.data);
}

export function scheduleAnAppointment(accountNumber: string, payload: ScheduleAppointmentRequest): Promise<AxiosResponse> {
  return aptiveAPI.post(`${generateApiUrlByVersion(2)}/customer/${accountNumber}/appointments`, {
    spot_id: payload.spotId,
    window: payload.window,
    is_aro_spot: payload.isAroSpot,
    notes: payload.notes,
  });
}

export const getPaymentServiceAuthToken = async (payload: { origin: string; timestamp: string }) => {
  const { data: resData } = await aptiveAPI.post(`${generateApiUrlByVersion(2)}/payment-service/auth-token`, payload);
  return {
    status: 200,
    data: resData,
  };
};

export function getProductsForCustomer(accountNumber: string): Promise<CustomerProductResponse> {
  return aptiveAPI.get(`${generateApiUrlByVersion(2)}/customer/${accountNumber}/products`).then(response => response.data.data);
}

export function getProductUpgradesForCustomer(accountNumber: string): Promise<CustomerProductUpgradesResponse> {
  return aptiveAPI.get(`${generateApiUrlByVersion(2)}/customer/${accountNumber}/upgrades`).then(response => response.data.data);
}

export function rescheduleAppointment(
  accountNumber: string,
  appointmentId: string,
  payload: ScheduleAppointmentRequest
): Promise<AxiosResponse> {
  return aptiveAPI.patch(`${generateApiUrlByVersion(2)}/customer/${accountNumber}/appointments/${appointmentId}`, {
    spot_id: payload.spotId,
    window: payload.window,
    is_aro_spot: payload.isAroSpot,
    notes: payload.notes,
  });
}

export function generateApiUrlByVersion(version: number) {
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost/api/v1';

  if (baseUrl.includes(`/v${version}`)) {
    return baseUrl;
  }

  return baseUrl.replace(/\/v[0-9]+[/]?/, `/v${version}`);
}
