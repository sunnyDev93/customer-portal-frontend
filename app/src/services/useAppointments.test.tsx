import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import useAppointments from './useAppointments'; // Adjust the import path based on your project structure
import { server } from 'mocks/server';
import { TestRoot } from 'config/test/react-query';
import { getCustomerAppointments } from 'mocks/mock-handlers';
import { Token } from '../constants/auth';

const mock = new MockAdapter(axios);

const sessionStorageData: { [key: string]: any } = {}; // A mock storage object
const useMockStorageState = (key: string, defaultValue: any) => {
  const storedValue = sessionStorageData[key] || defaultValue;
  const setValue = (newValue: any) => {
    sessionStorageData[key] = newValue;
  };
  return [storedValue, setValue];
};
jest.mock('use-local-storage', () => useMockStorageState);
jest.mock('use-session-storage-state', () => useMockStorageState);
describe('useAppointments Hook', () => {
  const mockAptiveUser = {
    accountId: '123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
  };

  const mockAptiveUserToken = 'mockToken';

  beforeEach(() => {
    mock.reset();
    sessionStorageData['aptiveUser'] = mockAptiveUser;
    sessionStorageData[Token.AccessToken] = mockAptiveUserToken;
  });

  it('should fetch upcoming appointments and set state', async () => {
    const { result } = renderHook(() => useAppointments(), { wrapper: TestRoot });

    result.current.getUpcomingAppointment();
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.appointments).toEqual([{ id: 1, appointmentDate: '2023-10-10' }]);
    expect(result.current.upcomingAppointment).toEqual({ id: 1, appointmentDate: '2023-10-10' });
  });

  it('should handle cases where there are no upcoming appointments', async () => {
    server.use(getCustomerAppointments.noDataHandler);
    const { result } = renderHook(() => useAppointments());

    result.current.getUpcomingAppointment();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.appointments).toEqual([]);
    expect(result.current.upcomingAppointment).toEqual({});
  });

  it('should handle loading state when fetching appointments', async () => {
    const { result } = renderHook(() => useAppointments());

    expect(result.current.isLoading).toBe(true);

    result.current.getUpcomingAppointment();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('should handle errors when fetching appointments', async () => {
    server.use(getCustomerAppointments.errorHandler);
    const { result } = renderHook(() => useAppointments());

    result.current.getUpcomingAppointment();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.appointments).toEqual([]);
    expect(result.current.upcomingAppointment).toEqual({});
  });
});
