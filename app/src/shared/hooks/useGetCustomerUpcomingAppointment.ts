import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { getCustomerUpcomingAppointment } from 'services/CustomerService';
import { Appointment, CustomerUpcomingAppointmentResponse } from 'types/request';
import { formattedResponse } from 'utils/response-formatter';
import { QueryKeys } from 'constants/query-keys';

export const useGetCustomerUpcomingAppointment = (accountId: string) => {
  return useQuery<CustomerUpcomingAppointmentResponse, AxiosError, Appointment[] | null>(
    QueryKeys.GetCustomerUpcomingAppointment,
    () => getCustomerUpcomingAppointment(accountId),
    {
      enabled: !!accountId,
      select: data => formattedResponse(data) as Appointment[],
    }
  );
};
