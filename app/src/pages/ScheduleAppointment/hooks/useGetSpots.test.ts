import { renderHook, waitFor } from '@testing-library/react';
import { TestRoot } from 'config/test/react-query';
import { getCustomerSpotsHandler } from 'mocks/mock-handlers';
import { server } from 'mocks/server';
import { useGetSpots } from './useGetSpots';

const accountId = '123';
const dateStart = '2022-01-01';
const dateEnd = '2022-01-31';

describe('useGetSpots', () => {
  describe('when request succeeded', () => {
    it('should get customer spots', async () => {
      const { result } = renderHook(() => useGetSpots(accountId, dateStart, dateEnd), { wrapper: TestRoot });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBe(undefined);
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toStrictEqual([{ date: '2022-07-29', time: 'AM', id: 2346234 }]);
    });
  });

  describe('when request failed', () => {
    it('should redirect to 500 error page', async () => {
      server.use(getCustomerSpotsHandler.errorHandler);
      const url = '/server-error';
      const { result } = renderHook(() => useGetSpots(accountId, dateStart, dateEnd), { wrapper: TestRoot });

      expect(result.current.data).toBe(undefined);

      await waitFor(() => {
        expect(window.location.href).toBe(url);
      });
    });
  });
});
