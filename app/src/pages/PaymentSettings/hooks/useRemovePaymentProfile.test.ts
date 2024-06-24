import { queryClient, TestRoot } from 'config/test/react-query';
import { useFeatureFlag } from 'configcat-react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { removeCustomerPaymentProfileHandler } from 'mocks/mock-handlers';
import { server } from 'mocks/server';

import { useRemovePaymentProfile } from './useRemovePaymentProfile';
import { QueryKeys } from 'constants/query-keys';

jest.mock('configcat-react');
const accountId = '123';
const paymentProfileId = 5074621;
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
describe('useRemovePaymentProfile', () => {
  describe('when request succeeded', () => {
    it('when request succeeded with legacy payment provider', async () => {
      isOn = true;
      server.use(removeCustomerPaymentProfileHandler.defaultHandler);
      const paymentProfiles = [
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
          id: '5074621',
          isAutoPay: true,
          isExpired: false,
          lastFour: '1117',
          paymentMethodType: 'CC',
        },
      ];
      queryClient.setQueryData(QueryKeys.GetCustomerPaymentProfiles, () => paymentProfiles);

      const { result } = renderHook(() => useRemovePaymentProfile(), { wrapper: TestRoot });

      act(() => {
        result.current.removePaymentProfileMutate({
          accountId,
          paymentProfileId,
        });
      });
      await waitFor(() => {
        const updatedPaymentProfiles = queryClient.getQueryData(QueryKeys.GetCustomerPaymentProfiles);
        expect(updatedPaymentProfiles).toStrictEqual([paymentProfiles[0]]);
      });
    });

    describe('when request failed', () => {
      it('should redirect to 500 error page', async () => {
        server.use(removeCustomerPaymentProfileHandler.errorHandler);
        const url = '/server-error';
        const { result } = renderHook(() => useRemovePaymentProfile(), { wrapper: TestRoot });

        act(() => {
          result.current.removePaymentProfileMutate({
            accountId,
            paymentProfileId,
          });
        });

        await waitFor(() => {
          expect(window.location.href).toBe(url);
        });
      });
    });
  });
});
