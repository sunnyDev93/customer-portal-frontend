import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';

import calendarIcon from '../images/calendar-icon.png';
import calendarGreyIcon from '../images/calendar-icon-grey.png';

interface AppointmentItemProps {
  date?: string;
  period?: string;
  unavailable?: boolean;
}

export const AppointmentItem: React.FC<PropsWithChildren<AppointmentItemProps>> = ({ date, period, unavailable }) => {
  return (
    <div
      className={classNames(
        unavailable ? 'bg-gray-100' : 'bg-white hover:border-gray-400',
        'relative flex justify-between items-center rounded-lg border border-gray-300 px-6 py-5 shadow-sm'
      )}
    >
      <div className="flex items-center space-x-3">
        <div
          className={classNames(
            unavailable ? 'bg-gray-200 border-gray-400' : 'bg-green-50 border-aptive-900',
            'flex items-center justify-center rounded-full border w-[48px] h-[48px]'
          )}
        >
          {unavailable ? <img src={calendarGreyIcon} className="w-5" /> : <img src={calendarIcon} className="w-5" />}
        </div>

        <div className={classNames(unavailable ? 'text-gray-400' : 'text-gray-900', 'font-medium')}>
          {unavailable ? 'Unavailable' : 'Available'}
        </div>
      </div>
      <div className="text-right">
        <a href="#" className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className={classNames(unavailable ? 'text-gray-400' : 'text-gray-900', 'text-sm font-medium ')}>{date}</p>
          <p className={classNames(unavailable ? 'text-gray-400' : 'text-gray-500', 'truncate text-sm text-gray-500')}>{period}</p>
        </a>
      </div>
    </div>
  );
};

export default AppointmentItem;
