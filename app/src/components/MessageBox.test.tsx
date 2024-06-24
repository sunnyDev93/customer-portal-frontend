import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MessageBox, { MessageBoxTypes } from './MessageBox';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

describe('MessageBox component', () => {
  const testTitle = 'test title';
  const testSubTitle = 'test sub title';

  it('should have primary style if we change the style to primary', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <MessageBox title="test-title" subtitle="subTitle" className={MessageBoxTypes.primary} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const messageBox = screen.queryByTestId('message-box');
    expect(messageBox).toHaveClass(MessageBoxTypes.primary);
  });

  it('should have secondary style if we change the style to secondary', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <MessageBox title="test-title" subtitle="subTitle" className={MessageBoxTypes.secondary} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const messageBox = screen.queryByTestId('message-box');
    expect(messageBox).toHaveClass(MessageBoxTypes.secondary);
  });

  it('should have muted style if we change the style to secondary', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <MessageBox title="test-title" subtitle="subTitle" className={MessageBoxTypes.muted} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const messageBox = screen.queryByTestId('message-box');
    expect(messageBox).toHaveClass(MessageBoxTypes.muted);
  });

  it('should have danger style if we change the style to secondary', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <MessageBox title="test-title" subtitle="subTitle" className={MessageBoxTypes.danger} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const messageBox = screen.queryByTestId('message-box');
    expect(messageBox).toHaveClass(MessageBoxTypes.danger);
  });

  it(`should have title with content ${testTitle}`, async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <MessageBox title={testTitle} subtitle="subTitle" className={MessageBoxTypes.danger} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const title = screen.queryByTestId('title');
    expect(title).toHaveTextContent(testTitle);
  });

  it(`should not display sub title if we dont pass sub title`, async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <MessageBox title={testTitle} className={MessageBoxTypes.danger} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const subtitle = screen.queryByTestId('subtitle');
    expect(subtitle).not.toBeInTheDocument();
  });

  it(`should have sub title with content ${testSubTitle}`, async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <MessageBox title={testTitle} subtitle={testSubTitle} className={MessageBoxTypes.danger} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const subTitle = screen.queryByTestId('subtitle');
    expect(subTitle).toHaveTextContent(testSubTitle);
  });
});
