import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DocumentPage from './index';
import { ConfigCatProvider } from 'configcat-react';
import { CONFIGCAT_SDK_KEY, queryClient } from 'config/test/react-query';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

const mockPageChange = jest.fn();
const mockSetPerPage = jest.fn();
describe('DocumentPage component', () => {
    it(`should have DocumentPage component`, async () => {
        render(
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <ConfigCatProvider sdkKey={CONFIGCAT_SDK_KEY}>
                        <BrowserRouter>
                            <DocumentPage />
                        </BrowserRouter>
                    </ConfigCatProvider>
                </QueryClientProvider>
            </RecoilRoot>
        );

        const com = screen.queryByTestId('document-page');
        expect(com).toBeInTheDocument();
    });
});
