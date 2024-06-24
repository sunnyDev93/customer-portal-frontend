import React, { PropsWithChildren } from 'react';
import { useFeatureFlag } from 'configcat-react';

interface PageTitleProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  right?: React.ReactNode;
  exclude?: boolean;
}

export const PageTitle: React.FC<PropsWithChildren<PageTitleProps>> = ({ title, subtitle, right, exclude }) => {
  const { value: isRevenueEnabled, loading: isRevenueEnabledLoading } = useFeatureFlag('isRevenueEnabled', false);
  if (!isRevenueEnabled) {
    return (
      <>
        <div className={`flex pb-5 pt-4 items-center ${exclude ? 'fs-exclude' : ''}`} data-testid="PageTitle">
          <div>
            <h1 data-testid="title" className="md:text-[32px] text-[24px] font-serif text-gray-900 pl-[16px] md:pl-[0px]">
              {title}
            </h1>
            {subtitle && (
              <p data-testid="subtitle" className="mt-1">
                {subtitle}
              </p>
            )}
          </div>

          <div data-testid="position" className="ml-auto">
            {right}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={`flex pt-4 pb-5 md:pt-[0px] items-center ${exclude ? 'fs-exclude' : ''}`} data-testid="PageTitle">
          <div>
            <h1 data-testid="title" className="md:text-[32px] text-[24px] font-serif text-gray-900 pl-[16px] md:pl-[0px]">
              {title}
            </h1>
            {subtitle && (
              <p data-testid="subtitle" className="mt-1">
                {subtitle}
              </p>
            )}
          </div>

          <div data-testid="position" className="ml-auto">
            {right}
          </div>
        </div>
      </>
    );
  }
};

export default PageTitle;
