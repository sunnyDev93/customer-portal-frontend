import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import InvoiceHistoryPage from './InvoiceHistoryPage';
import { TestRoot } from 'config/test/react-query';

import '@testing-library/jest-dom/extend-expect';
import { server } from 'mocks/server';
import { getInvoicesHandler } from 'mocks/mock-handlers';

jest.mock('../../shared/hooks/AptiveAuth', () => ({
  ...jest.requireActual('../../shared/hooks/AptiveAuth'),
  withAuthenticationRequired: (component: React.ReactNode) => component,
}));

describe('InvoiceHistory', () => {
  it(`should render correctly`, async () => {
    render(<InvoiceHistoryPage />, { wrapper: TestRoot });

    expect(screen.getAllByTestId('loading-placeholder')).toHaveLength(6);
    await waitFor(() => expect(screen.getAllByTestId('container')).toHaveLength(3));
  });
  it(`should render no invoice`, async () => {
    server.use(getInvoicesHandler.noActiveInvoicesHandler);
    render(<InvoiceHistoryPage />, { wrapper: TestRoot });

    expect(screen.getAllByTestId('loading-placeholder')).toHaveLength(6);
    await waitFor(() => expect(screen.getByText(/No invoices found for this account./)).toBeInTheDocument());
  });
});
