import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CancelAppointmentModal from './CancelAppointmentModal';
import { Appointment } from 'types/request';
import getByTextMatcher from 'shared/test/getTextMatcher';

const mockAppointment = {
  id: '1',
  start: new Date('2023-04-20T10:00:00'),
  end: new Date('2023-04-20T11:00:00'),
  service: 'Test Service',
} as unknown as Appointment;
const mockOnClose = jest.fn();
const mockOnConfirm = jest.fn();

describe('CancelAppointmentModal', () => {
  it('should render the dialog with the appointment details', () => {
    render(
      <CancelAppointmentModal isOpen={true} isLoading={false} appointment={mockAppointment} setOpen={() => {}} onConfirm={() => {}} />
    );

    expect(screen.getByTestId('cancel-appointment-dialog-title')).toBeInTheDocument();

    const expectedText = 'This will cancel a service appointment for Thursday, April 20, 2023 before noon';
    expect(screen.getByText(getByTextMatcher(expectedText))).toBeInTheDocument();
  });

  it('should render time correctly', () => {
    const { rerender } = render(
      <CancelAppointmentModal isOpen={true} isLoading={false} appointment={mockAppointment} setOpen={() => {}} onConfirm={() => {}} />
    );

    const expectedText = /before noon/i;
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    rerender(
      <CancelAppointmentModal
        isOpen={true}
        isLoading={false}
        appointment={{ ...mockAppointment, start: new Date('2023-04-20T13:00:00') }}
        setOpen={() => {}}
        onConfirm={() => {}}
      />
    );
    expect(screen.getByText(/after noon/i)).toBeInTheDocument();
  });

  it('should call the onConfirm function when the Cancel Appointment button is clicked', () => {
    render(
      <CancelAppointmentModal isOpen={true} isLoading={false} appointment={mockAppointment} setOpen={() => {}} onConfirm={mockOnConfirm} />
    );

    const cancelButton = screen.getByRole('button', { name: 'Cancel Appointment' });
    fireEvent.click(cancelButton);

    expect(mockOnConfirm).toHaveBeenCalledWith(mockAppointment);
  });
  it('should call the setOpen function when the Close button is clicked', () => {
    render(
      <CancelAppointmentModal
        isOpen={true}
        isLoading={false}
        appointment={mockAppointment}
        setOpen={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );

    const closeButton = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledWith(false);
  });

  it('should disable buttons when loading', () => {
    render(
      <CancelAppointmentModal
        isOpen={true}
        isLoading={true}
        appointment={mockAppointment}
        setOpen={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );

    const closeButton = screen.getByRole('button', { name: 'Close' });
    const cancelButton = screen.getByRole('button', { name: 'Loading...' });

    expect(closeButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });
});
