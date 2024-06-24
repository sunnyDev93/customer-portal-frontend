import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';
import '@testing-library/jest-dom';

describe('LoadingSpinner', () => {
  describe('LoadingSpinner only', () => {
    it('should show a loading spinner', () => {
      render(<LoadingSpinner />);
      const spinnerElem = screen.getByTestId('loading-spinner');
      expect(spinnerElem).toBeInTheDocument();
    });
  });

  describe('LoadingSpinner with label', () => {
    it('should show a loading spinner with label', () => {
      render(<LoadingSpinner label="Loading..." />);
      const spinnerElem = screen.getByText('Loading...');
      expect(spinnerElem).toBeInTheDocument();
    });
  });
});
