import React from 'react';

import SignInBg from '../images/login.png';
import { useTrackingView } from '../shared/hooks/useTrackingView';

const NotVerified: React.FC = () => {
  useTrackingView();
  return (
    <div className="flex w-full">
      <div className="flex w-full">
        <div className="flex justify-center w-full lg:w-1/2 pb-20">
          <div className="flex flex-col md:w-[450px] w-full md:pt-32 lg:pl-4 px-4 pt-20">
            <div className="flex flex-col space-y-3">
              <h2 className="md:text-3xl text-3xl font-bold text-center">The email address you entered can’t be found.</h2>
              <h4 className="md:text-xl text-xl text-center text-gray-600">
                Please check the address or call 1.844.573.7111 for personal assistance
              </h4>
              <a className="md:text-lg text-lg text-center text-green-800 pt-5 underline" href="/dashboard">
                Go back to dashboard.
              </a>
            </div>
          </div>
        </div>
        <div className="lg:flex flex-col hidden w-1/2 pt-5 pr-5">
          <img src={SignInBg} className="w-full max-w-[865px]" alt="Sign In Bg" />
        </div>
      </div>
    </div>
  );
};

export default NotVerified;
