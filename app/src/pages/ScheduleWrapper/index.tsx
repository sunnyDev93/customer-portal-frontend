import React, { useMemo } from 'react';
import { withAuthenticationRequired } from '../../shared/hooks/AptiveAuth';
import LoadingSpinner from 'components/LoadingSpinner';
import { useGetCustomerUpcomingAppointment } from 'shared/hooks/useGetCustomerUpcomingAppointment';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import aptiveUserAccountId from 'app-recoil/selectors/aptive-user-account-id';

const ScheduleWrapperPage = () => {
  const accountId = useRecoilValue(aptiveUserAccountId);

  const { isLoading, data: upcomingAppointment } = useGetCustomerUpcomingAppointment(accountId);
  const path = useMemo(
    () =>
      upcomingAppointment && upcomingAppointment.length !== 0 && upcomingAppointment[0].id
        ? `reschedule/${upcomingAppointment[0].id}`
        : 'schedule',
    [upcomingAppointment]
  );

  if (isLoading) return <LoadingSpinner centered />;

  return <Navigate to={`/appointments/${path}`} />;
};

export default withAuthenticationRequired(ScheduleWrapperPage, {
  onRedirecting: () => <LoadingSpinner centered />,
});
