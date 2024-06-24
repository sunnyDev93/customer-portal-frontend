import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageTitle from './PageTitle';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { toDollars } from '../helpers';
import { TestRoot } from 'config/test/react-query';

jest.mock('configcat-react', () => ({
  useFeatureFlag: () => ({ value: true }),
}));
const mockTitle = 'mock title';
const mockSubTitle = 'mock sub title';
const setup = ({ mockTitle, mockSubTitle }: { mockTitle: string; mockSubTitle?: string }) => {
  render(<PageTitle title={mockTitle} subtitle={mockSubTitle} />, { wrapper: TestRoot });
};

describe('PageTitle component', () => {
  it('should always title on the screen', async () => {
    setup({ mockTitle });

    const title = screen.queryByTestId('title');
    expect(title).toHaveTextContent(mockTitle);
  });

  it('should not have sub title if we dont pass it into the component or its empty string', async () => {
    setup({ mockTitle });

    const subTitle = screen.queryByTestId('subtitle');
    expect(subTitle).not.toBeInTheDocument();
  });

  it('should have sub title if we pass it into the component', async () => {
    setup({ mockTitle, mockSubTitle });

    const subTitle = screen.queryByTestId('subtitle');
    expect(subTitle).toHaveTextContent(mockSubTitle);
  });

  it('should always have right component wrapper', async () => {
    setup({ mockTitle, mockSubTitle });

    const position = screen.queryByTestId('position');
    expect(position).toBeInTheDocument();
  });
});
