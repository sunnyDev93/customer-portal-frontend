import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { cancelCustomerUpcomingAppointment } from 'services/CustomerService';
import { CustomerUpcomingAppointmentResponse } from 'types/request';
import { QueryKeys } from 'constants/query-keys';

interface CancelCustomerUpcomingAppointmentRequest {
  accountId: string;
  appointmentId: string;
}

export const useCancelCustomerUpcomingAppointment = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate: cancelCustomerUpcomingAppointmentMutate } = useMutation<
    unknown,
    AxiosError,
    CancelCustomerUpcomingAppointmentRequest
  >(({ accountId, appointmentId }) => cancelCustomerUpcomingAppointment(accountId, appointmentId), {
    onSuccess: _data => {
      queryClient.setQueryData<CustomerUpcomingAppointmentResponse>(
        QueryKeys.GetCustomerUpcomingAppointment,
        cachedData =>
          ({
            ...cachedData,
            data: [],
          } as CustomerUpcomingAppointmentResponse)
      );
    },
  });

  return { isLoading, cancelCustomerUpcomingAppointmentMutate };
};
