import React from 'react';
import useLogout from 'shared/hooks/useLogout';
import SignInBg from '../images/login.png';
import { useTrackingView } from '../shared/hooks/useTrackingView';

const EmptyAccountPage: React.FC = () => {
  const { logout } = useLogout();
  useTrackingView();

  return (
    <div className="flex w-full">
      <div className="flex w-full">
        <div className="flex w-full md:w-1/2 pb-20">
          <div className="flex flex-col ml-auto md:w-[450px] w-full xl:mr-32 lg:mr-10 md:mr-10 md:pt-32 lg:pl-4 px-4 pt-3">
            <div className="flex flex-col space-y-3">
              <h2 className="md:text-3xl text-3xl font-bold text-center">The account does not exist</h2>

              <button onClick={logout} className="md:text-lg text-lg text-green-800 pt-5 underline">
                Logout and try again.
              </button>
            </div>
          </div>
        </div>
        <div className="md:flex flex-col hidden w-1/2 pt-5 pr-5">
          <img src={SignInBg} className="w-full max-w-[865px]" alt="Sign In Bg" />
        </div>
      </div>
    </div>
  );
};

export default EmptyAccountPage;
