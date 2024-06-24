import React, { PropsWithChildren } from 'react';
import AuthNavigation from '../components/AuthNavigation';

interface AuthLayoutProps {
  children?: React.ReactNode;
}

export const AuthLayout: React.FC<PropsWithChildren<AuthLayoutProps>> = ({ children }) => {
  return (
    <>
      <div className="min-h-full" data-testid="Layout">
        <AuthNavigation />

        <div className="flex">{children}</div>
      </div>
    </>
  );
};

export default AuthLayout;
