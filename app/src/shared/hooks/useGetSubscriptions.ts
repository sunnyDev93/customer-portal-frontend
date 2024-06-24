import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { getCustomerSubscriptions } from 'services/CustomerService';
import { QueryKeys } from 'constants/query-keys';
import { useRecoilValue } from 'recoil';
import aptiveUserAccountId from 'app-recoil/selectors/aptive-user-account-id';
import { Subscription } from 'types/request';

export const useGetSubscriptions = () => {
  const accountId = useRecoilValue(aptiveUserAccountId);

  return useQuery<Subscription[], AxiosError>(QueryKeys.Subscriptions, () => getCustomerSubscriptions(accountId), {
    enabled: !!accountId,
  });
};
