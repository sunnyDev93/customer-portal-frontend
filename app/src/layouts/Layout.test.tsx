import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';
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

describe('Layout', () => {
  describe('Layout with no pages', () => {
    it('should show home icon only', () => {
      render(<Layout />);
      const componentElem = screen.getByTestId('Layout');
      expect(componentElem).toBeInTheDocument();
    });
  });

  describe('Layout with label', () => {
    it('should show home and pages', () => {
      render(
        <Layout>
          <div>Hello World!</div>
        </Layout>
      );

      const helloWorldElem = screen.getByText('Hello World!');

      expect(helloWorldElem).toBeInTheDocument();
    });
  });
});
