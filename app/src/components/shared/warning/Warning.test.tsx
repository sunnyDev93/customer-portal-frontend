import React from 'react';
import { render, screen } from '@testing-library/react';
import Warning from './Warning'; // Import the Warning component

describe('Warning Component', () => {
  it('renders with headTitle, description, and actionButton', () => {
    // Arrange
    const headTitle = 'Test Title';
    const description = 'Test Description';
    const actionButton = 'Test Button';

    // Act
    render(<Warning headTitle={headTitle} description={description} actionButton={actionButton} />);

    // Assert
    // You can use screen queries to assert the presence of specific elements or text.
    expect(screen.getByText(headTitle)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByText(actionButton)).toBeInTheDocument();
  });

  it('renders without headTitle and description', () => {
    // Arrange
    const actionButton = 'Test Button';

    // Act
    render(<Warning actionButton={actionButton} />);

    // Assert
    // Ensure that the component renders without headTitle and description.
    expect(screen.queryByText('Test Title')).toBeNull(); // Expect it not to be in the document
    expect(screen.queryByText('Test Description')).toBeNull();
    expect(screen.getByText(actionButton)).toBeInTheDocument();
  });
});
