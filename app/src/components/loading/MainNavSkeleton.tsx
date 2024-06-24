import React from 'react';

import logo from '../../images/aptive-logo-green.png';
import MobileMenuIcon from '../../images/mobile-menu.png';
import { useFeatureFlag } from 'configcat-react';

const MainNavSkeleton: React.FC<{ testid?: string }> = ({ testid = 'main-nav-skeleton' }) => {
  const tabs = [{ name: 'Overview' }, { name: 'Billing' }, { name: 'Service Schedule' }];
  const { value: isRevenueEnabled, loading: isRevenueEnabledLoading } = useFeatureFlag('isRevenueEnabled', false);

  if (!isRevenueEnabled) {
    return (
      <div data-testid="testid">
        <header className="bg-white md:border-b border-t border-gray-300 py-4 flex relative top-0 animate-pulse">
          <div className="w-full sm:px-10 px-[8px]">
            <div className="flex h-9 justify-between">
              <div className="flex w-full items-center">
                <div className="flex flex-shrink-0 items-center pl-[18px] md:pl-[0px]">
                  <button className="block sm:hidden pr-[16px]">
                    <img src={MobileMenuIcon} className="w-[14px]" alt="Aptive" />
                  </button>

                  <img className="block h-7 w-auto" src={logo} alt="Aptive" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="px-10 pt-2 bg-gray-100">
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-5" aria-label="Tabs">
                {tabs.map((tab, key) => (
                  <div className="whitespace-nowrap py-3 px-3 border-b-2" key={key}>
                    <div className="h-2.5 bg-gray-300 rounded-full w-20" />
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div data-testid="testid">
        <header className="bg-white md:border-b border-t border-gray-300 py-4 flex relative top-0 animate-pulse">
          <div className="w-full sm:px-10 px-[8px]">
            <div className="flex h-9 justify-between">
              <div className="flex w-full items-center">
                <div className="flex flex-shrink-0 items-center pl-[18px] md:pl-[0px]">
                  <button className="block sm:hidden pr-[16px]">
                    <img src={MobileMenuIcon} className="w-[14px]" alt="Aptive" />
                  </button>

                  <img className="block h-7 w-auto" src={logo} alt="Aptive" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-[#F3F4F6] h-[44px] border-b border-t border-gray-[#D1D5DB]">
          <div className="hidden sm:block h-full">
            <div className="h-full">
              <nav className="-mb-px flex space-x-5 h-full flex justify-center items-center" aria-label="Tabs">
                {tabs.map((tab, key) => (
                  <div className="whitespace-nowrap py-3 px-3 border-b-2" key={key}>
                    <div className="h-2.5 bg-gray-300 rounded-full w-20" />
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </nav>
      </div>
    );
  }
};

export default MainNavSkeleton;
