import React from 'react';

const UpcomingAppointmentPageSkeleton: React.FC = () => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md mb-5 animate-pulse">
      <ul className="divide-y divide-gray-200">
        <li>
          <div className="px-4 py-6 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xl font-medium">
                  <div className="h-4 bg-gray-300 rounded-full w-48 mb-4" />
                </div>
                <div className="flex items-center text-gray-500 sm:mt-0">
                  <div className="h-3 bg-gray-300 rounded-full w-48 mb-4" />
                </div>
              </div>

              <div className="ml-2 space-x-2 flex text-sm items-center text-gray-500">{/* Buttons */}</div>
            </div>
          </div>
        </li>

        {Array.from({ length: 4 }).map((item, index) => (
          <li key={index}>
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="w-1/3">
                  <div className="flex items-center text-gray-500 pl-3 font-medium sm:mt-0">
                    <div className="h-3 bg-gray-300 rounded-full w-48 mb-4" />
                  </div>
                </div>

                <div className="ml-2 flex w-full items-center">
                  <div className="font-medium mb-1 text-gray-900">
                    <div className="h-3 bg-gray-400 rounded-full w-48 mb-4" />
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingAppointmentPageSkeleton;
