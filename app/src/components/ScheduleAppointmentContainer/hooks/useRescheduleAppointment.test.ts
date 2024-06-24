import { renderHook } from '@testing-library/react';
import { TestRoot } from 'config/test/react-query';
import useRescheduleAppointment from './useRescheduleAppointment';

const payload = {
  spotId: '123',
  window: 'AM',
  isAroSpot: true,
  notes: 'notes',
};

describe('useRescheduleAppointment', () => {
  describe('when request succeeded', () => {
    it('should cancel customer appointment', async () => {
      const { result } = renderHook(() => useRescheduleAppointment(), { wrapper: TestRoot });

      // Call the hook function
      const { rescheduleAppointmentMutate } = result.current;

      const response = await rescheduleAppointmentMutate({ appointmentId: '123', payload });

      // Verify that the response has a status of 201
      expect(response.status).toEqual(201);
    });
  });
});
