import { TestRoot } from 'config/test/react-query';
import { getCustomerUpcomingAppointmentHandler } from 'mocks/mock-handlers';
import { getCustomerUpcomingAppointmentResponse } from 'mocks/responseMocks';
import { server } from 'mocks/server';
import { useGetCustomerUpcomingAppointment } from 'shared/hooks/useGetCustomerUpcomingAppointment';
import { renderHook, waitFor } from '@testing-library/react';
import { formattedResponse } from 'utils/response-formatter';

const accountId = '2868157';

describe('useGetCustomerUpcomingAppointment', () => {
  describe('when request succeeded', () => {
    it('should get customer upcoming appointment', async () => {
      const { result } = renderHook(() => useGetCustomerUpcomingAppointment(accountId), { wrapper: TestRoot });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBe(undefined);
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toStrictEqual(formattedResponse(getCustomerUpcomingAppointmentResponse));
    });
  });

  describe('when request failed', () => {
    it('should redirect to 500 error page', async () => {
      server.use(getCustomerUpcomingAppointmentHandler.errorHandler);
      const url = '/server-error';
      const { result } = renderHook(() => useGetCustomerUpcomingAppointment(accountId), { wrapper: TestRoot });

      expect(result.current.data).toBe(undefined);

      await waitFor(() => {
        expect(window.location.href).toBe(url);
      });
    });
  });
});
