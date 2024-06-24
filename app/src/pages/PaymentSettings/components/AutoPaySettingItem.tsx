import React from 'react';

interface AutoPaySettingItemProps {
  label: string;
  children: React.ReactNode;
}
const AutoPaySettingsItem = ({ label, children }: AutoPaySettingItemProps) => {
  return (
    <li>
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="w-1/2 md:w-1/3">
            <p className="flex text-[14px]  items-center text-gray-500 font-medium sm:mt-0">{label}</p>
          </div>

          <div className="ml-2 flex w-full items-center">
            <p className="text-[14px]  font-medium mb-1 text-gray-900">{children}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default AutoPaySettingsItem;
