import React from 'react';
import { useLocation } from 'react-router-dom';

import LoadingSpinner from '../components/LoadingSpinner';

import SignInBg from '../images/login.png';
import { useTrackingView } from '../shared/hooks/useTrackingView';

const incrementCounter = (): void => {
  const counter = localStorage.getItem('aptiveErrorCounter');
  let count: number;

  if (counter === null) {
    count = 0;
  } else {
    count = parseInt(counter);
  }

  count++;

  localStorage.setItem('aptiveErrorCounter', count.toString());
};

const zeroCounter = (): void => {
  localStorage.setItem('aptiveErrorCounter', '0');
};

const InternalServerError: React.FC = () => {
  useTrackingView();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const error = searchParams.get('error');

  const errorCounter = localStorage.getItem('aptiveErrorCounter');

  let isRedirecting = false;

  if (Number(errorCounter) < 2) {
    incrementCounter();

    // In case of 429 error "too many attempts" add a delay of 3 seconds before redirecting
    if (error === '429') {
      isRedirecting = true;
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 3000);
    } else {
      window.location.href = '/dashboard';
    }
  } else {
    zeroCounter();
  }

  if (isRedirecting) {
    return <LoadingSpinner centered className="mt-14" />;
  }

  return (
    <div className="flex w-full">
      <div className="flex w-full">
        <div className="flex justify-center w-full lg:w-1/2 pb-20">
          <div className="flex flex-col md:w-[450px] w-full md:pt-32 lg:pl-4 px-4 pt-20">
            <div className="flex flex-col space-y-3">
              <h2 className="md:text-3xl text-3xl font-bold text-center">500 Internal Server Error</h2>
              <h4 className="md:text-xl text-xl text-center text-gray-600">
                Oops, something went wrong. <br />
                Please try again later.
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

export default InternalServerError;
