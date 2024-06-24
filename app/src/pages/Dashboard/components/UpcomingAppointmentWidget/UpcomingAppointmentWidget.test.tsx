import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import UpcomingAppointmentWidget from 'pages/Dashboard/components/UpcomingAppointmentWidget/UpcomingAppointmentWidget';
import { TestRoot } from 'config/test/react-query';
import { useTrackingClick } from 'shared/hooks/useTrackingClick';
import { server } from 'mocks/server';
import { baseURL } from 'services/config';
import { getCustomerUpcomingAppointmentResponse } from 'mocks/responseMocks';
import { getCustomerAppointmentsHistory, getCustomerUpcomingAppointmentHandler } from '../../../../mocks/mock-handlers';
import getByTextMatcher from '../../../../shared/test/getTextMatcher';

// mock navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockTrackClick = jest.fn();

beforeEach(() => {
  (useTrackingClick as jest.Mock).mockReturnValue({
    trackClick: mockTrackClick,
  });
});

describe('UpcomingAppointmentWidget', () => {
  it('renders loading skeleton while loading', () => {
    render(<UpcomingAppointmentWidget accountId="123" />, { wrapper: TestRoot });
    expect(screen.getByTestId('upcoming-appointment-widget-skeleton')).toBeInTheDocument();
  });

  it('renders appointment details when upcoming appointment is available but cannot be rescheduled', async () => {
    server.use(getCustomerUpcomingAppointmentHandler.notInitialAppointmentHandler);
    render(<UpcomingAppointmentWidget accountId="123" />, { wrapper: TestRoot });

    await screen.findByText('Upcoming Appointment');
    expect(screen.getByText('April 20th 2023 - AM Appointment')).toBeInTheDocument();
    expect(screen.getByText('View Details')).toBeInTheDocument();
    const rescheduleButton = screen.getByRole('button', { name: 'Reschedule' });

    await waitFor(() => expect(rescheduleButton).not.toBeEnabled());
  });
  it('renders appointment details when upcoming appointment is available and can be rescheduled', async () => {
    server.use(getCustomerUpcomingAppointmentHandler.notInitialAppointmentHandler);
    jest.useFakeTimers().setSystemTime(new Date('2023-04-19'));
    render(<UpcomingAppointmentWidget accountId="123" />, { wrapper: TestRoot });

    await screen.findByText('Upcoming Appointment');
    expect(screen.getByText('April 20th 2023 - AM Appointment')).toBeInTheDocument();
    expect(screen.getByText('View Details')).toBeInTheDocument();
    const rescheduleButton = screen.getByRole('button', { name: 'Reschedule' });
    fireEvent.click(rescheduleButton);
    await waitFor(() => expect(mockTrackClick).toHaveBeenCalledWith('reschedule/from/schedule_appt'));
  });

  it('renders anytime spot', async () => {
    server.use(
      rest.get(`${baseURL}/customer/:accountId/appointments/upcoming`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            ...getCustomerUpcomingAppointmentResponse,
            data: [
              {
                ...getCustomerUpcomingAppointmentResponse.data[0],
                attributes: { ...getCustomerUpcomingAppointmentResponse.data[0].attributes, timeWindow: 'AT' },
              },
            ],
          })
        );
      })
    );
    render(<UpcomingAppointmentWidget accountId="123" />, { wrapper: TestRoot });
    await waitFor(() => expect(screen.getByText('Upcoming Appointment')).toBeInTheDocument());
    expect(screen.getByText('April 20th 2023 - Anytime')).toBeInTheDocument();
  });

  it('renders message when no upcoming appointment', async () => {
    server.use(
      rest.get(`${baseURL}/customer/:accountId/appointments/upcoming`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ ...getCustomerUpcomingAppointmentResponse, data: [] }));
      })
    );
    render(<UpcomingAppointmentWidget accountId="123" />, { wrapper: TestRoot });
    await screen.findByText('Your regular appointment has not been scheduled. Need us to come back sooner? Schedule here.');
    const button = screen.getByRole('button', { name: 'Schedule a Return Visit' });
    expect(button).toBeEnabled();
  });

  it('should hide the Reschedule button if the appointment is initial', async () => {
    render(<UpcomingAppointmentWidget accountId="123" />, { wrapper: TestRoot });

    await screen.findByText('Upcoming Appointment');

    expect(screen.queryByText('Reschedule')).toBeNull();
  });

  it('should show correct text when there is no initial appointment', async () => {
    server.use(getCustomerUpcomingAppointmentHandler.noUpcomingAppointmentHandler);
    server.use(getCustomerAppointmentsHistory.noAppointmentHandler);

    render(<UpcomingAppointmentWidget accountId="123" />, { wrapper: TestRoot });

    await screen.findByText('Your initial appointment has not been scheduled yet.');
    expect(screen.getByText(getByTextMatcher('To schedule your initial appointment, please call 385-600-6192'))).toBeInTheDocument();
  });
});
