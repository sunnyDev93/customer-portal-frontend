import React from 'react';
import { render, screen } from '@testing-library/react';
import AutoPaySettingsItem from './AutoPaySettingItem';

describe('AutoPaySettingsItem', () => {
  it('renders the label and children', () => {
    const label = 'Test Label';
    const children = <span>Test Children</span>;

    render(<AutoPaySettingsItem label={label} children={children} />);

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });
});
