import React, { FC } from 'react';
import SpotItem from 'components/SpotItem';
import { DatetimeHelper } from 'helpers/datetime';
import moment from 'moment';
import { SpotWindow } from 'types/request';

type SlotProps = {
  disabled: boolean;
  selected: boolean;
};
type Props = {
  date: string;
  amSlot: SlotProps;
  pmSlot: SlotProps;
  onSelectWindow: (window: SpotWindow) => void;
};
const AppointmentSlot: FC<Props> = ({ date, amSlot, pmSlot, onSelectWindow }) => {
  return (
    <div className="breakpoint-575:w-[476px] w-full breakpoint-max-575:flex-col flex justify-between items-center mb-[16px]">
      <div className="w-[148px] text-[#111827] text-[14px] font-bold breakpoint-max-575:text-center breakpoint-max-575:mb-[8px] text-right">
        {DatetimeHelper.format(moment(date), 'dddd D')}
      </div>
      <div className="flex justify-between items-center breakpoint-max-575:w-[100%] w-[312px]">
        <div className="breakpoint-max-575:w-[48%] w-[148px]">
          <SpotItem label={'AM'} selected={amSlot.selected} disabled={amSlot.disabled} onClick={() => onSelectWindow('AM')} />
        </div>
        <div className="breakpoint-max-575:w-[48%] w-[148px]">
          <SpotItem label={'PM'} selected={pmSlot.selected} disabled={pmSlot.disabled} onClick={() => onSelectWindow('PM')} />
        </div>
      </div>
    </div>
  );
};

export default AppointmentSlot;
