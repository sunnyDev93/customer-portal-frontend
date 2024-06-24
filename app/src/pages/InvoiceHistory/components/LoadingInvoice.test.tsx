import React from 'react';
import { render } from '@testing-library/react';
import LoadingInvoice from './LoadingInvoice';

describe('LoadingInvoice', () => {
  it('renders loading placeholders correctly', () => {
    const { getAllByTestId } = render(<LoadingInvoice />);

    expect(getAllByTestId('loading-placeholder')).toHaveLength(6);
  });
});
