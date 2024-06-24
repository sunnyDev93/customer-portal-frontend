import { useQuery } from 'react-query';
import { QueryKeys } from 'constants/query-keys';
import { getProductsForCustomer } from 'services/CustomerService';
import { useRecoilValue } from 'recoil';
import aptiveUserAccountId from 'app-recoil/selectors/aptive-user-account-id';

const useGetCustomerProducts = () => {
  const accountId = useRecoilValue(aptiveUserAccountId);

  return useQuery([QueryKeys.GetCustomerProducts], () => getProductsForCustomer(accountId), {
    enabled: !!accountId,
  });
};

export default useGetCustomerProducts;
