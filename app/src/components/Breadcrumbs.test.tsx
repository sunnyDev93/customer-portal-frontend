import React from 'react';
import { render, screen } from '@testing-library/react';
import Breadcrumbs from './Breadcrumbs';
import '@testing-library/jest-dom';

const pages = [
  {
    title: 'Page 1',
    current: false,
  },
  {
    title: 'Page 2',
    current: true,
  },
];

describe('Breadcrumbs', () => {
  describe('Breadcrumbs with no pages', () => {
    it('should show home icon only', () => {
      render(<Breadcrumbs />);
      const homeElem = screen.getByTestId('home-icon');
      expect(homeElem).toBeInTheDocument();
    });
  });

  describe('Breadcrumbs with label', () => {
    it('should show home and pages', () => {
      render(<Breadcrumbs pages={pages} />);

      const homeElem = screen.getByTestId('home-icon');
      const page1Elem = screen.getByText('Page 1');
      const page2Elem = screen.getByText('Page 2');

      expect(homeElem).toBeInTheDocument();
      expect(page1Elem).toBeInTheDocument();
      expect(page2Elem).toBeInTheDocument();
    });
  });
});
