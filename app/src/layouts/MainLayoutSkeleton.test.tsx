import { render } from '@testing-library/react';
import MainLayoutSkeleton from './MainLayoutSkeleton';

jest.mock('configcat-react', () => ({
    useFeatureFlag: jest.fn(),
}));
jest.mock('../components/Footer', () => () => <div data-testid="Footer">Footer</div>);
jest.mock('components/loading/MainNavSkeleton', () => () => <div data-testid="MainNavSkeleton">MainNavSkeleton</div>);

describe('MainLayoutSkeleton', () => {
    it('renders MainNavSkeleton and Footer by default', () => {
        require('configcat-react').useFeatureFlag.mockReturnValue({ value: false, loading: false });
        const { getByTestId } = render(<MainLayoutSkeleton />);
        expect(getByTestId('MainNavSkeleton')).toBeInTheDocument();
        expect(getByTestId('Footer')).toBeInTheDocument();
    });

    it('does not render side panel when isRevenueEnabled is true', () => {
        require('configcat-react').useFeatureFlag.mockReturnValue({ value: true, loading: false });
        const { getByTestId, queryByText } = render(<MainLayoutSkeleton />);
        expect(getByTestId('MainNavSkeleton')).toBeInTheDocument();
        expect(queryByText(/transform transition-all duration-300 hidden absolute/)).not.toBeInTheDocument();
        expect(getByTestId('Footer')).toBeInTheDocument();
    });

});
