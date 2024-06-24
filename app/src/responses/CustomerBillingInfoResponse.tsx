import { AxiosError, AxiosResponse } from 'axios';
import { ErrorsObject } from '../types';

export class CustomerBillingInfoResponse {
  url = '';
  defaultErrorMessage = 'Something went wrong. Please refresh the page and try again.';
  status: number | undefined = 0;
  message = 'successfully store data.';
  errorMessages: ErrorsObject = {};

  constructor(props: AxiosResponse | AxiosError) {
    props instanceof Error ? this.setError(props.response) : this.setResponse(props);
  }

  setResponse(response: AxiosResponse) {
    this.status = response.status;
    this.url = response.data.uri;
  }

  isSuccess() {
    return this.status === 200 || this.status === 201;
  }

  redirectUrl() {
    return this.url;
  }

  getStatus() {
    return this.status;
  }

  getErrors() {
    return this.errorMessages;
  }

  getMessage() {
    return this.message;
  }

  setError(response: AxiosResponse | undefined) {
    this.status = response?.status;
    this.setErrorMessage(response);
  }

  setErrorMessage(response: AxiosResponse | undefined) {
    this.message = response?.data.message;
    this.errorMessages = response?.data.errors;
  }
}
