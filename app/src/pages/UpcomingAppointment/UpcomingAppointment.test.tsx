import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UpcomingAppointment from './index';
import { TestRoot } from 'config/test/react-query';

import '@testing-library/jest-dom/extend-expect';
import { server } from 'mocks/server';
import { getCustomerUpcomingAppointmentHandler } from 'mocks/mock-handlers';
import getByTextMatcher from 'shared/test/getTextMatcher';
import { useTrackingClick } from '../../shared/hooks/useTrackingClick';

jest.mock('../../shared/hooks/AptiveAuth', () => ({
  ...jest.requireActual('../../shared/hooks/AptiveAuth'),
  withAuthenticationRequired: (component: React.ReactNode) => component,
}));
jest.mock('../../shared/hooks/useTrackingClick');

describe('UpcomingAppointment', () => {
  it(`should render correctly when there is an upcoming appointment`, async () => {
    const trackClickMock = jest.fn();
    (useTrackingClick as jest.Mock).mockReturnValue({
      trackClick: trackClickMock,
    });

    server.use(getCustomerUpcomingAppointmentHandler.notInitialAppointmentHandler);

    const { container } = render(<UpcomingAppointment />, { wrapper: TestRoot });

    const listItemSkeletons = container.querySelectorAll('li:not(:first-child)');
    expect(listItemSkeletons.length).toBe(4);
    listItemSkeletons.forEach(listItem => {
      expect(listItem.querySelector('.bg-gray-300')).toBeInTheDocument();
      expect(listItem.querySelector('.font-medium')).toBeInTheDocument();
      expect(listItem.querySelector('.bg-gray-400')).toBeInTheDocument();
    });

    await waitFor(() => expect(screen.getByText('April 20th, 2023')).toBeInTheDocument());
    expect(screen.getByText(getByTextMatcher('AM Appointment'))).toBeInTheDocument();
    expect(screen.getByText(getByTextMatcher('Tendy Customer'))).toBeInTheDocument();
    expect(screen.getByText(getByTextMatcher('Pro Plus'))).toBeInTheDocument();
    expect(screen.getByText(/1330 Ormewood Ave Atlanta, GA 30316/)).toBeInTheDocument();
    const rescheduleButton = screen.getByRole('button', { name: 'Reschedule Appointment' });
    expect(rescheduleButton).toBeInTheDocument();
    fireEvent.click(rescheduleButton);
    expect(trackClickMock).toHaveBeenCalledWith('reschedule_appt/from/schedule_appt');
  });

  it(`should render cancel button if the upcoming appointment can be canceled`, async () => {
    server.use(getCustomerUpcomingAppointmentHandler.cancelableAppointmentHandler);

    const { container } = render(<UpcomingAppointment />, { wrapper: TestRoot });

    const listItemSkeletons = container.querySelectorAll('li:not(:first-child)');
    expect(listItemSkeletons.length).toBe(4);
    listItemSkeletons.forEach(listItem => {
      expect(listItem.querySelector('.bg-gray-300')).toBeInTheDocument();
      expect(listItem.querySelector('.font-medium')).toBeInTheDocument();
      expect(listItem.querySelector('.bg-gray-400')).toBeInTheDocument();
    });

    await waitFor(() => expect(screen.getByText('April 20th, 2023')).toBeInTheDocument());
    expect(screen.getByText(getByTextMatcher('AM Appointment'))).toBeInTheDocument();
    expect(screen.getByText(getByTextMatcher('Tendy Customer'))).toBeInTheDocument();
    expect(screen.getByText(getByTextMatcher('Pro Plus'))).toBeInTheDocument();
    expect(screen.getByText(/1330 Ormewood Ave Atlanta, GA 30316/)).toBeInTheDocument();
    const cancelButton = screen.getByRole('button', { name: 'Cancel Appointment' });
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    await waitFor(() => expect(screen.getByTestId('cancel-appointment-dialog-title')).toBeInTheDocument());
    const cancelButtonInDialog = screen.getByTestId('cancel-appointment-button');
    fireEvent.click(cancelButtonInDialog);
    await waitFor(() => expect(screen.queryByText('cancel-appointment-dialog-title')).not.toBeInTheDocument());
  });

  it(`should render contact phone number if it is initial appointment`, async () => {
    const { container } = render(<UpcomingAppointment />, { wrapper: TestRoot });

    const listItemSkeletons = container.querySelectorAll('li:not(:first-child)');
    expect(listItemSkeletons.length).toBe(4);
    listItemSkeletons.forEach(listItem => {
      expect(listItem.querySelector('.bg-gray-300')).toBeInTheDocument();
      expect(listItem.querySelector('.font-medium')).toBeInTheDocument();
      expect(listItem.querySelector('.bg-gray-400')).toBeInTheDocument();
    });

    await waitFor(() => expect(screen.getByText('April 20th, 2023')).toBeInTheDocument());
    expect(screen.getByText(getByTextMatcher('AM Appointment'))).toBeInTheDocument();
    expect(screen.getByText(getByTextMatcher('To reschedule call 844-257-4147'))).toBeInTheDocument();
  });

  it(`should render correctly when there is no upcoming appointment`, async () => {
    server.use(getCustomerUpcomingAppointmentHandler.noUpcomingAppointmentHandler);
    const { container } = render(<UpcomingAppointment />, { wrapper: TestRoot });

    const listItemSkeletons = container.querySelectorAll('li:not(:first-child)');
    expect(listItemSkeletons.length).toBe(4);
    listItemSkeletons.forEach(listItem => {
      expect(listItem.querySelector('.bg-gray-300')).toBeInTheDocument();
      expect(listItem.querySelector('.font-medium')).toBeInTheDocument();
      expect(listItem.querySelector('.bg-gray-400')).toBeInTheDocument();
    });

    await waitFor(() =>
      expect(
        screen.getByText('Your regular appointment has not been scheduled. Need us to come back sooner? Schedule here.')
      ).toBeInTheDocument()
    );
    const button = screen.getByRole('button', { name: 'Schedule a Return Visit' });
    expect(button).toBeEnabled();
  });
});
