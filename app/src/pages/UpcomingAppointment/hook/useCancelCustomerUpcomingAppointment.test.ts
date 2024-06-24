import { act, renderHook, waitFor } from '@testing-library/react';
import { queryClient, TestRoot } from 'config/test/react-query';
import { QueryKeys } from 'constants/query-keys';
import { cancelCustomerAppointmentHandler } from 'mocks/mock-handlers';
import { getCustomerUpcomingAppointmentResponse } from 'mocks/responseMocks';
import { server } from 'mocks/server';
import { useCancelCustomerUpcomingAppointment } from './useCancelCustomerUpcomingAppointment';

const accountId = '123';
const appointmentId = '456';

describe('useCancelCustomerUpcomingAppointment', () => {
  describe('when request succeeded', () => {
    it('should delete the contract owner successfully', async () => {
      queryClient.setQueryData(QueryKeys.GetCustomerUpcomingAppointment, { ...getCustomerUpcomingAppointmentResponse });

      const { result } = renderHook(() => useCancelCustomerUpcomingAppointment(), { wrapper: TestRoot });
      act(() => {
        result.current.cancelCustomerUpcomingAppointmentMutate({
          accountId,
          appointmentId,
        });
      });

      await waitFor(() => {
        const updatedPaymentProfiles = queryClient.getQueryData(QueryKeys.GetCustomerUpcomingAppointment);

        expect(updatedPaymentProfiles).toStrictEqual({ ...getCustomerUpcomingAppointmentResponse, data: [] });
      });
    });
  });

  describe('when request failed', () => {
    it('should redirect to 500 error page', async () => {
      server.use(cancelCustomerAppointmentHandler.errorHandler);
      const url = '/server-error';
      const { result } = renderHook(() => useCancelCustomerUpcomingAppointment(), { wrapper: TestRoot });

      act(() => {
        result.current.cancelCustomerUpcomingAppointmentMutate({
          accountId,
          appointmentId,
        });
      });
      await waitFor(() => {
        expect(window.location.href).toBe(url);
      });
    });
  });
});
