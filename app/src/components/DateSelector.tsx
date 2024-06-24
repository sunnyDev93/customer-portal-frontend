import React, { PropsWithChildren, useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { DATE_MONTH_FORMAT } from 'constants/datetime';

const moment = extendMoment(Moment);

interface DateSelectorProps {
  date?: string;
  increments?: number;
  label?: string;
  isLoading?: boolean;
  onChange?: (date: Array<Moment.MomentInput>) => void;
  handleClickBack?: () => void;
  handleClickNext?: () => void;
}

export const DateSelector: React.FC<PropsWithChildren<DateSelectorProps>> = ({
  date,
  increments = 3,
  label = 'Showing available appointments for the next two weeks',
  isLoading = false,
  onChange,
  handleClickBack,
  handleClickNext,
}) => {
  const initialDate = date ? moment(date) : moment().add(1, 'days');
  const secondDate = moment(initialDate).add(increments, 'days');
  const [selectedDates, setSelectedDate] = useState([initialDate, secondDate]);
  const maxDate = moment().add(14, 'days');

  const changeDate = (type: string) => {
    let newDate = [moment(), moment().add(increments, 'days')];

    if (type === 'next') {
      handleClickNext && handleClickNext();
      newDate = [moment(selectedDates[0]).add(increments + 1, 'days'), moment(selectedDates[1]).add(increments + 1, 'days')];
      setSelectedDate(newDate);
    }

    if (type === 'prev') {
      handleClickBack && handleClickBack();
      newDate = [moment(selectedDates[0]).subtract(increments + 1, 'days'), moment(selectedDates[1]).subtract(increments + 1, 'days')];
      setSelectedDate(newDate);
    }

    if (onChange) {
      onChange(newDate);
    }
  };

  return (
    <>
      <div className="mt-2 mb-5 font-medium">{label}</div>
      <div className="flex space-x-4">
        <button
          onClick={() => changeDate('prev')}
          type="button"
          className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          disabled={selectedDates[0].isSame(moment().add(1, 'days'), 'day') || isLoading}
        >
          <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="relative inline-flex justify-center w-full px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md cursor-default">
          {selectedDates[0].format(DATE_MONTH_FORMAT)} - {selectedDates[1].format(DATE_MONTH_FORMAT)}
          {isLoading && (
            <div className="absolute right-2">
              <svg version="1.0" width="16px" height="16px" viewBox="0 0 128 128">
                <g>
                  <path
                    d="M75.4 126.63a11.43 11.43 0 0 1-2.1-22.65 40.9 40.9 0 0 0 30.5-30.6 11.4 11.4 0 1 1 22.27 4.87h.02a63.77 63.77 0 0 1-47.8 48.05v-.02a11.38 11.38 0 0 1-2.93.37z"
                    fill="#000000"
                  />
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 64 64"
                    to="360 64 64"
                    dur="1000ms"
                    repeatCount="indefinite"
                  ></animateTransform>
                </g>
              </svg>
            </div>
          )}
        </div>

        <button
          onClick={() => changeDate('next')}
          type="button"
          className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          disabled={selectedDates[1].isSameOrAfter(maxDate) || isLoading}
        >
          <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </>
  );
};

export default DateSelector;
