import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SlideOut from './SlideOut';

describe('ReferralTermsConditions component', () => {
  const onClickMock = jest.fn();

  it('should have close icon', () => {
    render(<SlideOut isOpen={true} onClose={onClickMock} />);
    const closeIcon = screen.getAllByTestId('slideout-close-icon');
    expect(closeIcon[0]).toBeInTheDocument();
  });
});
