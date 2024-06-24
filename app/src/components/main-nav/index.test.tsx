import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { TestRoot } from 'config/test/react-query';
import { useFeatureFlag } from 'configcat-react';
import MainNav from './index';
import { useAptiveAuth } from '../../shared/hooks/AptiveAuth';

// mock child components
jest.mock('../loading/MainNavSkeleton', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="main-nav-skeleton">MainNavSkeleton</div>),
}));
jest.mock('./MainNav', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="main-nav-ui">MainNavUI</div>),
}));

// mock navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// mock FF
let isOn = false;
jest.mock('configcat-react');
const mockUseFeatureFlag = useFeatureFlag as jest.Mock;

// mock Auth0
jest.mock('@auth0/auth0-react', () => ({
  ...jest.requireActual('@auth0/auth0-react'),
  withAuthenticationRequired: (component: React.ReactNode) => component,
}));

jest.mock('../../shared/hooks/AptiveAuth', () => ({
  ...jest.requireActual('../../shared/hooks/AptiveAuth'),
  withAuthenticationRequired: (component: React.ReactNode) => component,
  useAptiveAuth: jest.fn(() => ({ user: { email_verified: true } })),
}));

beforeAll(() => {
  mockUseFeatureFlag.mockImplementation(() => {
    return {
      loading: false,
      value: isOn,
    };
  });
});

describe('MainNav', () => {
  it('should render correctly when all conditions are met', () => {
    render(<MainNav />, { wrapper: TestRoot });
    expect(screen.getByTestId('main-nav-ui')).toBeInTheDocument();
  });

  it(`should navigate to verify page`, async () => {
    (useAptiveAuth as jest.Mock).mockReturnValueOnce({ user: { email_verified: false } });

    render(<MainNav />, { wrapper: TestRoot });

    expect(mockNavigate).toBeCalledWith('/not-verified');
  });

  it(`should navigate to maintenance page`, async () => {
    isOn = true;
    render(<MainNav />, { wrapper: TestRoot });

    expect(mockNavigate).toBeCalledWith('/maintenance');
  });
});
