import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { getCustomerSpots } from 'services/CustomerService';
import { CustomerSpotsResponse, Spot } from 'types/request';
import { formattedResponse } from 'utils/response-formatter';

export const useGetSpots = (accountId: string, dateStart: string, dateEnd: string) => {
  return useQuery<CustomerSpotsResponse, AxiosError, Spot[]>(
    ['getSpots', accountId, dateStart, dateEnd],
    () => getCustomerSpots(accountId, { dateStart, dateEnd }),
    {
      enabled: !!accountId,
      select: data => {
        const a = formattedResponse(data);
        return formattedResponse(data) as Spot[];
      },
    }
  );
};
