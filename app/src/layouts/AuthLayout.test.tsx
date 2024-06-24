import React from 'react';
import { render } from '@testing-library/react';
import AuthLayout from './AuthLayout';

jest.mock('../components/AuthNavigation', () => () => <div data-testid="AuthNavigation">AuthNavigation</div>);

describe('AuthLayout', () => {
    it('renders AuthNavigation', () => {
        const { getByTestId } = render(<AuthLayout />);
        expect(getByTestId('AuthNavigation')).toBeInTheDocument();
    });

    it('renders children content', () => {
        const { getByText } = render(
            <AuthLayout>
                <div>Test Child Content</div>
            </AuthLayout>
        );
        expect(getByText('Test Child Content')).toBeInTheDocument();
    });

});
