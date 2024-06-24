import { useQuery } from 'react-query';
import groupBy from 'lodash/groupBy';
import find from 'lodash/find';
import { useMemo } from 'react';
import { getAvailableSpots } from 'services/CustomerService';
import { useRecoilValue } from 'recoil';
import aptiveUserAccountId from 'app-recoil/selectors/aptive-user-account-id';
import { CustomerSpot, SpotWindow } from 'types/request';

const findSampleSpot = (spots: CustomerSpot[], window: SpotWindow): CustomerSpot | undefined => {
  return find(spots, spot => spot.attributes.window === window);
};

const getSampleSpots = (spots: CustomerSpot[]): Record<SpotWindow, CustomerSpot | undefined> => {
  return { AM: findSampleSpot(spots, 'AM') || undefined, PM: findSampleSpot(spots, 'PM') || undefined };
};

const groupByDay = (spots: CustomerSpot[]) => {
  if (!spots) return {};
  const groupedByDay = groupBy(spots, spot => spot.attributes.date);
  const result: Record<string, Record<string, CustomerSpot | undefined>> = {};
  Object.keys(groupedByDay).forEach(date => (result[date] = getSampleSpots(groupedByDay[date])));
  return result;
};

const useGetAvailableSpots = (enabled = true) => {
  const accountId = useRecoilValue(aptiveUserAccountId);

  const { data, isLoading } = useQuery(['getAvailableSpots'], async () => getAvailableSpots(accountId), {
    enabled,
  });
  const availableSpots = useMemo(() => (data ? groupByDay(data) : {}), [data]);

  const extractSpotIds = (date: string, window: SpotWindow) => {
    return data?.filter(spot => spot.attributes.date === date && spot.attributes.window === window);
  };

  return { availableSpots, isLoading, extractSpotIds };
};

export default useGetAvailableSpots;
