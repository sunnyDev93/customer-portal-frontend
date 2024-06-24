import React from 'react';

import logo from '../images/aptive-logo-green.png';

const AuthNavigation: React.FC = () => {
  return (
    <>
      <nav className="bg-white md:border-b border-t border-gray-300 py-4 flex relative top-0">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex h-16 justify-between">
            <div className="flex items-center w-full">
              <div className="flex flex-shrink-0 items-center">
                <img className="block h-7 w-auto" src={logo} alt="Aptive" />
              </div>

              <div className="hidden md:flex font-semibold space-x-8 text-sm">
                <div className="ml-10">1.844.573.7111</div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AuthNavigation;
