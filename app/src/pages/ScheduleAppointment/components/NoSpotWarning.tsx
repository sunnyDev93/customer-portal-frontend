import React, { useMemo } from 'react';
import moment from 'moment';
import { useGetSpots } from 'pages/ScheduleAppointment/hooks/useGetSpots';
import { DatetimeHelper } from 'helpers/datetime';
import { DATE_FORMAT } from 'constants/datetime';

interface NoSpotWarningProps {
  accountId: string;
}

const dateStart = DatetimeHelper.format(moment().add(1, 'days'), DATE_FORMAT);
const dateEnd = DatetimeHelper.format(moment().add(16, 'days'), DATE_FORMAT);

const NoSpotWarning = ({ accountId }: NoSpotWarningProps) => {
  const { isLoading, data: spots } = useGetSpots(accountId, dateStart, dateEnd);
  const showWarning = useMemo(() => !isLoading && spots && spots.length <= 0, [isLoading, spots]);

  return showWarning ? (
    <div className="bg-red-100 border-red-500 text-red-700 border shadow overflow-hidden sm:rounded-md mb-5">
      <ul className="divide-y divide-gray-200">
        <li>
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center">
              <div className="flex items-center w-full space-x-4">
                <div>
                  <div className="">
                    <span className="font-bold">There are no available appointments in the selected period.</span>
                  </div>
                  <div className="flex items-center text-red-700 sm:mt-0">
                    <div className="">
                      Try another date range or{' '}
                      <span className="font-bold">
                        <a href="tel:+18552843733" className="underline">
                          call
                        </a>
                      </span>{' '}
                      <span className="font-bold">855-BUG-FREE</span> (855-284-3733) for personal assistance.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  ) : null;
};

export default NoSpotWarning;
