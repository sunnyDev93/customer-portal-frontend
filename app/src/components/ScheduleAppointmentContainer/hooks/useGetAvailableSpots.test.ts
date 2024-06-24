import { TestRoot } from 'config/test/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { getCustomerAvailableSpotsHandler } from 'mocks/mock-handlers';
import { getCustomerAvailableSpotsResponse } from 'mocks/responseMocks';
import { server } from 'mocks/server';
import useGetAvailableSpots from './useGetAvailableSpots';

const mockData = getCustomerAvailableSpotsResponse.data;

describe('useGetAvailableSpots', () => {
  it('fetches available spots and formats data', async () => {
    const { result } = renderHook(() => useGetAvailableSpots(), { wrapper: TestRoot });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.availableSpots).toEqual({
      '2023-09-01': { AM: mockData[0], PM: mockData[1] },
      '2023-09-02': { AM: mockData[2], PM: mockData[3] },
    });
    expect(result.current.isLoading).toBe(false);
  });

  it('extracts spot IDs correctly', async () => {
    const { result } = renderHook(() => useGetAvailableSpots(), { wrapper: TestRoot });

    await waitFor(() => {
      // Extract spot IDs
      const extractedAMSpotIds = result.current.extractSpotIds('2023-09-01', 'AM');
      // Verify that spot IDs are extracted correctly
      expect(extractedAMSpotIds).toEqual([mockData[0]]);
    });
    const extractedPMSpotIds = result.current.extractSpotIds('2023-09-01', 'PM');
    expect(extractedPMSpotIds).toEqual([mockData[1]]);
  });

  describe('when request failed', () => {
    it('should redirect to 500 error page', async () => {
      server.use(getCustomerAvailableSpotsHandler.errorHandler);
      const url = '/server-error';
      const { result } = renderHook(() => useGetAvailableSpots(), { wrapper: TestRoot });

      expect(result.current.availableSpots).toStrictEqual({});
      await waitFor(() => {
        expect(window.location.href).toBe(url);
      });
    });
  });
});
