import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TestRoot } from '../../config/test/react-query';
import MagicLinkExpired from './index';

jest.mock('react-router-dom', () => ({
  Navigate: () => <div data-testid="mock-navigate" />,
  useSearchParams: jest.fn(),
}));

const mockLoginWithRedirect = jest.fn();
jest.mock('../../shared/hooks/AptiveAuth', () => ({
  withAuthenticationRequired: jest.fn(),
  useAptiveAuth: () => ({
    loginWithRedirect: () => mockLoginWithRedirect(),
  }),
}));

describe('MagicLinkExpired', () => {
  it('should navigate to index if there is no error code', async () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      {
        get: () => '',
      },
    ]);
    render(<MagicLinkExpired />, { wrapper: TestRoot });

    await waitFor(() => {
      expect(screen.getByTestId('mock-navigate')).toBeInTheDocument();
    });
  });
  it('should show page not found when token is invalid', async () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      {
        get: () => '460',
      },
    ]);
    render(<MagicLinkExpired />, { wrapper: TestRoot });

    await waitFor(() => {
      expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    });
  });
  it('should show page not found when token is expired', async () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      {
        get: () => '461',
      },
    ]);
    render(<MagicLinkExpired />, { wrapper: TestRoot });

    await waitFor(() => {
      expect(screen.getByText('Oops! This link has expired.')).toBeInTheDocument();
    });
  });
  it('should show login button', async () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      {
        get: () => '461',
      },
    ]);

    render(<MagicLinkExpired />, { wrapper: TestRoot });

    const loginButton = screen.getByRole('button', { name: 'Log in to your account' });
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);
    expect(mockLoginWithRedirect).toBeCalled();
  });
});
