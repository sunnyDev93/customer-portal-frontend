import { PaymentSettingsAutoPayResponse } from './PaymentSettingsAutoPayResponse';
import { AxiosResponse, AxiosError } from 'axios';
import { AutoPayAttribute } from '../types/CustomerTypes'; // Adjust the import path as necessary

// Mock data
const mockAutoPayAttribute: AutoPayAttribute = {
  cardLastFour: "XXX",
  cardType: "XXX",
  isEnabled: false,
  nextPaymentAmount: "12",
  nextPaymentDate: "2023-11-12",
  planName: "XXX",
  preferredBillingDate: "2023-12-12",
};

const mockAPIResponse: {
  attributes: AutoPayAttribute;
  id: number;
  type: string;
} = {
  attributes: mockAutoPayAttribute,
  id: 123,
  type: 'exampleType'
};

const mockSuccessfulResponse = {
  status: 200,
  data: {
    data: [mockAPIResponse]
  }
} as AxiosResponse;

const mockErrorResponse = {
  response: {
    status: 400,
    data: { message: 'Error occurred' }
  }
} as AxiosError;

describe('PaymentSettingsAutoPayResponse', () => {
  it('correctly sets data on successful response', () => {
    const response = new PaymentSettingsAutoPayResponse(mockSuccessfulResponse);

    expect(response.isSuccess()).toBeTruthy();
    expect(response.getStatus()).toBe(200);
    expect(response.getPaymentMethodIdentifier()).not.toBe('');
    expect(response.getMessage()).toBe('data fetched successfully');
  });

  it('correctly identifies month-to-month plans', () => {
    expect(new PaymentSettingsAutoPayResponse(mockSuccessfulResponse).isMonthToMonth('30 day plan')).toBeTruthy();
    expect(new PaymentSettingsAutoPayResponse(mockSuccessfulResponse).isMonthToMonth('annual plan')).toBeFalsy();
  });

});
