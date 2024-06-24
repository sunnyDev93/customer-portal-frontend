import { useEffect, useState } from 'react';
import moment from 'moment';

import aptiveAPI from '../services/config';

import useLocalStorage from 'use-local-storage';
import useSessionStorageState from 'use-session-storage-state';
import { DatetimeHelper } from 'helpers/datetime';
import { DATE_FORMAT } from 'constants/datetime';
import { Token } from '../constants/auth';

interface User {
  accountId: string;
  firstName: string;
  lastName: string;
  email: string;
}

const useAppointments = () => {
  const [upcomingAppointment, setUpcomingAppointment] = useState<any>({});
  const [appointments, setAppointments] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [aptiveUser, setAptiveUser] = useSessionStorageState<User | null>('aptiveUser', { defaultValue: null });
  const [aptiveUserToken, setAptiveToken] = useLocalStorage(Token.AccessToken, '');

  useEffect(() => {
    if (!appointments.length) {
      getUpcomingAppointment();
    }
  }, []);

  const getUpcomingAppointment = async () => {
    setIsLoading(true);

    if (aptiveUserToken && aptiveUser?.accountId) {
      try {
        const { data }: any = await aptiveAPI.post(
          `/customer/${aptiveUser?.accountId}/appointments`,
          {
            date_start: DatetimeHelper.now(DATE_FORMAT),
            date_end: DatetimeHelper.format(moment().add(3, 'weeks'), DATE_FORMAT),
          },
          {
            headers: {
              Authorization: `Bearer ${aptiveUserToken}`,
            },
          }
        );

        setAppointments(data.data);

        if (data.data.length > 0) {
          setUpcomingAppointment(data.data[0]);
        }
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    }
  };

  return { upcomingAppointment, appointments, isLoading, getUpcomingAppointment };
};

export default useAppointments;
