import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import _ from 'lodash';

import moment from 'moment';

import { getSpots, rescheduleAppointment, scheduleAppointment } from 'services/ScheduleService';

import { DatetimeHelper } from 'helpers/datetime';
import { DATE_FORMAT, DATE_ORDER_SEPARATE_YEAR_FORMAT, SHORT_WEEKDAY_FORMAT, WEEKDAY_FORMAT } from 'constants/datetime';
import { useGetCustomerUpcomingAppointment } from 'shared/hooks/useGetCustomerUpcomingAppointment';
import LoadingSpinner from 'components/LoadingSpinner';
import DateSelector from 'components/DateSelector';
import AppointmentItem from 'components/AppointmentItem';
import PageTitle from 'components/PageTitle';
import AptiveModal from 'components/modals/AptiveModal';
import NoSpotWarning from 'pages/ScheduleAppointment/components/NoSpotWarning';
import { withAuthenticationRequired } from '../../shared/hooks/AptiveAuth';
import { useRecoilState, useRecoilValue } from 'recoil';
import { aptiveUserState } from 'app-recoil/atoms/auth/aptive-user';
import aptiveUserAccountId from 'app-recoil/selectors/aptive-user-account-id';
import scheduleIcon from 'images/schedule-icon.svg';
import { customerInfoDataState } from 'app-recoil/atoms/customer-info';
import { issueNoteState, isAlreadyShowNotePopup } from 'app-recoil/atoms/issue-note';
import { useTrackingClick } from '../../shared/hooks/useTrackingClick';
import { useTrackingView } from '../../shared/hooks/useTrackingView';
import { useFeatureFlag } from 'configcat-react';
import ScheduleAppointmentContainer from 'components/ScheduleAppointmentContainer';
import useGetAvailableSpots from 'components/ScheduleAppointmentContainer/hooks/useGetAvailableSpots';
import { CustomerSpot, SpotWindow } from 'types/request';
import useScheduleAppointment from 'components/ScheduleAppointmentContainer/hooks/useScheduleAppointment';
import useRescheduleAppointment from 'components/ScheduleAppointmentContainer/hooks/useRescheduleAppointment';
import ConfirmRescheduleDialog from 'pages/ScheduleAppointment/components/ConfirmRescheduleDialog';
import ScheduleAppointmentDialog from 'pages/ScheduleAppointment/components/ScheduleAppointmentDialog';
import { useNavigate } from 'react-router-dom';

const momentAddDays = (days: number) => {
  return moment().add(days, 'days');
};

type SpotType = {
  attributes: { date: string; time: string };
  id: number;
  type: string;
};

interface ScheduleAppointmentPageProps {
  pageTitle?: ReactNode;
}

