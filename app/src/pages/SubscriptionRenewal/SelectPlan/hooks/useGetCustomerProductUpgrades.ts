import { useQuery } from 'react-query';
import { QueryKeys } from 'constants/query-keys';
import { getProductUpgradesForCustomer } from 'services/CustomerService';
import { useRecoilValue } from 'recoil';
import aptiveUserAccountId from 'app-recoil/selectors/aptive-user-account-id';

const useGetCustomerProductUpgrades = () => {
  const accountId = useRecoilValue(aptiveUserAccountId);

  return useQuery([QueryKeys.GetCustomerProductUpgrades], () => getProductUpgradesForCustomer(accountId), {
    enabled: !!accountId,
  });
};

export default useGetCustomerProductUpgrades;
