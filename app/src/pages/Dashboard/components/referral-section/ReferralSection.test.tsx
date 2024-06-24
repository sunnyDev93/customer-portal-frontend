import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReferralSection from 'pages/Dashboard/components/referral-section/ReferralSection';

describe('ReferralSection component', () => {
  const testCustomerId = '2869416';
  const headTitleContent = 'A better home is better shared.';
  const discountTestValue = '100';
  const termsAndConditionTextContent = 'Terms and conditions apply';

  it(`should have a head title with content ${headTitleContent}`, () => {
    render(<ReferralSection customerId={testCustomerId} />);
    const headTitle = screen.getAllByTestId('referral-section-head-title');
    expect(headTitle[0]).toBeInTheDocument();
    expect(headTitle[0]).toHaveTextContent(headTitleContent);
  });

  it(`should have discount value with 50$ as default`, () => {
    render(<ReferralSection customerId={testCustomerId} />);
    const discount = screen.getAllByTestId('referral-section-discount-amount');
    expect(discount[0]).toBeInTheDocument();
    expect(discount[0]).toHaveTextContent('$50');
  });

  it(`should have discount value with ${discountTestValue}$ when the discount props passed with value ${discountTestValue}`, () => {
    render(<ReferralSection customerId={testCustomerId} discount={discountTestValue} />);
    const discount = screen.getAllByTestId('referral-section-discount-amount');
    expect(discount[0]).toBeInTheDocument();
    expect(discount[0]).toHaveTextContent(`$${discountTestValue}`);
  });

  it(`should mention discount in description with the same value in the bedge`, () => {
    render(<ReferralSection customerId={testCustomerId} discount={discountTestValue} />);
    const discountMentioned = screen.getAllByTestId('referral-section-discount-description');
    expect(discountMentioned[0]).toBeInTheDocument();
    expect(discountMentioned[0].textContent?.indexOf(`$${discountTestValue}`) !== -1).toBeTruthy;
  });

  it(`should terms and condition section with content ${termsAndConditionTextContent}`, () => {
    render(<ReferralSection customerId={testCustomerId} discount={discountTestValue} />);
    const termAndConditionAction = screen.getAllByTestId('referral-section-term-condition-action');
    expect(termAndConditionAction[0]).toBeInTheDocument();
    expect(termAndConditionAction[0]).toHaveTextContent(termsAndConditionTextContent);
  });

  // it(`should trigger slide out modal with content is the list of conditions and terms`, async () => {
  //   const mockOnTriggerSlideOutModal = jest.fn();
  //   render(<ReferralSection customerId={testCustomerId} discount={discountTestValue} />);
  //   const termAndCOnditionAction = screen.getAllByTestId('referral-section-term-condition-action');
  //   fireEvent.click(termAndCOnditionAction[0]);
  //   expect(mockOnTriggerSlideOutModal).toHaveBeenCalledTimes(1);
  // });
});
