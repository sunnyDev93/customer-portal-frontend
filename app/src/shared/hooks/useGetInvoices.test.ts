import { renderHook, waitFor } from '@testing-library/react';
import { TestRoot } from 'config/test/react-query';
import { getInvoicesHandler } from 'mocks/mock-handlers';
import { getInvoicesResponse } from 'mocks/responseMocks';
import { server } from 'mocks/server';
import { useGetCustomerInvoices } from 'shared/hooks/useGetInvoices';

describe('useGetCustomerInvoices', () => {
  describe('when request succeeded', () => {
    it('should get customer invoices', async () => {
      const { result } = renderHook(() => useGetCustomerInvoices(), { wrapper: TestRoot });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBe(undefined);
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toStrictEqual(getInvoicesResponse.data);
    });
  });

  describe('when request failed', () => {
    it('should redirect to 500 error page', async () => {
      server.use(getInvoicesHandler.errorHandler);
      const url = '/server-error';
      const { result } = renderHook(() => useGetCustomerInvoices(), { wrapper: TestRoot });

      expect(result.current.data).toBe(undefined);

      await waitFor(() => {
        expect(window.location.href).toBe(url);
      });
    });
  });
});
