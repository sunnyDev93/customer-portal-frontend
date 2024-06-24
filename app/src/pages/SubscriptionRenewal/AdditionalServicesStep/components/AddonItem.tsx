import React, { useMemo } from 'react';
import { PlanAddon, PlanServiceStatus } from 'types/plan';
import { CheckCircleIcon, PlusCircleIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

export type PlanServiceItemProps = {
  addon: PlanAddon;
  isSelected?: boolean;
  onSelect?: (addon: PlanAddon) => void;
};

const AddonItem = ({ addon, isSelected, onSelect }: PlanServiceItemProps) => {
  const isIncluded = useMemo(() => [PlanServiceStatus.Included, PlanServiceStatus.Selected].includes(addon?.status), [addon?.status]);

  const isDisabled = useMemo(() => addon?.status === PlanServiceStatus.Disabled, [addon?.status]);

  const isEnabled = useMemo(() => addon?.status === PlanServiceStatus.Enable, [addon?.status]);

  const defaultDescription = useMemo(() => {
    if (isIncluded) return 'included';
    if (isDisabled) return 'Contact Customer Support';
    return '';
  }, [isIncluded, isDisabled]);

  const iconColor = useMemo(() => {
    if (isEnabled) return '#309C42';
    return '#9CA3AF';
  }, [isEnabled]);

  const ButtonIcon = useMemo(() => {
    if (isIncluded || isSelected) return CheckCircleIcon;
    return PlusCircleIcon;
  }, [isIncluded, isSelected]);

  return (
    <div
      data-testid="plan-service-item"
      className={classNames(
        'w-full flex justify-between items-center py-4 px-6 decoration min-h-[65px] rounded-lg border [box-shadow:0px_1px_3px_0px_#0000001A]',
        !isEnabled && 'bg-gray-50',
        isSelected && 'border-[#309C42] border-[1px]'
      )}
    >
      <div className="w-[30px] mr-2">
        <img src={addon.iconSrc} alt="icon" />
      </div>
      <div className="w-full">
        <p className={classNames(isEnabled ? 'text-[#309C42]' : 'text-[#9CA3AF]')}>{addon.name}</p>
        <p className="text-[11px] italic text-[#6B7280]">{addon.description || defaultDescription}</p>
      </div>
      <div data-testid="action-button" className="w-[24px] ml-2">
        <ButtonIcon
          data-testid={isIncluded || isSelected ? 'check-circle-icon' : 'plus-circle-icon'}
          width="24px"
          color={iconColor}
          className={classNames({ 'cursor-pointer': isEnabled })}
          onClick={() => isEnabled && onSelect?.(addon)}
        />
      </div>
    </div>
  );
};

export default AddonItem;
