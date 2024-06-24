// ScheduleAppointmentContainer.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Breadcrumb from './Breadcrumb';

import { ConfigCatProvider } from 'configcat-react';
import { CONFIGCAT_SDK_KEY, queryClient } from 'config/test/react-query';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

jest.mock('@auth0/auth0-react', () => ({
  Auth0Provider: ({ children }: { children: React.ReactNode }) => children,
  withAuthenticationRequired: (component: any, _: any) => component,
  useAuth0: () => {
    return {
      isLoading: false,
      user: { sub: 'foobar' },
      isAuthenticated: true,
      loginWithRedirect: jest.fn(),
    };
  },
}));

describe('Breadcrumb', () => {
  it('Breadcrumb without crashing', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { pathname: 'https://app.customer-portal.dev.goaptive.com:8000/dashboard' },
    });
    render(<Breadcrumb />);
    expect(screen.queryByTestId('breadscrum')).toBeInTheDocument();
  });

  it('Breadcrumb level1 will have content case 1', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { pathname: 'https://app.customer-portal.dev.goaptive.com:8000/dashboard' },
    });
    render(<Breadcrumb />);
    expect(screen.queryByTestId('level1-id')).toHaveTextContent('My Account');
  });

  it('Breadcrumb level1 will have content case 2', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { pathname: 'https://app.customer-portal.dev.goaptive.com:8000/billing' },
    });
    render(<Breadcrumb />);
    expect(screen.queryByTestId('level1-id')).toHaveTextContent('Payments & Invoices');
  });

  it('Breadcrumb level1 will have content case 3', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { pathname: 'https://app.customer-portal.dev.goaptive.com:8000/randome' },
    });
    render(<Breadcrumb />);
    expect(screen.queryByTestId('level1-id')).toHaveTextContent('Appointments');
  });

  it('Breadcrumb level2 will have content case 1', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { pathname: 'https://app.customer-portal.dev.goaptive.com:8000/dashboard' },
    });
    render(<Breadcrumb />);
    expect(screen.queryByTestId('level2-id')).toHaveTextContent('Home');
  });

  it('Breadcrumb level2 will have content case 2', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { pathname: 'https://app.customer-portal.dev.goaptive.com:8000/documents' },
    });
    render(<Breadcrumb />);
    expect(screen.queryByTestId('level2-id')).toHaveTextContent('My Documents');
  });

  it('Breadcrumb level2 will have content case 2', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { pathname: 'https://app.customer-portal.dev.goaptive.com:8000/subscription-renewal' },
    });
    render(<Breadcrumb />);
    expect(screen.queryByTestId('level2-id')).toHaveTextContent('Subscription Renewal');
  });

  it('Breadcrumb level2 will have content case 3', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { pathname: 'https://app.customer-portal.dev.goaptive.com:8000/make-payments' },
    });
    render(<Breadcrumb />);
    expect(screen.queryByTestId('level2-id')).toHaveTextContent('Make a Payment');
  });

  it('Breadcrumb level2 will have content case 4', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { pathname: 'https://app.customer-portal.dev.goaptive.com:8000/payment-settings' },
    });
    render(<Breadcrumb />);
    expect(screen.queryByTestId('level2-id')).toHaveTextContent('Payment Settings');
  });

  it('Breadcrumb level2 will have content case 5', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { pathname: 'https://app.customer-portal.dev.goaptive.com:8000/add-payment-methods' },
    });
    render(<Breadcrumb />);
    expect(screen.queryByTestId('level2-id')).toHaveTextContent('Add Payment Method');
  });

  it('Breadcrumb level2 will have content case 6', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { pathname: 'https://app.customer-portal.dev.goaptive.com:8000/invoice-history' },
    });
    render(<Breadcrumb />);
    expect(screen.queryByTestId('level2-id')).toHaveTextContent('Invoice History');
  });

  it('Breadcrumb level2 will have content case 7', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { pathname: 'https://app.customer-portal.dev.goaptive.com:8000/upcoming' },
    });
    render(<Breadcrumb />);
    expect(screen.queryByTestId('level2-id')).toHaveTextContent('Upcoming Appointment');
  });
  it('Breadcrumb level2 will have content case 8', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { pathname: 'https://app.customer-portal.dev.goaptive.com:8000/random' },
    });
    render(<Breadcrumb />);
    expect(screen.queryByTestId('level2-id')).toHaveTextContent('Schedule an Appointment');
  });
});
