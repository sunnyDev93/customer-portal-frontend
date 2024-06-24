import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import AppointmentSlot from 'components/AppointmentSlot/index';

const onSelectWindow = jest.fn();

describe('AppointmentSlot', () => {
  it('should render with the correct date and AM/PM labels', () => {
    const date = '2023-09-01';
    const amSlot = { selected: false, disabled: false };
    const pmSlot = { selected: true, disabled: false };

    const { getByText } = render(<AppointmentSlot date={date} amSlot={amSlot} pmSlot={pmSlot} onSelectWindow={onSelectWindow} />);

    expect(getByText('Friday 1')).toBeInTheDocument();
    expect(getByText('AM')).toBeInTheDocument();
    expect(getByText('PM')).toBeInTheDocument();
  });

  it('should render AM and PM SpotItems with the correct selected and disabled props', () => {
    const date = '2023-09-01';
    const amSlot = { selected: true, disabled: false };
    const pmSlot = { selected: false, disabled: true };

    const { getByText, getByRole } = render(
      <AppointmentSlot date={date} amSlot={amSlot} pmSlot={pmSlot} onSelectWindow={onSelectWindow} />
    );

    expect(getByText('AM')).toHaveClass('selected');

    const pmSlotButton = getByRole('button', { name: 'Not available' });
    expect(pmSlotButton).toBeDisabled();
  });

  it('should call onSelectWindow with "PM" when PM SpotItem is clicked', () => {
    const date = '2023-09-01';
    const amSlot = { selected: false, disabled: false };
    const pmSlot = { selected: true, disabled: false };

    const { getByText } = render(<AppointmentSlot date={date} amSlot={amSlot} pmSlot={pmSlot} onSelectWindow={onSelectWindow} />);

    const pmSpotItem = getByText('PM');
    fireEvent.click(pmSpotItem);

    expect(onSelectWindow).toHaveBeenCalledWith('PM');
  });
});
