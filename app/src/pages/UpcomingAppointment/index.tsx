import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withAuthenticationRequired } from '../../shared/hooks/AptiveAuth';
import UpcomingAppointmentPageSkeleton from 'pages/UpcomingAppointment/components/UpcomingAppointmentPageSkeleton';
import LoadingSpinner from 'components/LoadingSpinner';
import PageTitle from 'components/PageTitle';
import { DATE_ORDER_SEPARATE_YEAR_FORMAT } from 'constants/datetime';
import { DatetimeHelper } from 'helpers/datetime';
import { StringHelper } from 'helpers/string';

import CancelAppointmentModal from 'pages/UpcomingAppointment/components/CancelAppointmentModal';
import { useCancelCustomerUpcomingAppointment } from 'pages/UpcomingAppointment/hook/useCancelCustomerUpcomingAppointment';
import Button from 'shared/components/Button';
import { useGetCustomerUpcomingAppointment } from 'shared/hooks/useGetCustomerUpcomingAppointment';
import UpcomingAppointmentWidget from 'pages/Dashboard/components/UpcomingAppointmentWidget/UpcomingAppointmentWidget';
import { useRecoilValue } from 'recoil';
import { aptiveUserDataState } from 'app-recoil/atoms/auth/aptive-user-data';
import aptiveUserAccountId from 'app-recoil/selectors/aptive-user-account-id';
import { useTrackingClick } from '../../shared/hooks/useTrackingClick';
import { useTrackingView } from '../../shared/hooks/useTrackingView';

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M2 3C2 2.44772 2.44772 2 3 2H5.15287C5.64171 2 6.0589 2.35341 6.13927 2.8356L6.87858 7.27147C6.95075 7.70451 6.73206 8.13397 6.3394 8.3303L4.79126 9.10437C5.90756 11.8783 8.12168 14.0924 10.8956 15.2087L11.6697 13.6606C11.866 13.2679 12.2955 13.0492 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.8203 18 2 12.1797 2 5V3Z"
      fill="#007AFF"
    />
  </svg>
);

