import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useRecoilValue } from 'recoil';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ScheduleWrapperPage from './index';
import { useGetCustomerUpcomingAppointment } from 'shared/hooks/useGetCustomerUpcomingAppointment';

// Mocking recoil selector
jest.mock('recoil', () => ({
  ...jest.requireActual('recoil'),
  useRecoilValue: jest.fn(),
}));

// Mocking the hook
jest.mock('shared/hooks/useGetCustomerUpcomingAppointment', () => ({
  __esModule: true,
  useGetCustomerUpcomingAppointment: jest.fn(),
}));

jest.mock('../../shared/hooks/AptiveAuth', () => ({
  ...jest.requireActual('../../shared/hooks/AptiveAuth'),
  withAuthenticationRequired: (component: React.ReactNode) => component,
}));

// Mocking the LoadingSpinner component
jest.mock('components/LoadingSpinner', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="loading-spinner">Loading...</div>),
}));

// Mocking the Navigate component
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: jest.fn(({ to }) => <div data-testid="navigate">{to}</div>),
}));

describe('ScheduleWrapperPage', () => {
  // Mocking the hook response
  const mockUseGetCustomerUpcomingAppointment = useGetCustomerUpcomingAppointment as jest.Mock;
  const mockAccountId = 'mockAccountId';
  const mockUpcomingAppointment = [
    {
      id: 'mockAppointmentId',
      // Add other necessary properties
    },
  ];

  beforeEach(() => {
    // Reset mocks and set initial values for recoil and hook
    jest.clearAllMocks();
    (useRecoilValue as jest.Mock).mockReturnValue(mockAccountId);
    mockUseGetCustomerUpcomingAppointment.mockReturnValue({
      isLoading: false,
      data: mockUpcomingAppointment,
    });
  });

  test('renders LoadingSpinner while loading', async () => {
    (useRecoilValue as jest.Mock).mockReturnValue(mockAccountId);
    mockUseGetCustomerUpcomingAppointment.mockReturnValue({ isLoading: true });

    render(<ScheduleWrapperPage />);

    // Wait for LoadingSpinner to be rendered
    await waitFor(() => expect(screen.getByTestId('loading-spinner')).toBeInTheDocument());
  });

  test('renders Navigate component with correct path after loading', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<ScheduleWrapperPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for Navigate to be rendered
    await waitFor(() => expect(screen.getByTestId('navigate')).toBeInTheDocument());

    // Check if Navigate is rendered with the correct path
    expect(screen.getByTestId('navigate')).toHaveTextContent('/appointments/reschedule/mockAppointmentId');
  });
});
