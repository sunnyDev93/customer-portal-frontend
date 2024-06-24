import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { getCustomerInvoices } from 'services/CustomerService';
import { QueryKeys } from 'constants/query-keys';
import { useRecoilValue } from 'recoil';
import aptiveUserAccountId from 'app-recoil/selectors/aptive-user-account-id';
import { InvoiceType } from 'types/request';

export const useGetCustomerInvoices = () => {
  const accountId = useRecoilValue(aptiveUserAccountId);

  return useQuery<InvoiceType[], AxiosError>(QueryKeys.Invoices, () => getCustomerInvoices(accountId), {
    enabled: !!accountId,
  });
};
