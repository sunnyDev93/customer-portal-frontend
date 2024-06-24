import { AxiosError, AxiosResponse } from 'axios';
import { toDollars } from '../helpers';
import { CustomerPaymentSettingsType } from '../types/CustomerTypes';

export class CustomerAutopayPaymentResponse {
  data: CustomerPaymentSettingsType | null = null;
  defaultErrorMessage = 'Something went wrong. Please refresh the page and try again.';
  error404Message = 'Fatal error';
  message = 'data fetched successfully';
  status: number | undefined = 0;

  constructor(props: AxiosResponse | AxiosError | undefined) {
    if (props) {
      props instanceof Error ? this.setError(props.response) : this.prepareData(props);
    } else {
      // Handle undefined case, set default values or handle as needed
      this.status = undefined;
      this.message = 'Response is undefined';
    }
  }

  prepareData(response: AxiosResponse) {
    this.status = response.status;
    this.data = { ...response?.data?.data?.attributes };
  }

  isSuccess() {
    return this.status === 200;
  }

  getStatus() {
    return this.status;
  }

  getMessage() {
    return this.message;
  }

  getNextPaymentAmount() {
    return this.data?.balanceCents && this.data?.balanceCents > 0 ? toDollars(this.data?.balanceCents / 100) : toDollars(0);
  }

  getNextPaymentAmountWithoutFormat() {
    return this.data?.balanceCents && this.data?.balanceCents > 0 ? this.data?.balanceCents : 0;
  }

  setError(response: AxiosResponse | undefined) {
    this.status = response?.status;
    this.setErrorMessage(response);
  }

  setErrorMessage(response: AxiosResponse | undefined) {
    if (this.getStatus() === 404) {
      this.message = this.error404Message;
    } else {
      this.message = response?.data.message !== '' ? response?.data.message : this.defaultErrorMessage;
    }
  }
}
