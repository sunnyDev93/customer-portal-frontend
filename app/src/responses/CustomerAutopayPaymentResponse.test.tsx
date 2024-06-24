import { CustomerAutopayPaymentResponse } from './CustomerAutopayPaymentResponse';
import { AxiosResponse, AxiosError } from 'axios';

// Mock AxiosResponse and AxiosError for testing
const mockAxiosResponse: AxiosResponse = {
  status: 200,
  data: {
    data: {
      attributes: {
        balanceCents: 5000,
      },
    },
  },
} as AxiosResponse;

const mockAxiosError: AxiosError = {
  response: {
    status: 404,
    data: {
      message: 'Not found',
    },
  } as AxiosResponse,
} as AxiosError;

describe('CustomerAutopayPaymentResponse', () => {
  it('should handle a successful response', () => {
    const response = new CustomerAutopayPaymentResponse(mockAxiosResponse);

    expect(response.getStatus()).toBe(200);
    expect(response.isSuccess()).toBe(true);
    expect(response.getMessage()).toBe('data fetched successfully');
    expect(response.getNextPaymentAmount()).toBe('$50.00');
    expect(response.getNextPaymentAmountWithoutFormat()).toBe(5000);
  });

  it('should handle an error response', () => {
    const response = new CustomerAutopayPaymentResponse(mockAxiosError);

    expect(response.getStatus()).toBeUndefined();
    expect(response.isSuccess()).toBe(false);
    expect(response.getMessage()).toBe('data fetched successfully');
    // Since response is an error, the data and amount should be undefined
    expect(response.getNextPaymentAmount()).toBe('$0.00');
    expect(response.getNextPaymentAmountWithoutFormat()).toBe(0);
  });

  it('should handle an undefined response', () => {
    const response = new CustomerAutopayPaymentResponse(undefined);

    expect(response.getStatus()).toBeUndefined();
    expect(response.isSuccess()).toBe(false);
    expect(response.getMessage()).toBe('Response is undefined');
    // Since response is undefined, the data and amount should be undefined
    expect(response.getNextPaymentAmount()).toBe('$0.00');
    expect(response.getNextPaymentAmountWithoutFormat()).toBe(0);
  });
});
