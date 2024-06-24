import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpotItem from 'components/SpotItem/index';

describe('SpotItem', () => {
  it('renders with label', () => {
    const { getByText } = render(<SpotItem label="Test Label" />);
    expect(getByText('Test Label')).toBeInTheDocument();
  });

  it('renders as selected when selected is true', () => {
    const { container } = render(<SpotItem label="Test Label" selected={true} />);
    expect(container.firstChild).toHaveClass('selected');
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    const { getByText } = render(<SpotItem label="Test Label" onClick={onClick} />);
    fireEvent.click(getByText('Test Label'));
    expect(onClick).toHaveBeenCalled();
  });
});
