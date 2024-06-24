import React from 'react';
import { render, screen } from '@testing-library/react';
import Navigation from './Navigation';
import '@testing-library/jest-dom';

test('renders navigation', () => {
  render(<Navigation />);
  const logoElem = screen.getByAltText('Aptive');
  expect(logoElem).toBeInTheDocument();
});
