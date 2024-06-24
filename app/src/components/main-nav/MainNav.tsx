import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import logo from '../../images/aptive-logo-green.png';
import MobileMenuIcon from '../../images/mobile-menu.png';
import CloseMobileMenuIcon from '../../images/close-menu.png';
import { ChevronDownIcon } from '@heroicons/react/solid';
import AccountSwitcher from '../AccountSwitcher';
import UserDropdown from '../UserDropdown';
import MainNavSkeleton from '../loading/MainNavSkeleton';
import NavBar from '../../layouts/NavBar';
import { formatName } from 'helpers/format';

interface MainNavInterface {
  logout: any;
  trackClick: any;
  aptiveUser: any;
  aptiveUserAccounts: any;
  testId?: string;
}

const MainNavUI: React.FC<MainNavInterface> = ({ aptiveUserAccounts, aptiveUser, logout, trackClick, testId = 'main-nav-ui' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);

  const handleLogout = () => {
    trackClick('logout', 'account');
    logout();
  };

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    setIsMobileUserMenuOpen(false);
  };

  const openMobileUserMenu = () => {
    setIsMobileUserMenuOpen(true);
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileUserMenuOpen(false);
  };

  return (
    <div data-testid={testId}>
      <header className="bg-white md:border-b border-t border-gray-300 py-4 flex relative top-0 ">
        <div className="w-full sm:px-10 px-[8px]">
          <div className="flex h-9 justify-between">
            <div className="flex w-full items-center">
              <div className="flex flex-shrink-0 items-center pl-[18px] md:pl-[0px]">
                <button
                  data-testid="humberger"
                  onClick={event => {
                    event.preventDefault();
                    return isMobileMenuOpen ? closeMobileMenu() : openMobileMenu();
                  }}
                  className="block sm:hidden pr-[16px]"
                >
                  <img src={isMobileMenuOpen ? CloseMobileMenuIcon : MobileMenuIcon} className="w-[14px]" alt="Aptive" />
                </button>

                <img data-testid="site-logo" className="block h-7 w-auto" src={logo} alt="Aptive" />
              </div>

              <div className="md:flex text-sm ml-auto mr-[24px] md:mr-[0px]">
                {aptiveUserAccounts && (
                  <div data-testid="service-address" className="md:flex hidden items-center space-x-2 mr-1">
                    <div>Service Address:</div>
                    <div data-testid="account-switcher">
                      <AccountSwitcher accounts={aptiveUserAccounts} />
                    </div>
                  </div>
                )}

                {aptiveUser ? (
                  <div data-testid="user-selector-block">
                    <div data-testid="user-dropdown" className="md:block hidden">
                      <UserDropdown user={aptiveUser} />
                    </div>

                    <button
                      data-testid="user-info-mobile"
                      onClick={isMobileUserMenuOpen ? closeMobileMenu : openMobileUserMenu}
                      className="relative md:hidden inline-flex justify-center w-full rounded-md  py-2 bg-white text-sm font-medium text-gray-700 relative left-[6px] md:left-0"
                    >
                      <span data-testid="fullname-desktop" className="hidden breakpoint-575:block fs-exclude text-left">
                        {aptiveUser?.firstName} {aptiveUser?.lastName}
                      </span>
                      <span data-testid="fullname-mobile" className="block breakpoint-575:hidden fs-exclude text-left">
                        {formatName(aptiveUser?.firstName)} {formatName(aptiveUser?.lastName)}
                      </span>
                      <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>

      <NavBar testId="nav-bar" isMobileMenuOpen={isMobileMenuOpen} closeMobileMenu={closeMobileMenu} />

      {isMobileUserMenuOpen ? (
        <nav className="absolute z-20 w-full h-full top-14 shadow-lg pt-2 border-b flex flex-col z-10">
          <div className="bg-white">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex flex-col" aria-label="Tabs">
                <div className="flex flex-col w-full">
                  <div className="flex flex-col items-center border-t space-y-2 mr-1 py-3 z-10">
                    <div>Service Address</div>
                    <AccountSwitcher accounts={aptiveUserAccounts} />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <button
                    onClick={handleLogout}
                    className="border-gray-300 text-aptive-900 whitespace-nowrap py-3 font-bold text-sm border-t border-b px-10"
                  >
                    Logout
                  </button>
                </div>
              </nav>
            </div>
          </div>
          <div className="h-full bg-black opacity-40" onClick={closeMobileMenu} />
        </nav>
      ) : null}
    </div>
  );
};

export default MainNavUI;
