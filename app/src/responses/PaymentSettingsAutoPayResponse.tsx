import { AxiosError, AxiosResponse } from 'axios';
import { AutoPayAttribute } from '../types/CustomerTypes';
import { toDollars } from '../helpers';

interface APIResponseProps {
  attributes: AutoPayAttribute;
  id: number;
  type: string;
}

export class PaymentSettingsAutoPayResponse {
  data: AutoPayAttribute | null = null;
  nextPaymentAmountSum = 0;
  defaultErrorMessage = 'Fatal error.';
  message = 'data fetched successfully';
  status: number | undefined = 0;

  constructor(props: AxiosResponse | AxiosError) {
    props instanceof Error ? this.setError(props.response) : this.prepareData(props);
  }

  prepareData(response: AxiosResponse) {
    this.status = response.status;

    this.nextPaymentAmountSum = this.calculateNextPaymentAmount(response.data?.data);

    const searchAttribute = response.data?.data.find((data: APIResponseProps) => this.isMonthToMonth(data?.attributes.planName));

    this.data = typeof searchAttribute === 'undefined' ? response.data?.data[0].attributes : searchAttribute.attributes;
  }

  isSuccess() {
    return this.status === 200;
  }

  getStatus() {
    return this.status;
  }

  getCardLastFour() {
    return this.data?.cardLastFour;
  }

  getCardTypeOrACH() {
    return this.data?.cardType ?? 'Bank Account ';
  }

  getNextPaymentAmountSum() {
    return toDollars(this.nextPaymentAmountSum);
  }

  getPaymentMethodIdentifier() {
    return this.getCardLastFour() ? `ending in ${this.getCardLastFour()}` : '';
  }

  getMessage() {
    return this.message;
  }

  isMonthToMonth(planName: string | undefined): boolean {
    return planName ? planName.includes('30 day') : false;
  }

  isRecurring() {
    return this.isMonthToMonth(this.data?.planName);
  }

  getNextPaymentDate() {
    return this.data?.preferredBillingDate ?? '-';
  }

  getAutPayStatus(): string {
    return this.data?.isEnabled ? 'Enabled' : 'Not Enabled';
  }

  getEnabled() {
    return this.data?.isEnabled;
  }

  setError(response: AxiosResponse | undefined) {
    this.status = response?.status;
    this.setErrorMessage(response);
  }

  setErrorMessage(response: AxiosResponse | undefined) {
    this.message = response?.data.message !== '' ? response?.data.message : this.defaultErrorMessage;
  }

  calculateNextPaymentAmount(data: Array<APIResponseProps>) {
    let sum = 0;
    if(data && typeof data === 'object') {
      for (const row of Object.values(data)) {
        sum += parseFloat(row?.attributes.nextPaymentAmount ?? 0);
      }
    }

    return sum;
  }
}
