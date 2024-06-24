import React from 'react';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PlanAddon, PlanServiceStatus } from 'types/plan';
import AddonItem from 'pages/SubscriptionRenewal/AdditionalServicesStep/components/AddonItem';

const defaultService: PlanAddon = {
  id: '1',
  name: 'Outdoor wasp traps',
  price: 179,
  status: PlanServiceStatus.Included,
  addonId: '1',
  iconName: '',
};

describe('PlanServiceItem', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should render default service normally', () => {
    render(<AddonItem addon={defaultService} />);

    const nameLabel = screen.getByText(defaultService.name);
    const buttonIcon = screen.getByTestId('check-circle-icon');

    expect(nameLabel).toBeInTheDocument();
    expect(buttonIcon).toBeInTheDocument();
  });

  it('should render disabled service normally', () => {
    const disabledService = { ...defaultService };
    disabledService.status = PlanServiceStatus.Disabled;
    render(<AddonItem addon={disabledService} />);

    const nameLabel = screen.getByText(defaultService.name);
    const buttonIcon = screen.getByTestId('plus-circle-icon');

    expect(nameLabel).toBeInTheDocument();
    expect(buttonIcon).toBeInTheDocument();
    expect(buttonIcon).not.toHaveClass('cursor-pointer');
  });

  it('should render selected service normally', () => {
    const enabledService = { ...defaultService };
    enabledService.status = PlanServiceStatus.Selected;
    render(<AddonItem addon={enabledService} isSelected />);

    const nameLabel = screen.getByText(defaultService.name);
    const buttonIcon = screen.getByTestId('check-circle-icon');

    expect(nameLabel).toBeInTheDocument();
    expect(buttonIcon).toBeInTheDocument();
  });

  it('should render enable service normally', () => {
    const enabledService = { ...defaultService };
    enabledService.status = PlanServiceStatus.Enable;
    render(<AddonItem addon={enabledService} />);

    const nameLabel = screen.getByText(defaultService.name);
    const buttonIcon = screen.getByTestId('plus-circle-icon');

    expect(nameLabel).toBeInTheDocument();
    expect(buttonIcon).toBeInTheDocument();
  });
});
