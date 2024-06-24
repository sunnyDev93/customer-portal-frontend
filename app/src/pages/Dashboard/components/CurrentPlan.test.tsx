import { render, screen } from '@testing-library/react';
import CurrentPlan from './CurrentPlan';
import { TestRoot } from '../../../config/test/react-query';
import getByTextMatcher from '../../../shared/test/getTextMatcher';

describe('CurrentPlan component', () => {
  it(`should render correctly`, () => {
    render(<CurrentPlan />, { wrapper: TestRoot });
    expect(screen.getByText('Current Plan')).toBeInTheDocument();
    expect(screen.getByText(getByTextMatcher('Pro'))).toBeInTheDocument();
    expect(screen.getByText(getByTextMatcher('Customer Since: Jan 16, 2024'))).toBeInTheDocument();
    expect(screen.getByText(getByTextMatcher('Includes: Indoor Fly Trap Service, Outdoor Wasp Trap Service.'))).toBeInTheDocument();
    // temporary hide it
    // expect(screen.getByText(getByTextMatcher('Agreement Effective Date - Jan 16, 2025'))).toBeInTheDocument();
    expect(screen.getByTestId('aptive-icon')).toBeInTheDocument();
  });
});
