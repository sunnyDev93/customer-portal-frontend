import { AxiosResponse, AxiosError } from 'axios';
import { CustomerBillingInfoResponse } from './CustomerBillingInfoResponse';

describe('CustomerBillingInfoResponse', () => {
    it('should correctly set data on successful response', () => {
        const mockResponse = {
            status: 200,
            data: { uri: 'https://example.com' }
        } as AxiosResponse;

        const response = new CustomerBillingInfoResponse(mockResponse);

        expect(response.isSuccess()).toBeTruthy();
        expect(response.redirectUrl()).toBe('https://example.com');
        expect(response.getStatus()).toBe(200);
        expect(response.getErrors()).toEqual({});
        expect(response.getMessage()).toBe('successfully store data.');
    });

});
