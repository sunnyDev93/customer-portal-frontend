import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GADisclossure from './GADisclossure';
import { clossureData } from 'components/modal-content/referral-terms-conditions/ReferralTermsConditions';

describe('GADisclossure component', () => {
  it('should have container with full width', () => {
    render(<GADisclossure />);
    const containerElement = screen.getAllByTestId('disclossure-container');
    expect(containerElement[0].className).toBe('w-full');
  });

  it('should have list renderred if list props is not passed', () => {
    render(<GADisclossure />);
    const containerElement = screen.getAllByTestId('disclossure-container');
    expect(containerElement[0].childNodes.length).toBe(0);
  });

  it(`should render ${clossureData.length} expandable item when list props with length of ${clossureData.length} passed`, () => {
    render(<GADisclossure list={clossureData} />);
    const containerElement = screen.getAllByTestId('disclossure-container');
    expect(containerElement[0].childNodes.length).toBe(clossureData.length);
  });

  it(`should have some list items expanded when its corresponding iOpen value set to true`, async () => {
    const expandedItemIndexes = [0, 4, 1];
    const modifiedData = [...clossureData];
    expandedItemIndexes.forEach(item => (modifiedData[item].isOpen = true));
    render(<GADisclossure list={modifiedData} />);
    const containerElement = await screen.getAllByTestId('disclossure-container');
    expandedItemIndexes.forEach(item => {
      expect(containerElement[0].childNodes[item].childNodes.length).toBe(2);
    });
  });
});
