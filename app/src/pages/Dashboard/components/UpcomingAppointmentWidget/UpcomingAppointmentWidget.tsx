import React, { useMemo, useState } from 'react';
import moment from 'moment';
import maxBy from 'lodash/maxBy';
import { Link, useNavigate } from 'react-router-dom';
import UpcomingAppointmentWidgetSkeleton from 'components/loading/UpcomingAppointmentWidgetSkeleton';
import LoadingSpinner from 'components/LoadingSpinner';
import AptiveModal from 'components/modals/AptiveModal';
import { DATE_ORDER_FORMAT, DATE_SHORT_SEPARATE_YEAR_FORMAT } from 'constants/datetime';
import Button from 'shared/components/Button';
import { DatetimeHelper } from 'helpers/datetime';
import { CustomerAppointmentHistoryType } from 'types';
import bugIcon from 'images/bug-icon.png';
import calendarIcon from 'images/calendar-icon.png';
import { AppointmentStatus } from 'types/appointment';
import { useGetCustomerUpcomingAppointment } from 'shared/hooks/useGetCustomerUpcomingAppointment';
import { useRecoilState, useRecoilValue } from 'recoil';
import { customerInfoDataState } from 'app-recoil/atoms/customer-info';
import { isAlreadyShowNotePopup, issueNoteState } from 'app-recoil/atoms/issue-note';
import { useTrackingClick } from 'shared/hooks/useTrackingClick';
import { useGetCustomerAppointmentsHistory } from 'shared/hooks/useApointmentsHistory';
import { first } from 'lodash';
import { useFeatureFlag } from 'configcat-react';
import ApproximateServiceSchedule from 'components/ApproximateServiceSchedule';
import { useGetSubscriptions } from 'shared/hooks/useGetSubscriptions';

interface UpcomingAppointmentWidgetProps {
  accountId: string | undefined;
  hideRescheduleBtn?: boolean;
  hideFrequencyPanel?: boolean;
}

