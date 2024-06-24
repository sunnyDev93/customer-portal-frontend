import { renderHook } from '@testing-library/react';
import { TestRoot } from 'config/test/react-query';
import useScheduleAppointment from './useScheduleAppointment';

const payload = {
  spotId: '123',
  window: 'AM',
  isAroSpot: true,
  notes: 'notes',
};

describe('useScheduleAppointment', () => {
  describe('when request succeeded', () => {
    it('should cancel customer appointment', async () => {
      const { result } = renderHook(() => useScheduleAppointment(), { wrapper: TestRoot });

      // Call the hook function
      const { scheduleAnAppointmentMutate } = result.current;

      const response = await scheduleAnAppointmentMutate({ payload });

      // Verify that the response has a status of 201
      expect(response.status).toEqual(201);
    });
  });
});
