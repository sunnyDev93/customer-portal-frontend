import React from 'react';
import { render, screen } from '@testing-library/react';
import WarningMessage from './WarningMessage';
import '@testing-library/jest-dom';

describe('WarningMessage', () => {
  describe('WarningMessage with no pages', () => {
    it('should show home icon only', () => {
      render(<WarningMessage message="This is a warning message" />);

      const warningElem = screen.getByText(/This is a warning message/i);
      expect(warningElem).toBeInTheDocument();
    });
  });
});
