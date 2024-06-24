import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import aptiveUserAccountId from 'app-recoil/selectors/aptive-user-account-id';
import { rescheduleAppointment } from 'services/CustomerService';
import { ScheduleAppointmentRequest } from 'types/request';

const useRescheduleAppointment = () => {
  const accountId = useRecoilValue(aptiveUserAccountId);

  const { mutateAsync } = useMutation<AxiosResponse, AxiosError, { appointmentId: string; payload: ScheduleAppointmentRequest }>(
    ({ appointmentId, payload }) => rescheduleAppointment(accountId, appointmentId, payload)
  );

  return { rescheduleAppointmentMutate: mutateAsync };
};

export default useRescheduleAppointment;
