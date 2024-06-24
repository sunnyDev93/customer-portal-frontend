import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '.';

describe('Button', () => {
  describe('Button with label', () => {
    it('should show button with label', () => {
      render(<Button type="button" label="This is a button" />);
      const buttonElem = screen.getByText('This is a button');
      expect(buttonElem).toBeInTheDocument();
    });
  });
});
