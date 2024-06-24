import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { toDollars } from '../helpers';

describe('Footer component', () => {
  it('should always have Copyright text on the screen', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </RecoilRoot>
    );

    expect(screen.getByText(/Copyright/)).toBeInTheDocument();
  });

  it('should always have Aptive text on the screen', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </RecoilRoot>
    );

    expect(screen.getByText(/Aptive/)).toBeInTheDocument();
  });

  it('should always have Privacy text on the screen', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </RecoilRoot>
    );

    expect(screen.getByText(/Privacy/)).toBeInTheDocument();
  });

  it('should always have Policy text on the screen', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </RecoilRoot>
    );

    expect(screen.getByText(/Policy/)).toBeInTheDocument();
  });

  it('should always have a link to redirect to a page show policy and privacy: https://www.goaptive.com/privacy-policy', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </RecoilRoot>
    );
    const link = screen.queryByTestId('link');
    expect(link).toHaveAttribute('href', 'https://goaptive.com/privacy-policy');
  });
});
