import React, { FC, useMemo } from 'react';
import scheduleIcon from 'images/schedule-icon.svg';
import AptiveModal from 'components/modals/AptiveModal';
import { DatetimeHelper } from 'helpers/datetime';
import { WEEKDAY_FORMAT } from 'constants/datetime';
import { CustomerSpot } from 'types/request';
import { Moment } from 'moment';
import { useRecoilState } from 'recoil';
import { isAlreadyShowNotePopup } from 'app-recoil/atoms/issue-note';

type Props = {
  appStartDate: string | Moment;
  isOpen: boolean;
  isLoading: boolean;
  isReschedule: boolean;
  selectedAvailableSpot: CustomerSpot | undefined;
  setOpen: (value: boolean) => void;
  onConfirm: () => void;
};

const ScheduleAppointmentDialog: FC<Props> = ({
  appStartDate,
  isOpen,
  isLoading,
  isReschedule,
  selectedAvailableSpot,
  onConfirm,
  setOpen,
}) => {
  const [isDoneNotePopup, setIsDoneNotePopup] = useRecoilState(isAlreadyShowNotePopup);

  const modalDescription = useMemo(
    () => (
      <p className="text-sm text-gray-500">
        {isReschedule ? (
          <>
            This will change your service appointment from
            <br />
            {DatetimeHelper.format(appStartDate, WEEKDAY_FORMAT)}
            {DatetimeHelper.format(appStartDate, 'A') === 'AM' ? ' before noon' : ' after noon'}
            <br />
            to
            <br />
            {DatetimeHelper.format(selectedAvailableSpot?.attributes.date, WEEKDAY_FORMAT)}
            {selectedAvailableSpot?.attributes.window === 'AM' ? ' before noon' : ' after noon'}
            <br />
          </>
        ) : (
          <>
            This will schedule a service appointment for
            <br />
            {DatetimeHelper.format(selectedAvailableSpot?.attributes.date, WEEKDAY_FORMAT)}
            {selectedAvailableSpot?.attributes.window === 'AM' ? ' before noon' : ' after noon'}
          </>
        )}
      </p>
    ),
    [isReschedule, appStartDate, selectedAvailableSpot]
  );

  return (
    <AptiveModal
      icon={scheduleIcon}
      title={isReschedule ? 'Confirm Reschedule' : 'Confirm Appointment'}
      description={modalDescription}
      approveButtonText="Confirm"
      approveButtonColor="primary"
      isOpen={isOpen}
      setOpen={setOpen}
      isLoading={isLoading}
      confirmCallback={() => {
        onConfirm && onConfirm();
        setIsDoneNotePopup(false);
      }}
      trackingInfo={{ name: 'popup_confirm', buttonApproval: 'click_confirm', buttonCancel: 'click_cancel' }}
      cancelCallback={() => {
        setOpen(false);
      }}
    />
  );
};

export default ScheduleAppointmentDialog;
