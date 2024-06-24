import React from 'react';

export const UpcomingAppointmentWidgetSkeleton: React.FC = () => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md mb-5 animate-pulse" data-testid="upcoming-appointment-widget-skeleton">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center">
          <div className="flex items-center w-full space-x-4">
            <div className="flex items-center justify-center bg-gray-200 rounded-full w-[48px] h-[48px]"></div>
            <div className="text-center">
              <div className="h-5 bg-gray-300 rounded-full w-14 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded-full w-14"></div>
            </div>
            <div>
              <div className="h-3 bg-gray-300 rounded-full w-48 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded-full w-[300px]"></div>
            </div>
          </div>

          <div className="ml-2 flex-shrink-0 flex">
            <div className="space-x-2 flex"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingAppointmentWidgetSkeleton;
