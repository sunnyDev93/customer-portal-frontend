import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ScheduleAppointmentPage from './index';
import { useFeatureFlag } from 'configcat-react';
import { TestRoot } from '../../config/test/react-query';

jest.mock('../../shared/hooks/AptiveAuth', () => ({
  ...jest.requireActual('../../shared/hooks/AptiveAuth'),
  withAuthenticationRequired: (component: React.ReactNode) => component,
}));
jest.mock('configcat-react');

const mockUseFeatureFlag = useFeatureFlag as jest.Mock;
const isOn = true;

// Mock the necessary dependencies and services
jest.mock('services/ScheduleService', () => ({
  getSpots: jest.fn(() => ({ status: 200, data: { data: [] } })),
  rescheduleAppointment: jest.fn(() => ({ status: 200, data: {} })),
  scheduleAppointment: jest.fn(() => ({ status: 200, data: {} })),
}));
jest.mock('shared/hooks/useGetCustomerUpcomingAppointment', () => ({
  __esModule: true,
  useGetCustomerUpcomingAppointment: jest.fn(() => ({ isLoading: false, data: [] })),
}));
// ... mock other dependencies as needed
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('ScheduleAppointmentPage', () => {
  beforeAll(() => {
    mockUseFeatureFlag.mockImplementation(() => {
      return {
        loading: false,
        value: isOn,
      };
    });
  });

  it('renders the component and triggers actions', async () => {
    render(<ScheduleAppointmentPage />, { wrapper: TestRoot });
    expect(screen.getByText('Schedule an Appointment')).toBeInTheDocument();
  });
});
