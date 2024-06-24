import React from 'react';
import { useAptiveAuth } from '../../shared/hooks/AptiveAuth';
import { useTrackingView } from '../../shared/hooks/useTrackingView';
import { Navigate, useSearchParams } from 'react-router-dom';

const MagicLinkExpired = () => {
  const [searchParams] = useSearchParams();
  const errorCode = searchParams.get('errorCode');
  const { loginWithRedirect } = useAptiveAuth();
  useTrackingView();

  if (errorCode !== '460' && errorCode !== '461') {
    return <Navigate to="/" replace={true} />;
  }
  const isInvalidToken = errorCode === '460';
  return (
    <div className="flex w-full">
      <div className="flex w-full">
        <div className="flex justify-center w-full pb-20">
          <div className="flex flex-col  w-full md:pt-32 lg:pl-4 px-4 pt-20">
            <div className="flex flex-col space-y-3">
              <h2 className="md:text-3xl text-3xl font-bold text-center">
                {isInvalidToken ? 'Page Not Found' : 'Oops! This link has expired.'}
              </h2>
              <h4 className="md:text-xl text-xl text-center text-gray-600">
                {isInvalidToken
                  ? 'The link you followed is no longer valid or may have been moved. Please check the URL or log in to your account.'
                  : 'Links often have a limited lifespan for security or administrative reasons, and unfortunately, this one has reached the end of its journey.'}
              </h4>

              <button onClick={() => loginWithRedirect?.()} className="md:text-lg text-lg text-green-800 underline">
                Log in to your account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagicLinkExpired;
