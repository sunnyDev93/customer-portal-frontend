import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFeatureFlag } from 'configcat-react';
import MainNavSkeleton from '../loading/MainNavSkeleton';
import { useAptiveAuth, withAuthenticationRequired } from '../../shared/hooks/AptiveAuth';
import useLogout from 'shared/hooks/useLogout';
import { useRecoilValue } from 'recoil';
import { aptiveUserState } from 'app-recoil/atoms/auth/aptive-user';
import { aptiveUserAccountsState } from 'app-recoil/atoms/auth/aptive-user-accounts';
import { useTrackingClick } from '../../shared/hooks/useTrackingClick';
import MainNavUI from './MainNav';

const MainNav: React.FC = () => {
  const { user } = useAptiveAuth();
  const { logout } = useLogout();
  const { trackClick } = useTrackingClick();
  const { value: maintenanceModeValue } = useFeatureFlag('maintenanceMode', false);
  const navigate = useNavigate();

  const aptiveUser = useRecoilValue(aptiveUserState);
  const aptiveUserAccounts = useRecoilValue(aptiveUserAccountsState);

  if (maintenanceModeValue) {
    navigate('/maintenance');
    return null;
  }

  if (!user?.email_verified) {
    navigate('/not-verified');
    return null;
  }

  if (!aptiveUser) {
    return <MainNavSkeleton />;
  }

  return (
    <>
      <MainNavUI
        testId="main-nav-ui"
        aptiveUserAccounts={aptiveUserAccounts}
        aptiveUser={aptiveUser}
        logout={logout}
        trackClick={trackClick}
      />
    </>
  );
};

export default withAuthenticationRequired(MainNav, {
  onRedirecting: () => <MainNavSkeleton />,
});
