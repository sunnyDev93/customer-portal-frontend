import { AxiosError } from 'axios';
import aptiveAPI from './config';
import { Token } from '../constants/auth';

export const getSpots = async (accountNumber: string, payload: { date_start: string; date_end: string }) => {
  try {
    const { data } = await aptiveAPI.post(
      `${generateApiUrlByVersion(1)}/customer/${accountNumber}/spots`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(Token.AccessToken)?.replace(/['"]+/g, '')}`,
        },
      }
    );
    return {
      status: 200,
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

export const scheduleAppointment = async (accountNumber: string, payload: { spotId: number; notes?: string }) => {
  try {
    const { data } = await aptiveAPI.put(
      `${generateApiUrlByVersion(1)}/customer/${accountNumber}/appointment`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(Token.AccessToken)?.replace(/['"]+/g, '')}`,
        },
      }
    );
    return {
      status: 200,
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

export const rescheduleAppointment = async (accountNumber: string, appointmentId: string, payload: { spotId: number; notes?: string }) => {
  try {
    const { data } = await aptiveAPI.patch(
      `${generateApiUrlByVersion(1)}/customer/${accountNumber}/appointment/${appointmentId}`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(Token.AccessToken)?.replace(/['"]+/g, '')}`,
        },
      }
    );
    return {
      status: 200,
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

export const cancelAppointment = async (accountNumber: string, appointmentId: string) => {
  try {
    const { data } = await aptiveAPI.delete(`/customer/accounts/${accountNumber}/appointments/${appointmentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(Token.AccessToken)?.replace(/['"]+/g, '')}`,
      },
    });
    return {
      status: 200,
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

export function generateApiUrlByVersion(version: number) {
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost/api/v1';

  if (baseUrl.includes(`/v${version}`)) {
    return baseUrl;
  }

  return baseUrl.replace(/\/v[0-9]+[/]?/, `/v${version}`);
}
