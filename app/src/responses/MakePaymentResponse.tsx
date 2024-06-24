import { AxiosError, AxiosResponse } from 'axios';
import { ErrorsObject } from '../types';

export class MakePaymentResponse {
  status: number | undefined = 0;
  message = 'Payment Submitted';
  errors: ErrorsObject = {};

  constructor(props: AxiosResponse | AxiosError) {
    props instanceof Error ? this.setError(props.response) : this.setResponse(props);
  }

  setResponse(response: AxiosResponse) {
    this.status = response.status;
  }

  isSuccess() {
    return this.status === 200;
  }

  getStatus() {
    return this.status;
  }

  getErrors() {
    return this.errors;
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
    this.errors = response?.data.errors;
  }
}
