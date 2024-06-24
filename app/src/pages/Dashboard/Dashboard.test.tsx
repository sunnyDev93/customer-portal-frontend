import { render, screen } from '@testing-library/react';
import Dashboard from '.';
import { TestRoot } from 'config/test/react-query';
import { useFeatureFlag } from 'configcat-react';
import getByTextMatcher from '../../shared/test/getTextMatcher';
import React from 'react';

jest.mock('../../shared/hooks/AptiveAuth', () => ({
  ...jest.requireActual('../../shared/hooks/AptiveAuth'),
  withAuthenticationRequired: (component: React.ReactNode) => component,
}));
jest.mock('configcat-react');
const mockUseFeatureFlag = useFeatureFlag as jest.Mock;
let isRevenueEnabled = true;
let isTemporaryBannerEnabled = false;

describe('Dashboard page', () => {
  beforeEach(() => {
    jest.restoreAllMocks();

    mockUseFeatureFlag.mockImplementation((_flag: string) => {
      if (_flag === 'isRevenueEnabled') {
        return {
          isReady: true,
          value: isRevenueEnabled,
        };
      }

      return {
        isReady: true,
        value: isTemporaryBannerEnabled,
      };
    });
    jest.clearAllMocks();
  });

  it('should render page with ReferralSection, LatestBillWidget and SubscriptionInformation components', () => {
    render(<Dashboard />, { wrapper: TestRoot });
    expect(screen.getAllByText(/Hello, Tendy Customer./i)[0]).toBeInTheDocument();
    expect(screen.getByTestId('referral-section-head-title')).toBeInTheDocument();
    expect(screen.getByTestId('head-title').textContent).toBe('SUBSCRIPTION INFORMATION');
  });

  describe('with isTemporaryBannerEnabled flag', () => {
    it('should render temporary banner when FF is on', () => {
      render(<Dashboard />, { wrapper: TestRoot });
      isTemporaryBannerEnabled = true;

      expect(
        screen.getByText(
          getByTextMatcher(
            'Attention: New Text Number! Our old SMS numbers are no longer active. Please text 62318 for assistance. Thank you!'
          )
        )
      ).toBeInTheDocument();
    });
    it('should render temporary banner when FF is off', () => {
      render(<Dashboard />, { wrapper: TestRoot });
      isTemporaryBannerEnabled = false;

      expect(
        screen.queryByText(
          getByTextMatcher(
            'Attention: New Text Number! Our old SMS numbers are no longer active. Please text 62318 for assistance. Thank you!'
          )
        )
      ).not.toBeInTheDocument();
    });
  });
  describe('with isRevenueEnabled flag', () => {
    it('should render subscription section when FF is on', () => {
      render(<Dashboard />, { wrapper: TestRoot });
      isRevenueEnabled = true;

      expect(screen.getByText('SUBSCRIPTION INFORMATION')).toBeInTheDocument();
      expect(screen.queryByTestId('current-plan-info')).not.toBeInTheDocument();
    });
    it('should render Current plan info section when FF is off', () => {
      render(<Dashboard />, { wrapper: TestRoot });
      isRevenueEnabled = false;

      expect(screen.getByTestId('current-plan-info')).toBeInTheDocument();
      expect(screen.queryByTestId('head-title')).not.toBeInTheDocument();
    });
  });

  describe('with intro video', () => {
    it('should show the intro video for the first 60 days', () => {
      jest.spyOn(global.Date, 'now').mockImplementationOnce(() => Date.parse('2024-02-14'));

      render(<Dashboard />, { wrapper: TestRoot });
      isRevenueEnabled = false;
      expect(screen.getByTestId('intro-video')).toBeInTheDocument();
    });
    it('should not show the intro video if it passes the first 60 days', () => {
      jest.spyOn(global.Date, 'now').mockImplementationOnce(() => Date.parse('2024-05-14'));

      render(<Dashboard />, { wrapper: TestRoot });
      isRevenueEnabled = false;
      expect(screen.queryByTestId('intro-video')).toBeNull();
    });
  });
});
