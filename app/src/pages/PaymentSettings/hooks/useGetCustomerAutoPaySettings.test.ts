import { TestRoot } from 'config/test/react-query';
import { getCustomerAutoPaySettingsHandler } from 'mocks/mock-handlers';
import { getCustomerAutoPaySettingsResponse, getCustomerAutoPaySettingsResponseV2 } from 'mocks/responseMocks';
import { server } from 'mocks/server';

import { renderHook, waitFor } from '@testing-library/react';

import { useGetCustomerAutoPaySettings } from './useGetCustomerAutoPaySettings';
import { useFeatureFlag } from 'configcat-react';

jest.mock('configcat-react');
const accountId = '123';
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
describe('useGetCustomerAutoPaySettings', () => {
  describe('when request succeeded', () => {
    it('should return customer auto payment settings', async () => {
      const { result } = renderHook(() => useGetCustomerAutoPaySettings(accountId), { wrapper: TestRoot });

      expect(result.current.isLoading).toBe(true);
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      expect(result.current.nextPaymentAmount).toBe(0);
      expect(result.current.customerAutoPaySettings).toStrictEqual(getCustomerAutoPaySettingsResponse.data[0].attributes);
    });
    it('should return customer auto payment settings with new payment service', async () => {
      isOn = false;
      server.use(getCustomerAutoPaySettingsHandler.defaultHandlerV2);
      const { result } = renderHook(() => useGetCustomerAutoPaySettings(accountId), { wrapper: TestRoot });

      expect(result.current.isLoading).toBe(true);
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      expect(result.current.nextPaymentAmount).toBe(0);
      expect(result.current.customerAutoPaySettings).toStrictEqual(getCustomerAutoPaySettingsResponseV2.data[0].attributes);
    });
  });

  describe('when request failed', () => {
    it('should redirect to 500 error page', async () => {
      isOn = true;
      server.use(getCustomerAutoPaySettingsHandler.errorHandler);
      const url = '/server-error';
      renderHook(() => useGetCustomerAutoPaySettings(accountId), { wrapper: TestRoot });

      await waitFor(() => {
        expect(window.location.href).toBe(url);
      });
    });
  });
});
