import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './NavBar';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    NavLink: ({ children }: any) => <div>{children}</div>,
    useNavigate: () => jest.fn(),
}));
jest.mock('configcat-react', () => ({
    useFeatureFlag: jest.fn(),
}));
jest.mock('../shared/hooks/useTrackingClick', () => ({
    useTrackingClick: () => ({ trackClick: jest.fn() }),
}));
jest.mock('./Breadcrumb', () => () => <div>Breadcrumb</div>);

describe('NavBar', () => {
    it('renders NavBar with feature flag off', () => {
        require('configcat-react').useFeatureFlag.mockReturnValue({ value: false, loading: false });
        const { getByTestId } = render(
            <Router>
                <NavBar closeMobileMenu={() => { }} />
            </Router>
        );
        expect(getByTestId('nav-bar')).toBeInTheDocument();
    });

    it('renders NavBar with feature flag on', () => {
        require('configcat-react').useFeatureFlag.mockReturnValue({ value: true, loading: false });
        const { getByTestId } = render(
            <Router>
                <NavBar closeMobileMenu={() => { }} />
            </Router>
        );
        expect(getByTestId('nav-bar')).toBeInTheDocument();
    });
});
