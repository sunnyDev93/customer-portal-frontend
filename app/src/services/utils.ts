import axios from 'axios';
import { Token } from '../constants/auth';

export function returnIfAptiveError(error: Error | unknown) {
  if (axios.isAxiosError(error)) {
    return {
      status: error.response?.status ?? 500,
      data: error.response?.data ?? null,
    };
  }
  throw error;
}

export class AptiveApiHeadersBuilder {
  private headers: { [key: string]: string | boolean } = {};

  withAuth() {
    this.headers['Authorization'] = `Bearer ${localStorage.getItem(Token.AccessToken)?.replace(/['"]+/g, '')}`;
    return this;
  }

  withInternalErrorSuppression() {
    this.headers['_client_internal_err_redirect'] = false;
    return this;
  }

  build() {
    return this.headers;
  }
}
