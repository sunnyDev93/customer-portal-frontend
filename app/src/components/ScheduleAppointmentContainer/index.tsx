import React, { FC, useMemo } from 'react';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import some from 'lodash/some';
import sortBy from 'lodash/sortBy';
import AppointmentSlot from 'components/AppointmentSlot';
import { DatetimeHelper } from 'helpers/datetime';
import LoadingSpinner from 'components/LoadingSpinner';
import Button from 'shared/components/Button';
import { CustomerSpot, SpotWindow } from 'types/request';
import styles from './ScheduleAppointmentContainer.module.scss';
import { isAlreadyShowNotePopup, issueNoteState } from 'app-recoil/atoms/issue-note';
import { useRecoilState } from 'recoil';
import UnavailableSpotModal from 'components/ScheduleAppointmentContainer/components/UnavailableSpotModal';

type Props = {
  availableSpots: Record<string, Record<SpotWindow, CustomerSpot | undefined>>;
  isLoadingSpots: boolean;
  isScheduling: boolean;
  onSelectWindow: (window: SpotWindow, date: string) => void;
  onSubmit: () => void;
  selectedAvailableSpot: CustomerSpot | undefined;
  unavailableSpots: CustomerSpot[];
  showErrorMessage?: boolean;
  onCloseErrorMessage: () => void;
};

const ScheduleAppointmentContainer: FC<Props> = ({
  availableSpots,
  isLoadingSpots,
  isScheduling,
  selectedAvailableSpot,
  unavailableSpots,
  onSelectWindow,
  onSubmit,
  showErrorMessage = false,
  onCloseErrorMessage,
}) => {
  const [isDoneNotePopup, setIsDoneNotePopup] = useRecoilState(isAlreadyShowNotePopup);
  const [issueNote, setIssueNote] = useRecoilState(issueNoteState);

  const confirmButtonLabel = useMemo(
    () => (
      <span className="leading-[20px]">
        Confirm your appointment
        {selectedAvailableSpot && (
          <>
            :{' '}
            <span className={styles.selectedSpotLabel}>
              {`${DatetimeHelper.format(selectedAvailableSpot?.attributes.date, 'dddd, MMMM Do')}, in the ${
                selectedAvailableSpot.attributes.window
              }`}
            </span>
          </>
        )}
      </span>
    ),
    [selectedAvailableSpot]
  );

  const isAllSpotUnavailable = useMemo(() => {
    if (unavailableSpots.length) {
      const unavailableSpotId = unavailableSpots.map(item => item.id);
      const availableSpotId = [];

      for (const date in availableSpots) {
        const { AM, PM } = availableSpots[date];

        availableSpotId.push(...[AM?.id, PM?.id].filter(id => id !== undefined));
      }
      return isEqual(sortBy(unavailableSpotId), sortBy(availableSpotId));
    }
    return false;
  }, [unavailableSpots, availableSpots]);

  const checkAvailability = (date: string, window: string) => {
    return some(unavailableSpots, spot => spot.attributes.date === date && spot.attributes.window === window);
  };

  const handleOnSubmit = () => {
    if (selectedAvailableSpot) {
      onSubmit();
    }
  };

  return (
    <>
      {/*no spot warning*/}
      {((!isLoadingSpots && isEmpty(availableSpots)) || isAllSpotUnavailable) && (
        <div
          className="bg-red-100 border-red-500 text-red-700 border shadow overflow-hidden sm:rounded-md mb-5"
          data-testid="no-spot-warning"
        >
          <ul className="divide-y divide-gray-200">
            <li>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center">
                  <div className="flex items-center w-full space-x-4">
                    <div>
                      <div className="">
                        <span className="font-bold">There are no available appointments in the selected period.</span>
                      </div>
                      <div className="flex items-center text-red-700 sm:mt-0">
                        <div className="">
                          Try another date range or{' '}
                          <span className="font-bold">
                            <a href="tel:+18552843733" className="underline">
                              call
                            </a>
                          </span>{' '}
                          <span className="font-bold">855-BUG-FREE</span> (855-284-3733) for personal assistance.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      )}

      <div className="">
        {isLoadingSpots ? (
          <LoadingSpinner label="Loading Spots..." centered />
        ) : (
          <>
            {availableSpots && (
              <>
                <div className="text-center italic mb-[24px] text-[#111827]">
                  Below are the available times within the next 2 weeks. Please select a time that works best for you.
                </div>
                {/* DatetimeHelper.getDaysArray('2023-10-25', '2023-10-31').map(item => DatetimeHelper.format(item)) */}
                {(() => {
                  const today = new Date();
                  const firstDate = DatetimeHelper.format(today.setDate(today.getDate() + 1));
                  const endDate = Object.keys(availableSpots)[Object.keys(availableSpots).length - 1];
                  return DatetimeHelper.getDaysArray(firstDate, endDate).map(item => DatetimeHelper.format(item));
                })()?.map((date: string) => (
                  <AppointmentSlot
                    key={date}
                    date={date}
                    amSlot={{
                      selected:
                        !!(selectedAvailableSpot && availableSpots[date]) && selectedAvailableSpot?.id === availableSpots[date]?.AM?.id,
                      disabled: !availableSpots[date]?.AM || checkAvailability(date, 'AM'),
                    }}
                    pmSlot={{
                      selected:
                        !!(selectedAvailableSpot && availableSpots[date]) && selectedAvailableSpot?.id === availableSpots[date]?.PM?.id,
                      disabled: !availableSpots[date]?.PM || checkAvailability(date, 'PM'),
                    }}
                    onSelectWindow={window => {
                      setIsDoneNotePopup(false);
                      onSelectWindow(window, date);
                      setIssueNote('');
                    }}
                  />
                ))}
                {!isEmpty(availableSpots) && (
                  <div className="flex justify-center items-center w-full">
                    <Button disabled={isScheduling} onClick={handleOnSubmit} label={confirmButtonLabel} className={styles.confirmButton} />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {showErrorMessage && <UnavailableSpotModal isOpen={showErrorMessage} onClose={onCloseErrorMessage} />}
    </>
  );
};

export default ScheduleAppointmentContainer;
