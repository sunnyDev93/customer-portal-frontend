import React from 'react';
import Footer from '../components/Footer';
import MainNavSkeleton from 'components/loading/MainNavSkeleton';
import classNames from 'classnames';
import { useFeatureFlag } from 'configcat-react';

export const MainLayoutSkeleton: React.FC = () => {
    const { value: isRevenueEnabled, loading: isRevenueEnabledLoading } = useFeatureFlag('isRevenueEnabled', false);

  return (
    <>
      <div className="flex flex-col min-h-screen" data-testid="MainLayout">
        <MainNavSkeleton />
        {!isRevenueEnabled && (
          <div className="grow relative flex">
            <div className="flex w-full">
              <div
                className={classNames(
                  'bg-white min-w-[256px] border-r border-gray-200 top-0 left-0 h-full z-10 transform transition-all duration-300 hidden absolute lg:relative sm:block md:block lg:block',
                  'sm:translate-x-0'
                )}
              >
                <div className="flex flex-col pt-8 items-center">
                  <div className="whitespace-nowrap py-4 px-3 w-[80%]">
                    <div className="h-4 bg-gray-300 rounded-full w-full" />
                  </div>
                  <div className="whitespace-nowrap py-4 px-3 w-[80%]">
                    <div className="h-4 bg-gray-300 rounded-full w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default MainLayoutSkeleton;
