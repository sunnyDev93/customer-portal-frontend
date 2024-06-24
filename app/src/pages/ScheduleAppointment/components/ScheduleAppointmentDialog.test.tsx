import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ScheduleAppointmentDialog from './ScheduleAppointmentDialog';
import { RecoilRoot } from 'recoil';

describe('ScheduleAppointmentDialog', () => {
  const mockProps = {
    appStartDate: '2023-09-05',
    isOpen: true,
    isLoading: false,
    isReschedule: false,
    selectedAvailableSpot: {
      id: '123',
      type: 'Spot',
      attributes: {
        date: '2023-09-06',
        window: 'AM',
        is_aro_spot: true,
      },
    },
    setOpen: jest.fn(),
    onConfirm: jest.fn(),
  };

  it('renders the dialog with correct content for a new appointment', () => {
    render(
      <RecoilRoot>
        <ScheduleAppointmentDialog {...mockProps} />
      </RecoilRoot>
    );

    expect(screen.getByText('Confirm Appointment')).toBeInTheDocument();
    expect(screen.getByText(/This will schedule a service appointment for/i)).toBeInTheDocument();
    expect(screen.getByText(/Wednesday, September 06, 2023/i)).toBeInTheDocument();
    expect(screen.getByText(/before noon/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('renders the dialog with correct content for a reschedule', () => {
    const rescheduleProps = { ...mockProps, isReschedule: true };

    render(
      <RecoilRoot>
        <ScheduleAppointmentDialog {...rescheduleProps} />
      </RecoilRoot>
    );

    expect(screen.getByText('Confirm Reschedule')).toBeInTheDocument();
    expect(screen.getByText(/This will change your service appointment from/)).toBeInTheDocument();
    expect(screen.getByText(/Tuesday, September 05, 2023/)).toBeInTheDocument();
    expect(screen.getByText(/to/)).toBeInTheDocument();
    expect(screen.getByText(/Wednesday, September 06, 2023/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('handles confirmation button click', () => {
    render(
      <RecoilRoot>
        <ScheduleAppointmentDialog {...mockProps} />
      </RecoilRoot>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));

    expect(mockProps.onConfirm).toHaveBeenCalled();
  });

  it('handles modal close button click', () => {
    render(
      <RecoilRoot>
        <ScheduleAppointmentDialog {...mockProps} />
      </RecoilRoot>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(mockProps.setOpen).toHaveBeenCalledWith(false);
  });
});
