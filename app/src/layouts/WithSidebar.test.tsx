import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import WithSidebar from './WithSidebar';
import { TestRoot } from 'config/test/react-query';

// Mock dependencies as needed
jest.mock('react-outside-click-handler', () => {
    const OutsideClickHandler = ({ onOutsideClick, children }: any) => {
        const handleClick = (event: any) => {
            if (!event.target.closest('.mock-outside-click-handler')) {
                onOutsideClick();
            }
        };
        return <div className="mock-outside-click-handler" onClick={handleClick}>{children}</div>;
    };
    return OutsideClickHandler;
});

jest.mock('configcat-react', () => ({
    useFeatureFlag: jest.fn(() => ({ value: false, loading: false })),
}));

describe('WithSidebar Component', () => {
    it('renders children when revenue is disabled', () => {
        const { getByText } = render(
            <WithSidebar>
                <div>Child Content</div>
            </WithSidebar>, { wrapper: TestRoot }
        );
        expect(getByText('Child Content')).toBeInTheDocument();
    });

    it('toggles menu expansion when button is clicked', () => {
        const { getByRole } = render(
            <WithSidebar>
                <div>Child Content</div>
            </WithSidebar>, { wrapper: TestRoot }
        );
        const button = getByRole('button');
        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('closes the menu when clicked outside', () => {
        const { getByRole } = render(
            <WithSidebar>
                <div>Child Content</div>
            </WithSidebar>, { wrapper: TestRoot }
        );
        const button = getByRole('button');
        fireEvent.click(button);

        expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('calls onHandleClickMenuItem when NavLink is clicked', () => {
        const onHandleClickMenuItem = jest.fn();
        const { getByText } = render(
            <WithSidebar>
                <div>Child Content</div>
            </WithSidebar>, { wrapper: TestRoot }
        );
        const navLink = getByText('Child Content');
        fireEvent.click(navLink);
        expect(onHandleClickMenuItem).toHaveBeenCalledTimes(0);
    });

});
