import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ScheduleAppointmentContainer from './index';
import { RecoilRoot } from 'recoil';

const onCloseErrorMessage = jest.fn();
describe('ScheduleAppointmentContainer Component', () => {
  it('renders loading spinner when isLoadingSpots is true', () => {
    render(
      <RecoilRoot>
        <ScheduleAppointmentContainer
          isLoadingSpots={true}
          availableSpots={{}}
          isScheduling={false}
          onSelectWindow={() => {}}
          onSubmit={() => {}}
          selectedAvailableSpot={undefined}
          unavailableSpots={[]}
          onCloseErrorMessage={onCloseErrorMessage}
        />
      </RecoilRoot>
    );

    expect(screen.queryByTestId('schedule-appointment-container')).toBeNull();
  });

  it('renders "no spot warning" when no availableSpots and isLoadingSpots is false', () => {
    render(
      <RecoilRoot>
        <ScheduleAppointmentContainer
          isLoadingSpots={false}
          availableSpots={{}}
          isScheduling={false}
          onSelectWindow={() => {}}
          onSubmit={() => {}}
          selectedAvailableSpot={undefined}
          unavailableSpots={[]}
          onCloseErrorMessage={onCloseErrorMessage}
        />
      </RecoilRoot>
    );

    const noSpotWarning = screen.getByTestId('no-spot-warning');
    expect(noSpotWarning).toBeInTheDocument();
  });
});
