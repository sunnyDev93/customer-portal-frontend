import React, { useState } from 'react';

import { useFeatureFlag } from 'configcat-react';

import SignInBg from '../images/login.png';
import useSessionStorageState from 'use-session-storage-state';
import LoadingSpinner from 'components/LoadingSpinner';
import useLogout from 'shared/hooks/useLogout';

import aptiveAPI from '../services/config';
import { useTrackingView } from '../shared/hooks/useTrackingView';
import { useAptiveAuth, withAuthenticationRequired } from '../shared/hooks/AptiveAuth';
import { AuthType, Token } from '../constants/auth';

const NotVerified: React.FC = () => {
  useTrackingView();
  const { user, authType, getIdTokenClaims } = useAptiveAuth();
  const [resendClicked, setResendClicked] = useState(false);
  const { logout } = useLogout();
  const { value: resendVerificationEmailValue, loading: resendVerificationEmailLoading } = useFeatureFlag('resendVerificationEmail', false);

  const [aptiveUserSession, setAptiveUserSession] = useSessionStorageState<any>('aptiveUser', { defaultValue: null });

  const handleResendClick = async () => {
    setResendClicked(true);

    try {
      let idToken;
      if (authType === AuthType.MagicLink) {
        idToken = window.localStorage.getItem(Token.AccessToken);
      } else {
        const idTokenClaims = await getIdTokenClaims?.();
        idToken = idTokenClaims?.__raw;

        if (!idToken) {
          throw new Error('Failed to get ID token from Auth0.');
        }
      }

      await aptiveAPI.post(
        '/resend-verification-email',
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
    } catch (error) {
      throw new Error('Failed to resend verification email.');
    }
  };

  return (
    <div className="flex w-full">
      <div className="flex w-full">
        <div className="flex justify-center w-full lg:w-1/2 pb-20">
          <div className="flex flex-col md:w-[450px] w-full md:pt-32 lg:pl-4 px-4 pt-20">
            <div className="flex flex-col space-y-3">
              <h2 className="md:text-3xl text-3xl font-bold text-center">Help us keep your information secure.</h2>
              <h4 className="md:text-xl text-xl text-gray-600">
                We need to verify your email address. A message has been sent to{' '}
                <span className="italic fs-exclude">{user ? user.email : aptiveUserSession?.email}</span>.
              </h4>

              <h4 className="md:text-xl text-xl text-gray-600">Please check your email and click on the link.</h4>

              <h4 className="md:text-lg text-lg text-gray-600 italic">
                Don&apos;t see an email from us? Please check your spam folder or call{' '}
                <a href="tel:18445737111" className="underline">
                  855-BUG-FREE
                </a>{' '}
                for personal assistance.
              </h4>
              {!resendVerificationEmailLoading && resendVerificationEmailValue ? (
                <div className="text-center">
                  {!resendClicked && (
                    <button onClick={handleResendClick} className="md:text-lg text-lg text-green-800 pt-5 underline">
                      Resend verification email
                    </button>
                  )}
                  {resendClicked && <p className="md:text-lg text-lg text-gray-800 pt-5">Verification email has been resent.</p>}
                </div>
              ) : null}

              <button onClick={logout} className="md:text-lg text-lg text-green-800 underline">
                Logout and try again.
              </button>
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

export default withAuthenticationRequired(NotVerified, {
  onRedirecting: () => <LoadingSpinner centered />,
});
