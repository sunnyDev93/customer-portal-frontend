import React from 'react';
import { render, screen } from '@testing-library/react';
import TotalRecords from './TotalRecords';

describe('TotalRecords', () => {
  it('should display the correct range of records when totalCount is less than perPage', () => {
    render(<TotalRecords currentPage={1} totalCount={5} perPage={10} />);

    // Use screen.getByText to find individual text elements
    const showingText = screen.getByText(/Showing/);
    const toText = screen.getByText(/to/);
    const ofText = screen.getByText(/of/);

    // Assert that these individual text elements exist
    expect(showingText).toBeInTheDocument();
    expect(toText).toBeInTheDocument();
    expect(ofText).toBeInTheDocument();

    // Assert that they are in the correct order
    const textNodes = screen.getAllByText(/[0-9]+/);
    expect(textNodes).toHaveLength(3);

    // Assert the specific values you expect
    expect(textNodes[0]).toHaveTextContent('1');
    expect(textNodes[1]).toHaveTextContent('5');
    expect(textNodes[2]).toHaveTextContent('5');
  });
});
