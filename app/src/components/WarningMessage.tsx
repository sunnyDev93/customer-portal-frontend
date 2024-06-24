import React from 'react';
import { CheckIcon, ExclamationIcon, XIcon, CheckCircleIcon } from '@heroicons/react/solid';

interface WarningMessageProps {
  type?: 'warning' | 'error' | 'success' | 'checked';
  message: React.ReactNode;
  isCloseable?: boolean;
  description?: string;
  onClose?: () => void;
}

const WarningMessage: React.FC<WarningMessageProps> = ({ type = 'warning', message, isCloseable = false, description, onClose }) => {
  let color, icon;

  const warningConfig = {
    warning: {
      bgColor: 'bg-amber-100',
      color: 'text-amber-800',
    },
    error: {
      bgColor: 'bg-red-100',
      color: 'text-red-800',
    },
    success: {
      bgColor: 'bg-green-100',
      color: 'text-green-800',
    },
    checked: {
      bgColor: 'bg-green-100',
      color: 'text-green-800',
    },
  };

  switch (type) {
    case 'warning':
      color = 'amber';
      icon = <ExclamationIcon className={`h-6 ${warningConfig[type].color}`} />;
      break;
    case 'error':
      color = 'red';
      icon = <ExclamationIcon className={`h-6 ${warningConfig[type].color}`} />;
      break;
    case 'success':
      color = 'green';
      icon = <CheckIcon className={`h-6 ${warningConfig[type].color}`} />;
      break;
    case 'checked':
      color = 'green';
      icon = <CheckCircleIcon className={`h-6 ${warningConfig[type].color}`} />;
      break;
  }

  return (
    <div className={`rounded-md relative  ${warningConfig[type].bgColor} p-4 `}>
      <div className={`items-center flex flex-start`}>
        {icon}
        {isCloseable && (
          <div
            className="absolute right-[16px] top-[16px]"
            onClick={() => {
              onClose && onClose();
            }}
          >
            <XIcon className={`h-6 ${warningConfig[type].color}`} />
          </div>
        )}
        <div className={`ml-3 text-sm font-bold ${warningConfig[type].color}`}>{message}</div>
      </div>

      <div className="mt-[4px] ">
        <p className={`text-sm text-gray-500 ${warningConfig[type].color}`}>{description}</p>
      </div>
    </div>
  );
};

export default WarningMessage;
