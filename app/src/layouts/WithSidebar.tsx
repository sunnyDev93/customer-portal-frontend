import React, { PropsWithChildren, useState } from 'react';
import classNames from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';

import { NavLink, useMatch } from 'react-router-dom';
import { RouteInfo, SiteMap } from 'types';
import MobileMenuIcon from 'images/mobile-menu.png';
import XIcon from 'images/x-icon.png';
import { useSetRecoilState } from 'recoil';
import { expandedInvoiceIdState } from 'app-recoil/atoms/expanded-invoice-id';
import { useTrackingClick } from '../shared/hooks/useTrackingClick';
import { Breadcrumb } from './Breadcrumb';
import { useFeatureFlag } from 'configcat-react';

interface WithSidebarProps {
  children?: React.ReactNode;
  siteMap?: SiteMap;
}

export const WithSidebar: React.FC<PropsWithChildren<WithSidebarProps>> = ({ children, siteMap = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const setExpandedInvoiceId = useSetRecoilState(expandedInvoiceIdState);
  const { trackClick } = useTrackingClick();
  const { value: isRevenueEnabled, loading: isRevenueEnabledLoading } = useFeatureFlag('isRevenueEnabled', false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const onHandleClickOutsideMenu = () => setIsExpanded(false);

  const onHandleClickMenuItem = (route: RouteInfo) => {
    route.trackingName && trackClick(route.trackingName, 'navigation');
    setIsExpanded(false);
    setExpandedInvoiceId(null);
  };
  const matchRescheduleRoute = useMatch({ path: 'appointments/reschedule/:appointmentId', end: true });
  const matchScheduleRoute = useMatch({ path: 'appointments/schedule', end: true });
  return (
    <div className="flex w-full">
      {!isRevenueEnabled && (
        <OutsideClickHandler onOutsideClick={onHandleClickOutsideMenu}>
          <button
            aria-expanded="true"
            className="hidden sm:flex md:flex lg:hidden absolute z-10 top-[-46px] h-[46px] w-[40px] items-center justify-center"
            onClick={toggleExpanded}
          >
            <img src={isExpanded ? XIcon : MobileMenuIcon} className="w-[12px] cursor-pointer" alt="" />
          </button>

          <div
            className={classNames(
              'bg-white min-w-[256px] border-r border-gray-200 top-0 left-0 h-full z-10 transform transition-all duration-300 hidden absolute lg:relative sm:block md:block lg:block',
              isExpanded ? 'sm:translate-x-0' : 'sm:-translate-x-full lg:translate-x-0'
            )}
          >
            <div className="flex flex-col pt-8">
              {(isRevenueEnabled
                ? Object.values(siteMap)
                : Object.values(siteMap).filter((childRoute: RouteInfo) => childRoute.key !== 'SubscriptionRenewalRoute')
              )?.map((childRoute: RouteInfo) =>
                !childRoute.disabled ? (
                  <React.Fragment key={childRoute.key}>
                    <NavLink
                      onClick={() => onHandleClickMenuItem(childRoute)}
                      to={childRoute.fullPath || childRoute.path}
                      key={childRoute.key}
                      className={({ isActive }) =>
                        classNames(
                          isActive || (childRoute.path === 'scheduleWrapper' && (matchRescheduleRoute || matchScheduleRoute))
                            ? classNames(childRoute.activeClassName, 'bg-aptive-900 text-gray-50 font-bold')
                            : 'border-transparent text-gray-600 hover:bg-gray-400 hover:text-gray-50 hover:font-bold',
                          childRoute.className,
                          'whitespace-nowrap py-[8px] pl-[40px] pr-3 font-normal text-font-14px  font-medium text-sm pl-10 hover:bg-gray-400 hover:font-bold hover:text-white'
                        )
                      }
                      end
                    >
                      {childRoute.label}
                    </NavLink>
                  </React.Fragment>
                ) : null
              )}
            </div>
          </div>
        </OutsideClickHandler>
      )}

      {isRevenueEnabled && (
        <div className="w-full sm:px-10 px-2">
          <Breadcrumb />
          {children}
        </div>
      )}

      {!isRevenueEnabled && <div className="w-full sm:px-10 px-2">{children}</div>}
    </div>
  );
};

export default WithSidebar;
