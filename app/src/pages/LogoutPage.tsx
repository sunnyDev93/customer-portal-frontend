import React from 'react';
import Button from 'shared/components/Button';
import SignInBg from '../images/login.png';
import { useTrackingView } from '../shared/hooks/useTrackingView';
import { useAptiveAuth } from '../shared/hooks/AptiveAuth';

const LogoutPage: React.FC = () => {
  const { loginWithRedirect } = useAptiveAuth();
  useTrackingView();

  return (
    <div className="flex w-full">
      <div className="flex w-full">
        <div className="flex justify-center w-full lg:w-1/2 pb-ƒƒ20">
          <div className="flex flex-col md:w-[450px] w-full md:pt-32 lg:pl-4 px-4 pt-20">
            <div className="flex flex-col space-y-3">
              <h2 className="md:text-4xl text-3xl font-bold mb-7">You&apos;re now logged out!</h2>
            </div>

            <Button label="Login" type="button" onClick={() => loginWithRedirect?.()} className="w-full mb-10" />
          </div>
        </div>
        <div className="lg:flex flex-col hidden w-1/2 pt-5 pr-5">
          <img src={SignInBg} className="w-full max-w-[865px]" alt="Sign In Bg" />
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