export const UpcomingAppointmentWidget: React.FC<UpcomingAppointmentWidgetProps> = ({
  hideRescheduleBtn,
  hideFrequencyPanel,
  accountId,
}) => {
  const [issueNote, setIssueNote] = useRecoilState(issueNoteState);
  const { value: isMonthlyBillingEnabled, loading: isMonthlyBillingEnabledLoading } = useFeatureFlag('isMonthlyBillingEnabled', false);
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleTellUsMoreModal, setToggleTellUsMoreModal] = React.useState(false);
  const customer = useRecoilValue(customerInfoDataState);
  const dayCount = useMemo(() => moment(moment()).diff(customer?.lastTreatmentDate, 'days') || 0, [customer]);
  const [showError, setShowError] = useState(false);
  const [toggleCanRescheduleModal, setToggleCanRescheduleModal] = useState(false);
  const issueNoteError = 'The note field is required';
  const navigate = useNavigate();
  const { trackClick } = useTrackingClick();
  const { isLoading, data: upcomingAppointment } = useGetCustomerUpcomingAppointment(accountId || '');
  const [isDoneNotePopup, setIsDoneNotePopup] = useRecoilState(isAlreadyShowNotePopup);
  const subscriptionData = useMemo(() => customer?.subscription, [customer]);
  const { isLoading: isLoadingSubscriptions, data: subscriptions } = useGetSubscriptions();

  const canBeRescheduled = useMemo(() => {
    if (upcomingAppointment?.length) {
      const startDate = upcomingAppointment[0].start;
      const now = moment();
      const serviceLocationTimezone = +(first(startDate.toString().substring(19, startDate.toString().length).split(':')) || 0);
      const currentTimezone = now.utcOffset() / 60;
      const timezoneDiff = currentTimezone - serviceLocationTimezone;

      const actualStartDate = moment(startDate).add(timezoneDiff, 'hours').startOf('day');
      const actualNow = now.add(timezoneDiff, 'hours').startOf('day');

      const canBeRescheduled = actualNow.isBefore(actualStartDate, 'D');
      return canBeRescheduled && upcomingAppointment[0].canBeRescheduled;
    }
    return false;
  }, [upcomingAppointment]);

  const sanitizedDate = useMemo(
    () =>
      upcomingAppointment && upcomingAppointment.length !== 0 && upcomingAppointment[0].scheduledStartTime
        ? DatetimeHelper.trimOffTimeZoneOffset(upcomingAppointment[0].scheduledStartTime)
        : '',
    [upcomingAppointment]
  );
  const { isLoading: isLoadingAppointment, data: historyAppointments } = useGetCustomerAppointmentsHistory();
  const lastCompletedAppointmentDate = useMemo(
    () =>
      maxBy(
        historyAppointments?.filter(
          (appointment: CustomerAppointmentHistoryType) => appointment.attributes.status === AppointmentStatus.Completed
        ),
        (appointment: CustomerAppointmentHistoryType) => appointment.attributes.dateCompleted
      )?.attributes.start,
    [historyAppointments]
  );

  const redirectToScheduleAppointmentPage = () => {
    return navigate('/appointments/schedule');
  };

  const completeAppointmentDate = useMemo(() => {
    return lastCompletedAppointmentDate ? moment.utc(lastCompletedAppointmentDate).format(DATE_SHORT_SEPARATE_YEAR_FORMAT) : '';
  }, [lastCompletedAppointmentDate]);

  const modalDescription = (): React.ReactNode => {
    if (isMonthlyBillingEnabled && customer && customer.isOnMonthlyBilling) {
      return (
        <div className="text-gray-500">
          Your last treatment was on <span className="font-bold text-gray-500">{completeAppointmentDate}</span>. <br /> We can schedule your
          next treatment.
        </div>
      );
    } else {
      return (
        <div className="text-gray-500">
          Your last treatment was on <span className="font-bold text-gray-500">{completeAppointmentDate}</span>. <br /> We can schedule your
          next standard treatment.
        </div>
      );
    }
  };

  const modalLastTreatmentDescription = (): React.ReactNode => {
    const message = `Are you currently experiencing pest issues and need an additional treatment${
      isMonthlyBillingEnabled && customer && customer.isOnMonthlyBilling ? '' : ' at no additional cost'
    }?`;

    return (
      <>
        <div className="font-bold text-gray-900 text-font-18px leading-24px">
          Your last treatment was {dayCount} {dayCount > 1 ? 'days' : 'day'} ago
        </div>
        <p className="text-gray-500 text-font-14px leading-20px">{message}</p>
      </>
    );
  };

  const modalCanYouTellUsMore = (): React.ReactNode => {
    return (
      <>
        <div className="font-bold text-gray-900 text-font-18px leading-24px">Can you tell us more about it</div>
        <p className="text-gray-500 text-font-14px leading-20px mb-8">
          Please tell us what pests you&apos;re seeing and where our service pro should look for them.
        </p>

        <textarea
          value={issueNote}
          onChange={e => setIssueNote(e.target.value)}
          className="border border-gray-300 w-full rounded-md outline-none h-155px p-2 text-gray-500 fs-exclude"
        />

        {showError && <p className="text-red-600 text-left">{issueNoteError}</p>}
      </>
    );
  };

  const formattedDateString = () => {
    if (sanitizedDate && upcomingAppointment && upcomingAppointment.length > 0) {
      const timeWindow = upcomingAppointment[0].timeWindow;
      
      if (timeWindow === 'AT') {
        return `${sanitizedDate.format(DATE_ORDER_FORMAT)} - Anytime`;
      } else {
        const startTime = sanitizedDate;
        const formattedTime = startTime.format('A') === 'AM' ? 'AM Appointment' : 'PM Appointment';
        return `${sanitizedDate.format(DATE_ORDER_FORMAT)} - ${formattedTime}`;
      }
    }
    return '';
  };

  if (isLoading || isLoadingAppointment) {
    return <UpcomingAppointmentWidgetSkeleton />;
  }

  const onOpenIssueMessagePopup = () => {
    setToggleModal(false);
    redirectToScheduleAppointmentPage();
  };

  const onHandleScheduleReturnVisitBtn = () => {
    trackClick('schedule_return_visit/from/schedule_appt');
    lastCompletedAppointmentDate ? setToggleModal(true) : redirectToScheduleAppointmentPage();
  };

  const isIssueNoteEmpty = () => issueNote === '';

  const onHandleProcessSchedule = () => {
    setIsDoneNotePopup(true);
    setShowError(false);
    setToggleTellUsMoreModal(false);
    redirectToScheduleAppointmentPage();
  };

  const onProcessSchedule = () => {
    isIssueNoteEmpty() ? setShowError(true) : onHandleProcessSchedule();
  };

  const onHandleClickWhyNoReschedule = () => {
    trackClick('why_cannot_reschedule/from/schedule_appt');
    setToggleCanRescheduleModal(true);
  };

  const onHandleCancelSaveProcess = () => {
    setShowError(false);
    setIssueNote('');
    setIsDoneNotePopup(false);
  };

  return (
    <>
      {upcomingAppointment && upcomingAppointment.length !== 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-md mb-5 divide-y divide-gray-200">
          <div className="pt-[16px] pl-[16px] pr-[16px] sm:px-6 sm:py-4">
            <div className="breakpoint-1420:flex justify-between items-center">
              <div className="justify-start breakpoint-1420:flex items-center breakpoint-1420:items-start space-x-4 mb-[16px] breakpoint-1420:mb-0 w-full breakpoint-1420:w-[60%]">
                <div className="flex justify-center">
                  <div className="flex items-center justify-center bg-green-50 rounded-full w-[48px] h-[48px] mr-[8px]">
                    <img src={calendarIcon} className="w-6" alt="" />
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold -m-1">{DatetimeHelper.format(sanitizedDate, 'D')}</p>
                    <p className="text-xl font-bold uppercase text-gray-500 sm:mt-0">{DatetimeHelper.format(sanitizedDate, 'MMM')}</p>
                  </div>
                </div>
                <div className="flex-col justify-center items-start">
                  <p className="font-medium mb-2 text-center breakpoint-1420:text-left">Upcoming Appointment</p>
                  <p className="text-center text-gray-500 sm:mt-0">{formattedDateString()}</p>
                </div>
              </div>

              <div className="w-full breakpoint-1420:w-[40%]">
                <div className="mb-4 flex justify-center breakpoint-1420:justify-end items-center">
                  <Link to="/appointments/upcoming">
                    <Button
                      label="View Details"
                      type="button"
                      color="muted"
                      onClick={() => trackClick('view_details/from/schedule_appt')}
                    />
                  </Link>
                  {!upcomingAppointment[0].isInitial && (
                    <>
                      {canBeRescheduled && (
                        <div className="ml-4">
                          {!hideRescheduleBtn && (
                            <Link to={`/appointments/reschedule/${upcomingAppointment[0].id}`}>
                              <Button
                                label="Reschedule"
                                type="button"
                                color="primary"
                                onClick={() => trackClick('reschedule/from/schedule_appt')}
                              />
                            </Link>
                          )}
                        </div>
                      )}
                      {!canBeRescheduled && (
                        <div className="ml-4">
                          <Button label="Reschedule" type="button" disabled className="bg-white text-gray-300 border border-gray-300" />
                        </div>
                      )}
                    </>
                  )}
                </div>

                {!canBeRescheduled && !upcomingAppointment[0].isInitial && (
                  <div onClick={onHandleClickWhyNoReschedule} className="text-right text-gray-500 underline cursor-pointer">
                    Why can&apos;t I reschedule?
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="pl-[16px] pr-[16px] pb-[16px]">
            {subscriptions && (
              <ApproximateServiceSchedule
                isHavingBorderTop={false}
                plan={subscriptions[0].attributes.serviceType.toUpperCase() as 'PRO' | 'BASIC' | 'PREMIUM' | 'PRO PLUS'}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white shadow sm:rounded-md mb-5 p-[16px] sm:px-6 sm:py-4 ">
          {historyAppointments?.length === 0 ? (
            <div className="flex gap-4 py-4">
              <div className="flex items-center justify-center bg-green-50 rounded-full w-[48px] h-[48px] shrink-0">
                <img src={calendarIcon} className="w-6" alt="" />
              </div>
              <div className="flex flex-col gap-3 flex-wrap text-left">
                <p className="font-medium text-base leading-none">Your initial appointment has not been scheduled yet.</p>
                <p className="text-gray-500 text-sm leading-4">
                  To schedule your initial appointment, please call{' '}
                  <a href="tel:+13856006192" className="text-aptive-link font-medium inline-flex">
                    385-600-6192
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col breakpoint-1162:flex-row items-center">
              <div className="flex items-start breakpoint-1162:items-center w-full space-x-4">
                <div className="flex items-center justify-center bg-green-50 rounded-full w-[48px] h-[48px]">
                  <img src={bugIcon} className="w-5" alt="" />
                </div>
                <p className="text-xl font-medium mb-2 w-[calc(100%-48px)]">
                  Your regular appointment has not been scheduled. Need us to come back sooner? Schedule here.
                </p>
              </div>

              <div className="space-x-2 flex ml-2 flex-shrink-0 mt-5 md:mt-0">
                <Button label="Schedule a Return Visit" type="button" color="muted" onClick={onHandleScheduleReturnVisitBtn} />
              </div>
            </div>
          )}
          {!hideFrequencyPanel && subscriptions && (
            <ApproximateServiceSchedule
              plan={subscriptions[0].attributes.serviceType.toUpperCase() as 'PRO' | 'BASIC' | 'PREMIUM' | 'PRO PLUS'}
            />
          )}
        </div>
      )}
      {isLoading && <LoadingSpinner label="Loading Appointment..." centered />}
      {customer && (
        <>
          {/* {showConfirmRescheduleDialog && (
            <ConfirmRescheduleDialog
              isOpen={showConfirmRescheduleDialog}
              setOpen={setShowConfirmRescheduleDialog}
              onConfirm={redirectToScheduleAppointmentPage}
              isLoading={false}
              isNoteRequired={!customer.isDueForStandardTreatment}
            />
          )} */}
          {!customer.isDueForStandardTreatment && (
            <AptiveModal
              description={modalLastTreatmentDescription()}
              approveButtonText="Yes"
              approveButtonColor="primary"
              isOpen={toggleModal}
              setOpen={setToggleModal}
              cancelButtonText="No"
              isLoading={isLoading}
              confirmCallback={onOpenIssueMessagePopup}
              trackingInfo={{ name: 'popup_confirm', buttonApproval: 'click_yes', buttonCancel: 'click_no' }}
            />
          )}
          {customer.isDueForStandardTreatment && (
            <AptiveModal
              description={modalDescription()}
              approveButtonText="Continue scheduling"
              approveButtonColor="primary"
              isOpen={toggleModal}
              setOpen={setToggleModal}
              cancelButtonText="I'll schedule later"
              isLoading={isLoading}
              confirmCallback={() => {
                redirectToScheduleAppointmentPage();
                setTimeout(() => {
                  document.getElementById('tell-us-more-txt')?.focus();
                }, 300);
              }}
              trackingInfo={{ name: 'popup_confirm', buttonApproval: 'click_continue', buttonCancel: 'click_cancel' }}
            />
          )}
          {toggleTellUsMoreModal && (
            <AptiveModal
              description={modalCanYouTellUsMore()}
              approveButtonText="Save and proceed to schedule"
              approveButtonColor="primary"
              isOpen={toggleTellUsMoreModal}
              setOpen={setToggleTellUsMoreModal}
              cancelButtonText="Cancel"
              isLoading={isLoading}
              confirmCallback={onProcessSchedule}
              cancelCallback={onHandleCancelSaveProcess}
              trackingInfo={{ name: 'popup_note', buttonApproval: 'click_save', buttonCancel: 'click_cancel' }}
            />
          )}
          {!canBeRescheduled && (
            <AptiveModal
              description="Online rescheduling is not available for a same-day appointment. Please call or text 855-BUG-FREE (855-284-3733) for personal assistance."
              approveButtonColor="primary"
              isOpen={toggleCanRescheduleModal}
              setOpen={setToggleCanRescheduleModal}
              cancelButtonText="Close"
              isLoading={isLoading}
              confirmCallback={redirectToScheduleAppointmentPage}
            />
          )}
        </>
      )}
    </>
  );
};

export default UpcomingAppointmentWidget;
