import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { WEEKDAY_FORMAT } from 'constants/datetime';
import { DatetimeHelper } from 'helpers/datetime';
import Button from 'shared/components/Button';
import { Appointment } from 'types/request';
import { useTrackingClick } from '../../../shared/hooks/useTrackingClick';

interface CancelAppointmentModalProps {
  isOpen: boolean;
  isLoading: boolean;
  appointment?: Appointment;
  setOpen: (isOpen: boolean) => void;
  onConfirm?: (value: any) => void;
}

const CancelAppointmentModal: React.FC<CancelAppointmentModalProps> = ({ isOpen, isLoading, appointment, setOpen, onConfirm }) => {
  const { trackClick } = useTrackingClick();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex flex-col min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                      data-testid="cancel-appointment-dialog-title"
                    >
                      Cancel Appointment
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        This will cancel a service appointment for <br />
                        {DatetimeHelper.format(appointment?.start, WEEKDAY_FORMAT)}
                        {DatetimeHelper.format(appointment?.start, 'A') === 'AM' ? ' before noon' : ' after noon'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-flow-row-dense grid-cols-2 gap-3">
                  <Button
                    type="button"
                    label="Close"
                    color="muted"
                    onClick={() => {
                      setOpen(false);
                      trackClick('click_close/from/popup_cancel');
                    }}
                    disabled={isLoading}
                  />

                  <Button
                    type="button"
                    label={isLoading ? 'Loading...' : 'Cancel Appointment'}
                    color="danger"
                    testId="cancel-appointment-button"
                    onClick={() => {
                      onConfirm && onConfirm(appointment);
                      trackClick('click_cancel/from/popup_cancel');
                    }}
                    disabled={isLoading}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CancelAppointmentModal;
