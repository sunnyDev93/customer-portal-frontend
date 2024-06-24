import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { getDirectCustomerAppointmentsHistory } from 'services/CustomerService';
import { QueryKeys } from 'constants/query-keys';
import { useRecoilValue } from 'recoil';
import aptiveUserAccountId from 'app-recoil/selectors/aptive-user-account-id';

export const useGetCustomerAppointmentsHistory = () => {
  const accountId = useRecoilValue(aptiveUserAccountId);

  return useQuery<any, AxiosError>(QueryKeys.AppointmentsHistory, () => getDirectCustomerAppointmentsHistory(accountId), {
    enabled: !!accountId,
  });
};
