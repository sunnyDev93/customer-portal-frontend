import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SelectPlan from './index';
import { RecoilRoot } from 'recoil';
import { TestRoot } from 'config/test/react-query';

// Mock the necessary dependencies
jest.mock('../hooks/useCurrentStep', () => ({
  __esModule: true,
  default: jest.fn(() => ({ next: jest.fn() })),
}));

describe('SelectPlan', () => {
  it('renders the component and triggers next on button click', () => {
    const res = render(<SelectPlan />, { wrapper: TestRoot });
    expect(res).toMatchSnapshot();
  });
});
