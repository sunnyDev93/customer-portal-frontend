import React, { PropsWithChildren } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { RouteInfo, SiteMap } from 'types';
import { navLinkRoute } from 'routes';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useTrackingClick } from '../shared/hooks/useTrackingClick';
import { Breadcrumb } from './Breadcrumb';
import { useFeatureFlag } from 'configcat-react';

interface WithNavbarProps {
  isMobileMenuOpen?: boolean;
  closeMobileMenu: () => void;
  testId?: string;
}

const NavBar: React.FC<PropsWithChildren<WithNavbarProps>> = ({ isMobileMenuOpen = false, closeMobileMenu, testId = 'nav-bar' }) => {
  const navigate = useNavigate();
  const { trackClick } = useTrackingClick();
  const { value: isRevenueEnabled, loading: isRevenueEnabledLoading } = useFeatureFlag('isRevenueEnabled', false);

  const renderMobileNavLink = (route: RouteInfo, parentPath = '') => {
    if (route.disabled) return null;
    const fullPath = `${parentPath}${parentPath && route.path ? '/' : ''}${route.path}`;

    if (!route.children) {
      return (
        <NavLink
          key={`mobile-${route.key}`}
          to={fullPath}
          onClick={() => {
            closeMobileMenu?.();
            route.trackingName && trackClick(route.trackingName, 'navigation');
          }}
          className={({ isActive }) =>
            classNames(
              isActive
                ? classNames('bg-aptive-900 text-gray-50 font-bold')
                : 'border-transparent text-gray-600 hover:bg-gray-400 hover:text-gray-50 hover:font-bold',
              'whitespace-nowrap py-3 font-normal text-font-14px pl-[40px]',
              route.mobileClassName
            )
          }
          end
        >
          {route.label}
        </NavLink>
      );
    }
    return (
      <div className="flex flex-col w-full" key={route.key}>
        {route.label && (
          <div
            key={`mobile-${route.key}`}
            className={classNames(
              'bg-[#f3f4f6] text-font-14px whitespace-nowrap py-3 font-bold text-sm border-t border-b px-[24px] md:px-[8px] text-aptive-900'
            )}
          >
            {route.label}
          </div>
        )}
        {route?.children && renderMobileSiteMap(route.children, fullPath)}
      </div>
    );
  };

  const renderMobileSiteMap = (siteMap: SiteMap, parentPath = '') => (
    <div className="flex flex-col bg-gray-50">
      {!isRevenueEnabled && (
        <>
          {Object.values(siteMap)
            .filter((children: RouteInfo) => children.key !== 'SubscriptionRenewalRoute')
            .map((children: RouteInfo) => renderMobileNavLink(children, parentPath))}
        </>
      )}
      {isRevenueEnabled && <>{Object.values(siteMap).map((children: RouteInfo) => renderMobileNavLink(children, parentPath))}</>}
    </div>
  );

  return (
    <>
      {!isRevenueEnabled && (
        <nav data-testid={testId} className="px-10 pt-2 bg-gray-100">
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-5" aria-label="Tabs">
                {navLinkRoute.children &&
                  Object.values(navLinkRoute.children).map((tab: RouteInfo) => (
                    <React.Fragment key={tab.key}>
                      <NavLink
                        key={tab.key}
                        to={tab.path}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? classNames('border-aptive-900 text-gray-40 font-bold')
                              : 'border-transparent hover:border-gray-400 hover:text-gray-400',
                            'whitespace-nowrap py-2 px-3 border-b-4 font-normal text-font-14px text-gray-600'
                          )
                        }
                        onClick={() => {
                          tab.trackingName && trackClick(tab.trackingName, 'navigation');
                          setTimeout(() => {
                            tab.defaultPath && navigate(tab.defaultPath);
                          });
                        }}
                      >
                        {tab.label}
                      </NavLink>
                    </React.Fragment>
                  ))}
              </nav>
            </div>
          </div>
        </nav>
      )}
      {isRevenueEnabled && (
        <nav data-testid={testId} className="bg-[#F3F4F6] border-b border-t border-gray-[#D1D5DB]">
          <nav className="hidden sm:flex justify-center items-center h-[44px]" aria-label="Tabs">
            {navLinkRoute.children &&
              Object.values(navLinkRoute.children).map((tab: RouteInfo) => (
                <Menu
                  key={tab.key}
                  onClick={() => {
                    tab.trackingName && trackClick(tab.trackingName, 'navigation');
                  }}
                  as="div"
                  className="relative inline-block text-left"
                >
                  <div>
                    <Menu.Button>
                      <React.Fragment key={tab.key}>
                        <div className="flex justify-center items-center text-font-14px text-gray-600 ml-[16px] mr-[16px] font-bold">
                          <span className="leading-[16px]">{tab.label}</span>
                          <span className="ml-[8px] flex justify-center items-center">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.7071 7.29289L9.99999 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68341 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
                                fill="#374151"
                              />
                            </svg>
                          </span>
                        </div>
                      </React.Fragment>
                    </Menu.Button>
                  </div>
                  {tab.label === 'My Account' && (
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute top-[36px] flex flex-col shadow-md bg-[#FFFFFF] rounded-[8px]">
                        <Menu.Item>
                          <NavLink to="/dashboard" className="w-[418px] h-[76px] flex justify-start items-center p-[16px]">
                            <div className="mr-[16px] w-[44px] h-[44px] bg-gray-50 rounded-[8px] flex justify-center items-center">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M1.59953 13.6365C1.6898 13.7506 1.85316 13.7682 1.96493 13.676L3.75327 12.2048V19.4686C4.22185 19.4686 4.68183 19.6355 5.05153 19.9385C5.07302 19.9561 5.10312 19.9693 5.12891 19.9868V11.0717L11.8395 5.54258C11.934 5.46353 12.0673 5.46353 12.1619 5.54258L18.8681 11.0717V20C18.8939 19.9824 18.924 19.9649 18.9498 19.9473C19.3152 19.6399 19.7752 19.473 20.2481 19.4686V12.2092L22.0364 13.6804C22.1482 13.7726 22.3115 13.755 22.4018 13.6408L22.9435 12.9557C23.0338 12.8416 23.0123 12.6747 22.9048 12.5824L20.2481 10.3998V7.06649C20.2481 6.92157 20.132 6.80299 19.9902 6.80299H19.1304C18.9885 6.80299 18.8724 6.92157 18.8724 7.06649V9.26673L12.8626 4.31291C12.3596 3.8957 11.6374 3.8957 11.1345 4.31291L1.09656 12.5824C0.984787 12.6747 0.967591 12.8416 1.05787 12.9513L1.59953 13.6365Z"
                                  fill="#6B7280"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M13.5597 18.3348C12.9324 18.8735 12.2109 19.1111 11.4425 19.1111C10.3133 19.1111 9.24683 18.6042 8.57245 17.8121C7.97649 17.115 7.6001 16.1645 7.6001 15.119C7.6001 12.8537 9.26251 11.1111 11.3327 11.1111C12.1953 11.1111 12.9637 11.3962 13.5597 11.8873V11.2695H15.5201V18.9527H13.5597V18.3348ZM9.64388 15.055C9.64388 16.2761 10.5042 17.176 11.646 17.176C12.4125 17.176 13.0851 16.7903 13.4761 16.2119V13.882C13.0538 13.3035 12.3812 12.9179 11.5991 12.9179C10.4103 12.9179 9.64388 13.9302 9.64388 15.055Z"
                                  fill="#6B7280"
                                />
                              </svg>
                            </div>
                            <div className="flex flex-col justify-center items-start">
                              <div className="text-[14px] font-bold text-[#111827]">Home</div>
                              <div className="text-[14px] text-[#4B5563]">Your Aptive Customer Portal Dashboard</div>
                            </div>
                          </NavLink>
                        </Menu.Item>
                        <Menu.Item>
                          <NavLink to="/dashboard/documents" className="w-[418px] h-[76px] flex justify-start items-center p-[16px]">
                            <div className="mr-[16px] w-[44px] h-[44px] bg-gray-50 rounded-[8px] flex justify-center items-center">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_190_2423)">
                                  <path
                                    d="M15.414 2H6C4.897 2 4 2.898 4 4V20C4 21.103 4.897 22 6 22H18C19.103 22 20 21.103 20 20V6.586L15.414 2ZM18.001 20H6V4H14V8H18L18.001 20Z"
                                    fill="#6B7280"
                                  />
                                  <path d="M14 11H8V13H14V11Z" fill="#6B7280" />
                                  <path d="M16 15H8V17H16V15Z" fill="#6B7280" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_190_2423">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className="flex flex-col justify-center items-start">
                              <div className="text-[14px] font-bold text-[#111827]">My Documents</div>
                              <div className="text-[14px] text-[#4B5563]">Find whatever docs are here in this place</div>
                            </div>
                          </NavLink>
                        </Menu.Item>
                        <Menu.Item>
                          <NavLink
                            to="/dashboard/subscription-renewal"
                            className="w-[418px] h-[76px] flex justify-start items-center p-[16px]"
                          >
                            <div className="mr-[16px] w-[44px] h-[44px] bg-gray-50 rounded-[8px] flex justify-center items-center">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_190_2423)">
                                  <path
                                    d="M15.414 2H6C4.897 2 4 2.898 4 4V20C4 21.103 4.897 22 6 22H18C19.103 22 20 21.103 20 20V6.586L15.414 2ZM18.001 20H6V4H14V8H18L18.001 20Z"
                                    fill="#6B7280"
                                  />
                                  <path d="M14 11H8V13H14V11Z" fill="#6B7280" />
                                  <path d="M16 15H8V17H16V15Z" fill="#6B7280" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_190_2423">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className="flex flex-col justify-center items-start">
                              <div className="text-[14px] font-bold text-[#111827]">Subscription Renewal</div>
                              <div className="text-[14px] text-[#4B5563]">Find whatever docs are here in this place</div>
                            </div>
                          </NavLink>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  )}
                  {tab.label === 'Payments & Invoices' && (
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute top-[36px] flex flex-col shadow-md bg-[#FFFFFF] rounded-[8px]">
                        <Menu.Item>
                          <NavLink to="/billing/make-payments" className="w-[418px] h-[76px] flex justify-start items-center p-[16px]">
                            <div className="mr-[16px] w-[44px] h-[44px] bg-gray-50 rounded-[8px] flex justify-center items-center">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_1703_893)">
                                  <path
                                    d="M22 3H10C8.896 3 8 3.896 8 5V6H10V5H22V7H15V9H22V15H10V14H8V15C8 16.103 8.896 17 10 17H16.382L15.658 18.448C15.488 18.79 15.146 19 14.764 19H8.414L6 16.586V11.414L8.414 9H12V10C12 10.551 11.551 11 11 11H9V13H11C12.654 13 14 11.654 14 10V8C14 7.448 13.553 7 13 7H8C7.734 7 7.48 7.104 7.293 7.294L5.46 9.126C5.32 9.051 5.169 9 5 9H1C0.447 9 0 9.448 0 10V18C0 18.552 0.447 19 1 19H5C5.169 19 5.32 18.948 5.46 18.874L7.293 20.708C7.48 20.894 7.734 21 8 21H14.764C15.909 21 16.937 20.365 17.448 19.341L18.618 17H22C23.104 17 24 16.103 24 15V5C24 3.896 23.104 3 22 3ZM4 17H2V11H4V17Z"
                                    fill="#6B7280"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1703_893">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className="flex flex-col justify-center items-start">
                              <div className="text-[14px] font-bold text-[#111827]">Make a payment</div>
                              <div className="text-[14px] text-[#4B5563]">Your Aptive Customer Portal Dasboard</div>
                            </div>
                          </NavLink>
                        </Menu.Item>
                        <Menu.Item>
                          <NavLink to="/billing/payment-settings" className="w-[418px] h-[76px] flex justify-start items-center p-[16px]">
                            <div className="mr-[16px] w-[44px] h-[44px] bg-gray-50 rounded-[8px] flex justify-center items-center">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_1703_812)">
                                  <path d="M17 8H13V10H17V8Z" fill="#6B7280" />
                                  <path d="M10 8H3V10H10V8Z" fill="#6B7280" />
                                  <path d="M8 11H3V13H8V11Z" fill="#6B7280" />
                                  <path
                                    d="M2 7H17.999L17.998 10H20V2C20 0.898 19.104 0 18 0H2C0.896 0 0 0.898 0 2V14C0 15.103 0.896 16 2 16H10V14H2V7ZM18 2L17.999 5H2V2H18Z"
                                    fill="#6B7280"
                                  />
                                  <path
                                    d="M24.002 19V17H22.9C22.769 16.362 22.515 15.771 22.168 15.246L22.951 14.463L21.538 13.048L20.753 13.832C20.229 13.485 19.638 13.23 19.001 13.101V12H17.001V13.102C16.363 13.231 15.772 13.486 15.248 13.833L14.464 13.05L13.051 14.465L13.834 15.247C13.486 15.771 13.232 16.363 13.102 17H12V19H13.102C13.233 19.638 13.487 20.229 13.834 20.754L13.051 21.538L14.466 22.952L15.249 22.168C15.773 22.516 16.365 22.77 17.002 22.899V24H19.002V22.898C19.639 22.768 20.231 22.514 20.755 22.166L21.539 22.95L22.952 21.534L22.168 20.751C22.516 20.228 22.77 19.637 22.9 19H24.002ZM18 20C16.895 20 16 19.103 16 18C16 16.895 16.895 16 18 16C19.104 16 20 16.895 20 18C20 19.103 19.104 20 18 20Z"
                                    fill="#6B7280"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1703_812">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className="flex flex-col justify-center items-start">
                              <div className="text-[14px] font-bold text-[#111827]">Payment settings</div>
                              <div className="text-[14px] text-[#4B5563]">Your Aptive Customer Portal Dasboard</div>
                            </div>
                          </NavLink>
                        </Menu.Item>
                        <Menu.Item>
                          <NavLink
                            to="/billing/add-payment-methods"
                            className="w-[418px] h-[76px] flex justify-start items-center p-[16px]"
                          >
                            <div className="mr-[16px] w-[44px] h-[44px] bg-gray-50 rounded-[8px] flex justify-center items-center">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_1703_791)">
                                  <path d="M17 8H13V10H17V8Z" fill="#6B7280" />
                                  <path d="M10 8H3V10H10V8Z" fill="#6B7280" />
                                  <path d="M8 11H3V13H8V11Z" fill="#6B7280" />
                                  <path
                                    d="M17 14H2V7H17.999L17.997 14H20V2C20 0.898 19.104 0 18 0H2C0.896 0 0 0.898 0 2V14C0 15.103 0.896 16 2 16H17V14ZM18 2L17.999 5H2V2H18Z"
                                    fill="#6B7280"
                                  />
                                  <path d="M24 19H21V16H19V19H16V21H19V24H21V21H24V19Z" fill="#6B7280" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1703_791">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className="flex flex-col justify-center items-start">
                              <div className="text-[14px] font-bold text-[#111827]">Add payment method</div>
                              <div className="text-[14px] text-[#4B5563]">Your Aptive Customer Portal Dasboard</div>
                            </div>
                          </NavLink>
                        </Menu.Item>
                        <Menu.Item>
                          <NavLink to="/billing/invoice-history" className="w-[418px] h-[76px] flex justify-start items-center p-[16px]">
                            <div className="mr-[16px] w-[44px] h-[44px] bg-gray-50 rounded-[8px] flex justify-center items-center">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_1703_297)">
                                  <path
                                    d="M15.414 2H6C4.897 2 4 2.898 4 4V20C4 21.103 4.897 22 6 22H18C19.103 22 20 21.103 20 20V6.586L15.414 2ZM18.001 20H6V4H14V8H18L18.001 20Z"
                                    fill="#6B7280"
                                  />
                                  <path d="M14 11H8V13H14V11Z" fill="#6B7280" />
                                  <path d="M16 15H8V17H16V15Z" fill="#6B7280" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1703_297">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className="flex flex-col justify-center items-start">
                              <div className="text-[14px] font-bold text-[#111827]">Invoice history</div>
                              <div className="text-[14px] text-[#4B5563]">Find whatever docs are here in this place!</div>
                            </div>
                          </NavLink>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  )}

                  {tab.label === 'Appointments' && (
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute top-[36px] flex flex-col shadow-md bg-[#FFFFFF] rounded-[8px]">
                        <Menu.Item>
                          <NavLink to="/appointments/upcoming" className="w-[418px] h-[76px] flex justify-start items-center p-[16px]">
                            <div className="mr-[16px] w-[44px] h-[44px] bg-gray-50 rounded-[8px] flex justify-center items-center">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_1703_549)">
                                  <path
                                    d="M20 5H19V2H17V7H16V5H9V2H7V7H6V5H4C2.897 5 2 5.898 2 7V20C2 21.103 2.897 22 4 22H20C21.103 22 22 21.103 22 20V7C22 5.898 21.103 5 20 5ZM19.997 20H4V9H20L19.997 20Z"
                                    fill="#6B7280"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1703_549">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className="flex flex-col justify-center items-start">
                              <div className="text-[14px] font-bold text-[#111827]">Upcoming appointment</div>
                              <div className="text-[14px] text-[#4B5563]">Your Aptive Customer Portal Dasboard</div>
                            </div>
                          </NavLink>
                        </Menu.Item>
                        <Menu.Item>
                          <NavLink to="/appointments/schedule" className="w-[418px] h-[76px] flex justify-start items-center p-[16px]">
                            <div className="mr-[16px] w-[44px] h-[44px] bg-gray-50 rounded-[8px] flex justify-center items-center">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_1703_472)">
                                  <path
                                    d="M2 8H17.999L17.998 14H20V5C20 3.898 19.103 3 18 3H17V0H15V5H14V3H7V0H5V5H4V3H2C0.897 3 0 3.898 0 5V18C0 19.103 0.897 20 2 20H14V18H2V8Z"
                                    fill="#6B7280"
                                  />
                                  <path d="M24 19H21V16H19V19H16V21H19V24H21V21H24V19Z" fill="#6B7280" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1703_472">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className="flex flex-col justify-center items-start">
                              <div className="text-[14px] font-bold text-[#111827]">Schedule an appointment</div>
                              <div className="text-[14px] text-[#4B5563]">Let&apos;s get your next service set up!</div>
                            </div>
                          </NavLink>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  )}
                </Menu>
              ))}
          </nav>
        </nav>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen ? (
        <nav className="absolute w-full h-full top-14 shadow-lg pt-2 border-b md:hidden flex flex-col z-10">
          <div className="bg-white">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex flex-col" aria-label="Tabs">
                {renderMobileNavLink(navLinkRoute)}
              </nav>
            </div>
          </div>
          <div className="h-full bg-black opacity-20" onClick={closeMobileMenu} />
        </nav>
      ) : null}
    </>
  );
};

export default NavBar;
