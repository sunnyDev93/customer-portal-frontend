import { useQuery } from 'react-query';
import { QueryKeys } from 'constants/query-keys';
import { getCustomerDocuments } from 'services/CustomerService';
import { useRecoilValue } from 'recoil';
import aptiveUserAccountId from 'app-recoil/selectors/aptive-user-account-id';
import { formatObject } from 'utils/response-formatter';
import { CustomerDocumentResponse, DocumentAttributes } from 'types/request';
import { AxiosError } from 'axios';

export type CustomerDocument = DocumentAttributes & {
  id: number;
  type: string;
};

const useGetCustomerDocuments = () => {
  const accountId = useRecoilValue(aptiveUserAccountId);

  return useQuery<CustomerDocumentResponse, AxiosError, CustomerDocument[]>(
    [QueryKeys.GetCustomerDocuments, accountId],
    () => getCustomerDocuments(accountId),
    {
      enabled: !!accountId,
      select: data => {
        return data?.data?.map(item => ({ type: item.type, ...formatObject(item) })) as CustomerDocument[];
      },
    }
  );
};

export default useGetCustomerDocuments;
