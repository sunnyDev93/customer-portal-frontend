import React, { PropsWithChildren, useEffect } from 'react';
import MainNav from '../components/main-nav';
import Footer from '../components/Footer';
import useAuth from 'shared/hooks/useAuth';
import MainLayoutSkeleton from 'layouts/MainLayoutSkeleton';
import { useFeatureFlag } from 'configcat-react';
import { issueNoteState, isAlreadyShowNotePopup } from 'app-recoil/atoms/issue-note';
import { useLocation } from 'react-router-dom';
import AptiveModal from 'components/modals/AptiveModal';
import { useRecoilState } from 'recoil';

interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<PropsWithChildren<MainLayoutProps>> = ({ children }) => {
  const { isLoading } = useAuth();
  const { value: isRevenueEnabled, loading: isRevenueEnabledLoading } = useFeatureFlag('isRevenueEnabled', false);
  const [isDoneNotePopup, setIsDoneNotePopup] = useRecoilState(isAlreadyShowNotePopup);
  const location = useLocation();
  useEffect(() => {
    if (!window.location.pathname.includes('/appointments/schedule')) {
      setIsDoneNotePopup(false);
    }
  }, [location]);

  if (isLoading || isRevenueEnabledLoading) return <MainLayoutSkeleton />;

  return (
    <>
      <div className="flex flex-col min-h-screen relative" data-testid="MainLayout">
        {isRevenueEnabled && (
          <div className="relative z-10">
            <MainNav />
          </div>
        )}
        {!isRevenueEnabled && <MainNav />}
        <div className="grow relative flex">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
