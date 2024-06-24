import { useMutation } from 'react-query';
import { scheduleAnAppointment } from 'services/CustomerService';
import { useRecoilValue } from 'recoil';
import aptiveUserAccountId from 'app-recoil/selectors/aptive-user-account-id';
import { AxiosError, AxiosResponse } from 'axios';
import { ScheduleAppointmentRequest } from 'types/request';

const useScheduleAppointment = () => {
  const accountId = useRecoilValue(aptiveUserAccountId);

  const { mutateAsync } = useMutation<AxiosResponse, AxiosError, { payload: ScheduleAppointmentRequest }>(({ payload }) =>
    scheduleAnAppointment(accountId, payload)
  );

  return { scheduleAnAppointmentMutate: mutateAsync };
};

export default useScheduleAppointment;
