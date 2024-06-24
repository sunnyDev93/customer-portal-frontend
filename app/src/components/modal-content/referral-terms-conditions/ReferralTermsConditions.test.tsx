import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReferralTermsConditions, { clossureData } from './ReferralTermsConditions';

describe('ReferralTermsConditions component', () => {
  const headTitleContent = 'Referral Terms and Conditions';
  const lastUpdatedTime = 'Last Updated: January 3, 2023';
  const description = `These Terms and Conditions (the “Terms and Conditions”) apply to participate in the Aptive Environmental, LLC (“Aptive”) Customer Referral Program (the “Referral Program”). Your participation, as the Referring Customer (as defined below), in the Referral Program constitutes your full and unconditional acceptance of these Terms and Conditions.`;

  it('should have container with full width', () => {
    render(<ReferralTermsConditions />);
    const containerElement = screen.getAllByTestId('ReferralTermsConditions-container');
    expect(containerElement[0].className.indexOf('w-full')).not.toBe(-1);
  });

  it(`should have head title with content ${headTitleContent}`, () => {
    render(<ReferralTermsConditions />);
    const headTitle = screen.getAllByTestId('ReferralTermsConditions-head-title');
    expect(headTitle[0].textContent).toBe(headTitleContent);
  });

  it(`should have last updated time with value ${lastUpdatedTime}`, () => {
    render(<ReferralTermsConditions />);
    const lastUpdated = screen.getAllByTestId('ReferralTermsConditions-last-updated-time');
    expect(lastUpdated[0].textContent).toBe(lastUpdatedTime);
  });
  it(`should have a short description with value ${description}`, () => {
    render(<ReferralTermsConditions />);
    const descriptionTag = screen.getAllByTestId('ReferralTermsConditions-description');
    expect(descriptionTag[0].textContent).toBe(description);
  });
  it(`should have a list of terms and conditions`, () => {
    render(<ReferralTermsConditions />);
    const list = screen.getAllByTestId('ReferralTermsConditions-list');
    expect(list[0]).toBeInTheDocument();
  });
});
