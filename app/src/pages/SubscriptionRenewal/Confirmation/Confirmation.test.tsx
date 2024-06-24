import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Confirmation from './Confirmation';
import { TestRoot } from 'config/test/react-query';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as object),
  useNavigate: () => mockedNavigate,
}));

describe('<Confirmation/>', () => {
  afterEach(() => {
    jest.resetModules();
    mockedNavigate.mockReset();
  });

  it('should render Confirmation component correctly', () => {
    render(<Confirmation />, { wrapper: TestRoot });

    expect(screen.getByText('Confirmation')).toBeInTheDocument();
    expect(screen.getByText('Your upgrade has been confirmed and your appointment has been scheduled')).toBeInTheDocument();
    expect(screen.getByText('Upcoming Appointment')).toBeInTheDocument();
    expect(screen.getByText('Tendy Customer')).toBeInTheDocument();
    expect(screen.getByText('1330 Ormewood Ave Atlanta, GA 30316')).toBeInTheDocument();
    // add more test once getting more info from previous steps
  });

  it('should navigate to dashboard when click the Done button', () => {
    render(<Confirmation />, { wrapper: TestRoot });

    const doneButton = screen.getByText('Done: Return to Home');
    fireEvent.click(doneButton);

    expect(mockedNavigate).toHaveBeenCalledWith('/dashboard');
  });
});
