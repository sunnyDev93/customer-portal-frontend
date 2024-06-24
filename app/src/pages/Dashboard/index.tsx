import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { withAuthenticationRequired } from '../../shared/hooks/AptiveAuth';
import { aptiveUserState } from 'app-recoil/atoms/auth/aptive-user';
import { aptiveUserDataState } from 'app-recoil/atoms/auth/aptive-user-data';
import LatestBillWidget from 'components/LatestBillWidget';
import LoadingSpinner from 'components/LoadingSpinner';
import PageTitle from 'components/PageTitle';
import { formatName } from 'helpers/format';
import ReferralSection from 'pages/Dashboard/components/referral-section/ReferralSection';
import SubscriptionInformation from 'pages/Dashboard/components/subscription-information/SubscriptionInformation';
import UpcomingAppointmentWidget from 'pages/Dashboard/components/UpcomingAppointmentWidget/UpcomingAppointmentWidget';
import { useTrackingView } from 'shared/hooks/useTrackingView';
import { useFeatureFlag } from 'configcat-react';
import { ExclamationIcon } from '@heroicons/react/solid';
import { customerInfoDataState } from 'app-recoil/atoms/customer-info';
import CurrentPlan from './components/CurrentPlan';
import classnames from 'classnames';
import moment from 'moment';

const LIMIT_DATE_TO_SHOW_INTRO_VIDEO = 60;

const Dashboard: React.FC = () => {
  useTrackingView();
  const aptiveUser = useRecoilValue(aptiveUserState);
  const aptiveUserData = useRecoilValue(aptiveUserDataState);
  const customerInfo = useRecoilValue(customerInfoDataState);

  const { value: isRevenueEnabled, loading: isRevenueEnabledLoading } = useFeatureFlag('isRevenueEnabled', false);
  const customerInfoData = useRecoilValue(customerInfoDataState);
  const { value: isTemporaryBannerEnabled, loading: isTemporaryBannerEnabledLoading } = useFeatureFlag('isTemporaryBannerEnabled', false);
  const currentPlan = useMemo(() => customerInfoData?.currentPlan, [customerInfoData]);
  const showIntroVideo = useMemo(
    () =>
      currentPlan?.subscription_start &&
      moment().isBefore(moment(currentPlan?.subscription_start).add(LIMIT_DATE_TO_SHOW_INTRO_VIDEO, 'days')),
    [currentPlan]
  );

  if (!aptiveUser || !aptiveUserData) {
    return <></>;
  }

  return (
    <>
      <div>
        {isTemporaryBannerEnabled ? (
          <div className="border-l-4 border-aptive-900 bg-aptive-500 p-6 mt-10 mb-3">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationIcon className="h-6 w-6 text-aptive-900" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-md text-aptive-900 font-medium">
                  <span className="font-bold">Attention:</span> New Text Number! Our old SMS numbers are no longer active. Please text{' '}
                  <span className="font-bold">62318</span> for assistance. Thank you!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <PageTitle
          title={
            <>
              <span className="hidden lg:block">{`Hello, ${aptiveUser.firstName} ${aptiveUser.lastName}.`}</span>
              <span className="md:block lg:hidden">
                Hello, <br className={`${aptiveUser.firstName.length > 9 || aptiveUser.lastName > 9 ? 'block' : 'hidden'}`} />
                {formatName(aptiveUser.firstName, 20)}{' '}
                <br className={`${aptiveUser.firstName.length > 9 || aptiveUser.lastName > 9 ? 'block' : 'hidden'}`} />
                {formatName(aptiveUser.lastName, 20)}.
              </span>
            </>
          }
          exclude
        />
      </div>

      <div className="breakpoint-680:flex-row-reverse flex flex-col justify-between items-start mb-[32px]">
        <div className="breakpoint-680:w-[calc(100%-284px)] breakpoint-1162:flex w-full mb-[16px]">
          <div
            className={classnames(
              'w-full',
              isRevenueEnabled ? 'breakpoint-1162:w-[calc(100%-284px)] breakpoint-1162:mr-[16px]' : ' breakpoint-1162:mr-[16px]'
            )}
          >
            {/* {isRevenueEnabled && (
              <div className="mb-16">
                <ApproximateServiceSchedule plan={subscriptionData?.serviceType.toUpperCase() as 'PRO' | 'BASIC' | 'PREMIUM'} />
              </div>
            )} */}
            <UpcomingAppointmentWidget accountId={aptiveUser.accountId} />

            <LatestBillWidget
              accountId={aptiveUser.accountId}
              autoPay={aptiveUserData.autoPay === 'Yes'}
              balance={customerInfo?.balanceCents || 0}
            />
            {showIntroVideo && (
              <div className="w-full relative h-0 pt-[25px] pb-[56.25%]">
                <iframe
                  data-testid="intro-video"
                  title="intro-video"
                  src="https://drive.google.com/file/d/1yVo95lZBQkGp8WdKkbXeouKswq8dLJBP/preview"
                  className="absolute top-0 left-0 w-full h-full"
                  allow="autoplay"
                />
              </div>
            )}
          </div>
          <div className="w-full breakpoint-1162:w-[284px]">
            {isRevenueEnabled ? <SubscriptionInformation accountId={aptiveUser.accountId} /> : <CurrentPlan />}
          </div>
        </div>
        <div className="breakpoint-680:w-[284px] breakpoint-680:mr-[16px] w-full">
          <ReferralSection customerId={aptiveUser.accountId} />
        </div>
      </div>
    </>
  );
};

export default withAuthenticationRequired(Dashboard, {
  onRedirecting: () => <LoadingSpinner centered />,
});
