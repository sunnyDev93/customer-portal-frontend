import { renderHook, waitFor } from '@testing-library/react';
import { TestRoot } from 'config/test/react-query';
import { getCustomerInfoHandler } from 'mocks/mock-handlers';
import { getCustomerInfoResponse } from 'mocks/responseMocks';
import { server } from 'mocks/server';
import { useGetCustomerInfo } from 'shared/hooks/useGetCustomerInfo';

const accountId = '123';

jest.mock('configcat-react', () => ({
  useFeatureFlag: () => ({ value: true }),
}));
describe('useGetCustomerInfo', () => {
  describe('when request succeeded', () => {
    it('should get customer info', async () => {
      const { result } = renderHook(() => useGetCustomerInfo(accountId), { wrapper: TestRoot });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBe(undefined);
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      expect(result.current.data).toStrictEqual(getCustomerInfoResponse.data.attributes);
    });
  });

  describe('when request failed', () => {
    it('should redirect to 500 error page', async () => {
      server.use(getCustomerInfoHandler.errorHandler);
      const url = '/server-error';
      const { result } = renderHook(() => useGetCustomerInfo(accountId), { wrapper: TestRoot });

      expect(result.current.data).toBe(undefined);
      await waitFor(() => {
        expect(window.location.href).toBe(url);
      });
    });
  });
});
