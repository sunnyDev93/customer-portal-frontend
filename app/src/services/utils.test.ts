import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {returnIfAptiveError, AptiveApiHeadersBuilder} from './utils';
// Update with the correct path

// Mock axios
jest.mock('axios');

describe('API Utility Functions', () => {
    describe('returnIfAptiveError', () => {
        it('should throw an error if not an axios error', () => {
            const regularError = new Error('Some error');

            expect(() => returnIfAptiveError(regularError)).toThrowError('Some error');
        });
    });

    describe('AptiveApiHeadersBuilder', () => {
        it('should build headers with auth', () => { // Mock localStorage.getItem

            const headers = new AptiveApiHeadersBuilder().withAuth().build();

            expect(headers).toEqual({Authorization: 'Bearer undefined'});
        });

        it('should build headers with internal error suppression', () => {
            const headers = new AptiveApiHeadersBuilder().withInternalErrorSuppression().build();

            expect(headers).toEqual({_client_internal_err_redirect: false});
        });

        it('should build headers with both auth and internal error suppression', () => {
            const headers = new AptiveApiHeadersBuilder().withAuth().withInternalErrorSuppression().build();

            expect(headers).toEqual({Authorization: 'Bearer undefined', _client_internal_err_redirect: false});
        });
    });
});