const UpcomingAppointmentPage: React.FC = () => {
  const { trackClick } = useTrackingClick();

  useTrackingView();
  const aptiveUserData = useRecoilValue(aptiveUserDataState);
  const accountId = useRecoilValue(aptiveUserAccountId);

  const { isLoading, data: upcomingAppointment } = useGetCustomerUpcomingAppointment(accountId);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const onCancelAppointment = () => {
    setIsCancelModalOpen(true);
    trackClick('cancel_appt/from/schedule_appt');
  };

  const { isLoading: isCanceling, cancelCustomerUpcomingAppointmentMutate } = useCancelCustomerUpcomingAppointment();

  const confirmCancel = async () => {
    cancelCustomerUpcomingAppointmentMutate(
      { accountId, appointmentId: upcomingAppointment ? upcomingAppointment[0].id.toString() : '' },
      {
        onSuccess: () => setIsCancelModalOpen(false),
      }
    );
  };

  const renderAppointment = () => (
    <div className={`overflow-hidden sm:rounded-md mb-5 ${upcomingAppointment?.length === 0 && accountId ? '' : 'border shadow'}`}>
      <ul className="divide-y divide-gray-200">
        {upcomingAppointment && (
          <>
            {upcomingAppointment?.length === 0 && accountId && (
              <li>
                <UpcomingAppointmentWidget accountId={accountId} hideFrequencyPanel />
              </li>
            )}

            {upcomingAppointment?.length !== 0 && (
              <>
                <li className="bg-white">
                  <div className="px-4 py-6 sm:px-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">
                          {DatetimeHelper.format(
                            DatetimeHelper.trimOffTimeZoneOffset(upcomingAppointment[0].scheduledStartTime),
                            DATE_ORDER_SEPARATE_YEAR_FORMAT
                          )}
                        </p>
                        <p className="flex items-center text-[14px] text-gray-500 sm:mt-0">
                          {upcomingAppointment[0].timeWindow === 'AT'
                            ? 'Anytime'
                            : DatetimeHelper.trimOffTimeZoneOffset(upcomingAppointment[0].scheduledStartTime).format('A') + ' Appointment'}
                        </p>
                      </div>

                      <div className="ml-[0px] md:ml-2 mt-5 sm:mt-0 space-x-2 flex text-sm items-center text-gray-500">
                        {upcomingAppointment[0].isInitial ? (
                          <a href="tel:+18442574147" className="text-aptive-link font-medium inline-flex">
                            <PhoneIcon /> <span className="ml-2">To reschedule call 844-257-4147</span>
                          </a>
                        ) : (
                          <>
                            {upcomingAppointment && upcomingAppointment[0].canBeCanceled && (
                              <Button
                                label={isCanceling ? 'Canceling...' : 'Cancel Appointment'}
                                type="button"
                                color="muted"
                                onClick={onCancelAppointment}
                                disabled={isCanceling}
                                className="text-[14px]"
                              />
                            )}

                            {upcomingAppointment[0].canBeRescheduled && (
                              <Link to={`/appointments/reschedule/${upcomingAppointment[0].id}`}>
                                <Button
                                  label="Reschedule Appointment"
                                  type="button"
                                  color="muted"
                                  className="text-[14px]"
                                  onClick={() => trackClick('reschedule_appt/from/schedule_appt')}
                                />
                              </Link>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="px-4 py-5 sm:px-6 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="w-1/2 md:w-1/3">
                        <p className="flex items-center text-gray-500 pl-[0px] md:pl-3 font-medium sm:mt-0 text-[14px]">Customer Name</p>
                      </div>

                      <div className="ml-2 flex w-full items-center">
                        <p className="font-medium mb-1 text-gray-900 fs-exclude text-[14px]">
                          {aptiveUserData?.firstName} {aptiveUserData?.lastName}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="px-4 py-5 sm:px-6 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="w-1/2 md:w-1/3">
                        <p className="flex items-center text-gray-500 pl-[0px] md:pl-3 font-medium sm:mt-0 text-[14px]">Treatment Type</p>
                      </div>

                      <div className="ml-2 flex w-full items-center">
                        <p className="font-medium mb-1 text-gray-900 text-[14px]">
                          {upcomingAppointment ? upcomingAppointment[0].serviceTypeName : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="px-4 py-5 sm:px-6 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="w-1/2 md:w-1/3">
                        <p className="flex items-center text-gray-500 pl-[0px] md:pl-3 font-medium sm:mt-0 text-[14px]">Customer Address</p>
                      </div>

                      <div className="ml-2 flex w-full items-center">
                        <p className="font-medium mb-1 text-gray-900 fs-exclude text-[14px]">
                          {StringHelper.formatAddress(
                            aptiveUserData?.address?.address,
                            aptiveUserData?.address?.city,
                            aptiveUserData?.address?.state,
                            aptiveUserData?.address?.zip
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </>
            )}
          </>
        )}
      </ul>
    </div>
  );

  const isDisplaySkeleton = !upcomingAppointment || isLoading;
  if (isDisplaySkeleton) {
    return (
      <div className="pb-5 pt-10">
        <div className="h-4 bg-gray-300 rounded-full w-48 mb-4 mb-3"></div>
        <UpcomingAppointmentPageSkeleton />
      </div>
    );
  }
  return (
    <>
      <PageTitle title="Upcoming Appointment" />
      {isLoading ? <UpcomingAppointmentPageSkeleton /> : renderAppointment()}
      {upcomingAppointment && (
        <CancelAppointmentModal
          isOpen={isCancelModalOpen}
          appointment={upcomingAppointment[0]}
          setOpen={setIsCancelModalOpen}
          onConfirm={confirmCancel}
          isLoading={isCanceling}
        />
      )}
    </>
  );
};

export default withAuthenticationRequired(UpcomingAppointmentPage, {
  onRedirecting: () => <LoadingSpinner centered />,
});
