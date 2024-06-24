import { MakePaymentResponse } from './MakePaymentResponse';
import { AxiosResponse, AxiosError } from 'axios';

describe('MakePaymentResponse', () => {
  it('correctly sets data on successful response', () => {
    const mockResponse = {
      status: 200,
    } as AxiosResponse;

    const response = new MakePaymentResponse(mockResponse);

    expect(response.isSuccess()).toBeTruthy();
    expect(response.getStatus()).toBe(200);
    expect(response.getErrors()).toEqual({});
    expect(response.getMessage()).toBe('Payment Submitted');
  });

  it('handles undefined error response', () => {
    const mockErrorResponse = {
      response: undefined,
    } as AxiosError;

    const response = new MakePaymentResponse(mockErrorResponse);

    expect(response.isSuccess()).toBeFalsy();
    expect(response.getStatus()).toBeUndefined();
    expect(response.getErrors()).toEqual({});
    expect(response.getMessage()).toBe('Payment Submitted');
  });
});