const ScheduleAppointmentPage: React.FC<ScheduleAppointmentPageProps> = ({ pageTitle }) => {
  const { trackClick } = useTrackingClick();
  const { value: isNewSchedulingEnabled, loading: isLoadingFeatureFlag } = useFeatureFlag('isNewSchedulingEnabled', false);
  const navigate = useNavigate();

  useTrackingView();

  const aptiveUser = useRecoilValue(aptiveUserState);
  const accountId = useRecoilValue(aptiveUserAccountId);

  const { appointmentId } = useParams();
  const [issueNote, setIssueNote] = useRecoilState(issueNoteState);

  const { isLoading: appLoading, data: upcomingAppointment } = useGetCustomerUpcomingAppointment(accountId);
  const [toggleSpinner, setToggleSpinner] = useState(false);
  const customer = useRecoilValue(customerInfoDataState);

  const isReschedule = !!appointmentId;

  const cannotSchedule = upcomingAppointment && upcomingAppointment.length !== 0 && !upcomingAppointment[0].canBeRescheduled;
  const appStartDate = useMemo(
    () =>
      upcomingAppointment && upcomingAppointment.length !== 0 && upcomingAppointment[0].start
        ? DatetimeHelper.trimOffTimeZoneOffset(upcomingAppointment[0].start)
        : '',
    [upcomingAppointment]
  );
  const rescheduleSubtitle = useMemo(
    () =>
      isReschedule && (
        <>
          You currently have {DatetimeHelper.format(appStartDate, 'A') === 'AM' ? 'an' : 'a'}{' '}
          <span className="font-bold">{DatetimeHelper.format(appStartDate, 'A')} Appointment</span> scheduled on{' '}
          <span className="font-bold">{DatetimeHelper.format(appStartDate, DATE_ORDER_SEPARATE_YEAR_FORMAT)}</span>
        </>
      ),
    [isReschedule, appStartDate]
  );

  const spotObject: SpotType = {
    id: 0,
    type: '',
    attributes: { date: '', time: '' },
  };
  const [toUpcomingEventPage, setToUpcomingEventPage] = useState(false);
  const [spots, setSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState<SpotType>(spotObject);
  const [isLoading, setIsLoading] = useState(false);
  const [spotPeriod, setSpotPeriod] = useState<string>('');
  const [showError, setShowError] = useState(false);
  const [toggleTellUsMoreModal, setToggleTellUsMoreModal] = React.useState(false);
  const issueNoteError = 'The note field is required';
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const isLoadingSpots = isLoading && !cannotSchedule;
  const isNoSpots = spots.length === 0 && !appLoading;

  const dateChange = async (selectedDates: Array<moment.MomentInput>) => {
    if (aptiveUser) {
      setToggleSpinner(true);
      const { status, data } = await getSpots(aptiveUser.accountId, {
        date_start: DatetimeHelper.format(selectedDates[0], DATE_FORMAT),
        date_end: DatetimeHelper.format(selectedDates[1], DATE_FORMAT),
      });
      if (status === 200) {
        setSpots(data.data);
      }
      setToggleSpinner(false);
    }
  };

  useEffect(() => {
    if (!isLoadingFeatureFlag && isNewSchedulingEnabled === false) {
      dateChange([momentAddDays(1), momentAddDays(4)]).then(() => {
        setIsLoading(false);
      });
    }
  }, []);
  // ----------------

  const selectSpot = (spot: any) => {
    setSelectedSpot(spot);
    setSpotPeriod(spot.attributes.time);
    if (issueNote === '' && customer && !customer.isDueForStandardTreatment && !isReschedule) {
      setToggleTellUsMoreModal(true);
    } else {
      setIsConfirmModalOpen(true);
    }
  };

  const confirmSpot = async () => {
    if (aptiveUser) {
      setIsLoading(true);
      const { status, data } = await scheduleAppointment(aptiveUser?.accountId, {
        spotId: parseInt(selectedSpot.id.toString()),
        notes: issueNote,
      });

      if (status === 200) {
        window.location.href = '/appointments/upcoming';
      }
      setIsConfirmModalOpen(false);
      setIsLoading(false);
    }
  };

  const confirmReschedule = async () => {
    if (aptiveUser && upcomingAppointment && upcomingAppointment.length !== 0) {
      setIsLoading(true);
      const { status, data } = await rescheduleAppointment(aptiveUser?.accountId, upcomingAppointment[0].id.toString() || '', {
        spotId: Number(selectedSpot.id),
        notes: issueNote,
      });

      if (status === 200) {
        setIsConfirmModalOpen(false);
        setIsLoading(false);
        window.location.href = '/appointments/upcoming';
      }
    }
  };

  const handleClickBack = () => {
    setToggleSpinner(true);
    trackClick('spots_previous/from/spots_navigation');
  };

  const handleClickNext = () => {
    setToggleSpinner(true);
    trackClick('spots_next/from/spots_navigation');
  };

  const onHandleProcessSchedule = () => {
    if (issueNote === '') {
      setShowError(true);
    } else {
      setShowConfirmRescheduleDialog(false);
      setShowScheduleAppointmentDialog(true);
    }
  };

  const modalDescription =
    selectedSpot && isReschedule ? (
      <p className="text-sm text-gray-500">
        This will change your service appointment from
        <br />
        {DatetimeHelper.format(appStartDate, WEEKDAY_FORMAT)}
        {DatetimeHelper.format(appStartDate, 'A') === 'AM' ? ' before noon' : ' after noon'}
        <br />
        to
        <br />
        {DatetimeHelper.format(selectedSpot.attributes.date, WEEKDAY_FORMAT)}
        {spotPeriod === 'AM' ? ' before noon' : ' after noon'}
        <br />
      </p>
    ) : (
      <p className="text-sm text-gray-500">
        This will schedule a service appointment for
        <br />
        {DatetimeHelper.format(selectedSpot.attributes.date, WEEKDAY_FORMAT)}
        {spotPeriod === 'AM' ? ' before noon' : ' after noon'}
      </p>
    );

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

  // Start: integrate new APIs for scheduling
  const [availableSelectedSpots, setAvailableSelectedSpots] = useState<CustomerSpot[]>([]);
  const [isScheduling, setIsScheduling] = useState(false);
  const [selectedAvailableSpot, setSelectedAvailableSpot] = useState<CustomerSpot>();
  const [unavailableSpots, setUnavailableSpots] = useState<CustomerSpot[]>([]);
  const [showConfirmRescheduleDialog, setShowConfirmRescheduleDialog] = useState(false);
  const [showScheduleAppointmentDialog, setShowScheduleAppointmentDialog] = useState(false);
  const [showUnavailableErrorMessage, setShowUnavailableErrorMessage] = useState(false);
  const [isDoneNotePopup, setIsDoneNotePopup] = useRecoilState(isAlreadyShowNotePopup);

  const {
    availableSpots,
    isLoading: isLoadingAvailableSpots,
    extractSpotIds,
  } = useGetAvailableSpots(!isLoadingFeatureFlag && isNewSchedulingEnabled);
  const { scheduleAnAppointmentMutate } = useScheduleAppointment();
  const { rescheduleAppointmentMutate } = useRescheduleAppointment();

  const handleSelectWindow = (window: SpotWindow, date: string) => {
    setSelectedAvailableSpot(availableSpots[date][window]);
    setAvailableSelectedSpots(extractSpotIds?.(date, window) || []);
  };

  const handleScheduleAppointmentSuccess = () => {
    setShowUnavailableErrorMessage(false);
    navigate('/appointments/upcoming');
  };

  const mutateAsync = (spot: CustomerSpot) => {
    const payload = {
      spotId: spot.id,
      isAroSpot: spot.attributes.is_aro_spot,
      window: spot.attributes.window,
      notes: issueNote,
    };
    if (isReschedule) {
      return rescheduleAppointmentMutate({
        appointmentId: (upcomingAppointment && upcomingAppointment.length !== 0 && upcomingAppointment[0].id?.toString()) || '',
        payload,
      });
    }
    return scheduleAnAppointmentMutate({
      payload,
    });
  };

  const selectAvailableSpot = () => {
    if (isDoneNotePopup) {
      setShowScheduleAppointmentDialog(true);
    } else {
      setShowConfirmRescheduleDialog(true);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsScheduling(true);
      const pollingInterval = 200;
      let response;
      for (const spot of availableSelectedSpots.reverse()) {
        try {
          response = await mutateAsync(spot);

          if (response.status === 201 || response.status === 200) {
            handleScheduleAppointmentSuccess();
            break;
          }
        } catch (e) {
          await new Promise(resolve => setTimeout(resolve, pollingInterval));
        }
      }
      if (!response || response.status !== 201) {
        throw new Error();
      }
    } catch (error) {
      if (selectedAvailableSpot) {
        setUnavailableSpots([...unavailableSpots, selectedAvailableSpot]);
      }
      setSelectedAvailableSpot(undefined);
      setShowUnavailableErrorMessage(true);
    } finally {
      setIsScheduling(false);
      setShowConfirmRescheduleDialog(false);
      setShowScheduleAppointmentDialog(false);
    }
  };

  // End: integrate new APIs for scheduling

  const handleConfirm = () => {
    if (isNewSchedulingEnabled) {
      return handleSubmit();
    } else {
      return isReschedule ? confirmReschedule() : confirmSpot();
    }
  };

  if (toUpcomingEventPage) {
    return <Navigate to="/appointments/upcoming" />;
  }

  // LOADING
  if (isReschedule && appLoading && isLoadingFeatureFlag) {
    return <LoadingSpinner />;
  }

  // Cannot Reschedule
  if (cannotSchedule && isReschedule) {
    return (
      <>
        <PageTitle title="Reschedule Your Appointment" />

        <div className="w-full md:w-7/12 my-2">
          <p className="text-lg font-medium">This appointment can&apos;t be rescheduled at this time.</p>
        </div>
      </>
    );
  }

  if (!isReschedule && appLoading) {
    return (
      <>
        {!pageTitle && <PageTitle title="Schedule an Appointment" />}
        {pageTitle && <>{pageTitle}</>}

        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      {!pageTitle && (
        <PageTitle
          title={isReschedule ? 'Reschedule Your Appointment' : 'Schedule an Appointment'}
          subtitle={isReschedule ? rescheduleSubtitle : ''}
        />
      )}
      {pageTitle && <>{pageTitle}</>}

      {!isLoadingFeatureFlag && !isNewSchedulingEnabled && <NoSpotWarning accountId={accountId} />}

      <div className="flex flex-col justify-center items-center">
        <div className="md:w-[530px] w-full pb-4">
          {/*show new UI in case of scheduling a new appointment only + feature flag is on*/}
          {isNewSchedulingEnabled ? (
            <>
              <ScheduleAppointmentContainer
                availableSpots={availableSpots}
                isLoadingSpots={isLoadingAvailableSpots}
                isScheduling={isScheduling}
                selectedAvailableSpot={selectedAvailableSpot}
                unavailableSpots={unavailableSpots}
                showErrorMessage={showUnavailableErrorMessage}
                onSelectWindow={handleSelectWindow}
                onSubmit={selectAvailableSpot}
                onCloseErrorMessage={() => setShowUnavailableErrorMessage(false)}
              />
            </>
          ) : (
            <>
              <DateSelector
                onChange={dateChange}
                isLoading={isLoading || toggleSpinner}
                handleClickBack={handleClickBack}
                handleClickNext={handleClickNext}
              />

              {toggleSpinner && (
                <div className="mt-4 bg-white relative flex justify-between items-center rounded-lg px-6 py-5 shadow-sm">
                  <div className="flex justify-start items-center">
                    <div className="rounded-full border w-[48px] h-[48px] bg-gray-300" />
                  </div>
                  <div className="w-full">
                    <div className="ml-2 w-full h-2.5 bg-gray-300 rounded-full mb-2"></div>
                    <div className="ml-2 w-full h-2.5 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              )}

              {!toggleSpinner && (
                <>
                  {isLoadingSpots && (
                    <div className="my-10">
                      <LoadingSpinner label="Loading Spots..." centered />
                    </div>
                  )}
                  {isNoSpots && (
                    <div className="text-center my-10">
                      <p className="text-lg font-medium">No spots available</p>
                      <p className="text-sm text-gray-500">Please try another date range</p>
                    </div>
                  )}
                  {!isLoadingSpots && !isNoSpots && (
                    <>
                      {_.toArray(_.groupBy(spots, 'attributes.date')).map((spot: any, key: number) => {
                        const spotDate = spot[0].attributes.date;
                        const spotsByPeriod = _.groupBy(spot, 'attributes.time');

                        return (
                          <div className="space-y-4 my-4" key={key}>
                            <div className="">{DatetimeHelper.format(spotDate, SHORT_WEEKDAY_FORMAT)}</div>

                            <button
                              onClick={() => {
                                selectSpot(spotsByPeriod.AM[0]);
                                trackClick('certain_spot_card/from/spots_navigation');
                              }}
                              className="w-full"
                              disabled={!spotsByPeriod.AM}
                            >
                              <AppointmentItem
                                period="AM Appointment"
                                date={DatetimeHelper.format(spotDate, SHORT_WEEKDAY_FORMAT)}
                                unavailable={spotsByPeriod.AM ? false : true}
                              />
                            </button>

                            <button
                              onClick={() => {
                                selectSpot(spotsByPeriod.PM[0]);
                                trackClick('certain_spot_card/from/spots_navigation');
                              }}
                              className="w-full"
                              disabled={spotsByPeriod.PM ? false : true}
                            >
                              <AppointmentItem
                                period="PM Appointment"
                                date={DatetimeHelper.format(spotDate, SHORT_WEEKDAY_FORMAT)}
                                unavailable={spotsByPeriod.PM ? false : true}
                              />
                            </button>
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      {toggleTellUsMoreModal && (
        <AptiveModal
          description={modalCanYouTellUsMore()}
          approveButtonText="Save and proceed to schedule"
          approveButtonColor="primary"
          isOpen={toggleTellUsMoreModal}
          setOpen={setToggleTellUsMoreModal}
          cancelButtonText="Cancel"
          isLoading={isLoading}
          confirmCallback={onHandleProcessSchedule}
          cancelCallback={() => {
            setToggleTellUsMoreModal(false);
            setIssueNote('');
            setShowError(false);
            setSelectedSpot(spotObject);
            setSpotPeriod('');
          }}
          trackingInfo={{ name: 'popup_note', buttonApproval: 'click_save_proceed', buttonCancel: 'click_cancel' }}
        />
      )}

      {isConfirmModalOpen && (
        <AptiveModal
          icon={scheduleIcon}
          title={isReschedule ? 'Confirm Reschedule' : 'Confirm Appointment'}
          description={modalDescription}
          approveButtonText="Confirm"
          approveButtonColor="primary"
          isOpen={isConfirmModalOpen}
          setOpen={setIsConfirmModalOpen}
          isLoading={isLoading}
          confirmCallback={isReschedule ? confirmReschedule : confirmSpot}
          trackingInfo={{ name: 'popup_confirm', buttonApproval: 'click_confirm', buttonCancel: 'click_cancel' }}
        />
      )}

      {showConfirmRescheduleDialog && (
        <ConfirmRescheduleDialog
          isOpen={showConfirmRescheduleDialog}
          setOpen={setShowConfirmRescheduleDialog}
          onConfirm={() => setShowScheduleAppointmentDialog(true)}
          isLoading={isScheduling}
          isNoteRequired={(() => {
            if (customer?.isDueForStandardTreatment) {
              return false;
            }
            return !isReschedule;
          })()}
        />
      )}
      {showScheduleAppointmentDialog && (
        <ScheduleAppointmentDialog
          appStartDate={appStartDate}
          isOpen={showScheduleAppointmentDialog}
          selectedAvailableSpot={selectedAvailableSpot}
          setOpen={setShowScheduleAppointmentDialog}
          onConfirm={handleConfirm}
          isLoading={isScheduling}
          isReschedule={isReschedule}
        />
      )}
    </>
  );
};

export default withAuthenticationRequired(ScheduleAppointmentPage, {
  onRedirecting: () => <LoadingSpinner centered />,
});
