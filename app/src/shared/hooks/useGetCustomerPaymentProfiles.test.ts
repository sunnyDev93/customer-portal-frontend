import { renderHook, waitFor } from '@testing-library/react';
import { TestRoot } from 'config/test/react-query';
import { getCustomerPaymentProfilesHandler } from 'mocks/mock-handlers';
import { server } from 'mocks/server';
import { useGetCustomerPaymentProfilesWrapper } from 'shared/hooks/useGetCustomerPaymentProfiles';
import { useFeatureFlag } from 'configcat-react';

const accountId = '123';
jest.mock('configcat-react');
const mockUseFeatureFlag = useFeatureFlag as jest.Mock;
let isOn = true;

beforeAll(() => {
  mockUseFeatureFlag.mockImplementation(() => {
    return {
      loading: false,
      value: isOn,
    };
  });
});
describe('useGetCustomerPaymentProfiles', () => {
  describe('when request succeeded', () => {
    it('should get customer payment profiles info when using legacy payment provider', async () => {
      isOn = true;
      server.use(getCustomerPaymentProfilesHandler.defaultHandler);

      const { result } = renderHook(() => useGetCustomerPaymentProfilesWrapper(accountId), { wrapper: TestRoot });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBe(undefined);
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toStrictEqual([
        {
          accountId: '123',
          accountType: 'Savings',
          bankName: 'GA Local bank',
          cardType: null,
          id: '5077613',
          isAutoPay: false,
          isExpired: false,
          lastFour: '9518',
          paymentMethodType: 'ACH',
        },
        {
          accountId: '123',
          accountType: 'Checking',
          bankName: '',
          cardType: 'Discover',
          id: '5078812',
          isAutoPay: true,
          isExpired: false,
          lastFour: '1117',
          paymentMethodType: 'CC',
        },
      ]);
    });
    it('should get customer payment profiles info when using new payment service', async () => {
      isOn = false;
      server.use(getCustomerPaymentProfilesHandler.defaultHandlerV2);

      const { result } = renderHook(() => useGetCustomerPaymentProfilesWrapper(accountId), { wrapper: TestRoot });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBe(undefined);
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('when request failed', () => {
    it('should redirect to 500 error page using legacy payment provider', async () => {
      isOn = true;
      server.use(getCustomerPaymentProfilesHandler.errorHandler);
      const url = '/server-error';
      const { result } = renderHook(() => useGetCustomerPaymentProfilesWrapper(accountId), { wrapper: TestRoot });

      expect(result.current.data).toBe(undefined);

      await waitFor(() => {
        expect(window.location.href).toBe(url);
      });
    });
    it('should redirect to 500 error page using new payment service', async () => {
      isOn = false;
      server.use(getCustomerPaymentProfilesHandler.errorHandlerV2);
      const url = '/server-error';
      const { result } = renderHook(() => useGetCustomerPaymentProfilesWrapper(accountId), { wrapper: TestRoot });

      expect(result.current.data).toBe(undefined);

      await waitFor(() => {
        expect(window.location.href).toBe(url);
      });
    });
  });
});
