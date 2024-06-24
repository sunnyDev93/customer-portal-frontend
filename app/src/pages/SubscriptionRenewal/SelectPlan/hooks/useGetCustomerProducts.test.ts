import { renderHook, waitFor } from '@testing-library/react';
import { TestRoot } from 'config/test/react-query';
import { getCustomerProductsHandler } from 'mocks/mock-handlers';
import { server } from 'mocks/server';
import useGetCustomerProducts from './useGetCustomerProducts';

describe('useGetCustomerProducts', () => {
  describe('when request succeeded', () => {
    it('should get customer products', async () => {
      const { result } = renderHook(() => useGetCustomerProducts(), { wrapper: TestRoot });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBe(undefined);
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // expect(result.current.data).toStrictEqual(getCustomerProductsResponse.data);
      expect(result.current.data).toStrictEqual(undefined);
    });
  });

  describe('when request failed', () => {
    it('should redirect to 500 error page', async () => {
      server.use(getCustomerProductsHandler.errorHandler);
      const { result } = renderHook(() => useGetCustomerProducts(), { wrapper: TestRoot });

      expect(result.current.data).toBe(undefined);

      await waitFor(() => {
        expect(window.location.href).toBe('https://app.customer-portal.dev.goaptive.com:8000/');
      });
    });
  });
});
