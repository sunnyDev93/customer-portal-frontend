import React, { useState } from 'react';
import { useFeatureFlag } from 'configcat-react';

import SignInBg from '../images/login.png';
import useSessionStorageState from 'use-session-storage-state';
import { useTrackingView } from '../shared/hooks/useTrackingView';

const MaintenancePage: React.FC = () => {
  useTrackingView();

  return (
    <div className="flex w-full">
      <div className="flex w-full">
        <div className="flex justify-center w-full lg:w-1/2 pb-20">
          <div className="flex flex-col md:w-[450px] w-full md:pt-32 lg:pl-4 px-4 pt-20">
            <div className="flex flex-col space-y-3">
              <h2 className="md:text-3xl text-3xl font-bold text-center mb-3">Customer Portal Access Temporarily Unavailable.</h2>
              <h4 className="md:text-xl text-xl text-gray-600">
                {`We're sorry, but our system is currently unavailable due to maintenance.`}
              </h4>

              <h4 className="md:text-xl text-xl text-gray-600">
                {`We apologize for any inconvenience this may cause and thank you for your patience.`}
              </h4>
            </div>
          </div>
        </div>
        <div className="lg:flex items-center hidden w-1/2 pt-5 pr-5">
          <img src={SignInBg} className="w-full max-w-[865px]" alt="Sign In Bg" />
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
