import React from 'react';

export const LoadingInvoice: React.FC = () => {
  return (
    <div className="bg-white border border-gray-400 rounded-lg overflow-hidden mb-16">
      {Array.from({ length: 6 }, (v, i) => i).map(item => (
        <div
          key={item}
          data-testid="loading-placeholder"
          className="flex justify-between items-center border-b border-gray-300 pb-6 pt-6 pl-8 pr-8 "
        >
          <div className="w-full flex justify-start items-end">
            <div className="md:mr-16 md:w-auto w-full">
              <div className="text-black font-medium mb-3 bg-gray-200 animate-pulse h-24px w-full md:w-140px" />
              <div className="text-gray-500 text-font-14px leading-16px bg-gray-200 animate-pulse h-24px w-full md:w-140px" />
            </div>
            <div className="md:block hidden mr-16 w-full">
              <div className="text-black font-medium mb-3 bg-gray-200 animate-pulse h-24px w-full md:w-140px" />
              <div className="text-gray-500 text-font-14px leading-16px bg-gray-200 animate-pulse h-24px w-full md:w-140px" />
            </div>

            <div className="md:block hidden font-medium text-font-14px leading-16px text-red-500" />
          </div>
          <div className="md:block hidden flex justify-end items-center">
            <div className="ml-4">
              <div className="text-black font-medium mb-3 bg-gray-200 animate-pulse h-24px w-140px" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingInvoice;
