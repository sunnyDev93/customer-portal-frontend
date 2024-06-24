import React, { PropsWithChildren } from 'react';
import Navigation from '../components/Navigation';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({ children }) => {
  return (
    <>
      <div className="min-h-full" data-testid="Layout">
        <Navigation />

        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;
