import React from 'react';
import { render, screen } from '@testing-library/react';
import PlanServiceItem from 'pages/SubscriptionRenewal/SelectPlan/components/PlanServiceItem';
import { PlanAddon, PlanServiceStatus } from 'types/plan';

import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: 1000,
    },
  },
});

const defaultService: PlanAddon = {
  id: '1',
  name: 'Outdoor wasp traps',
  price: 179,
  status: PlanServiceStatus.Included,
  addonId: '1',
  iconName: '',
};

describe('PlanServiceItem', () => {
  it('should render default service normally', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <PlanServiceItem service={defaultService} />
        </RecoilRoot>
      </QueryClientProvider>
    );

    const nameLabel = screen.queryByText(defaultService.name);
    const buttonIcon = screen.queryByTestId('check-circle-icon');

    expect(nameLabel).not.toBeInTheDocument();
    expect(buttonIcon).not.toBeInTheDocument();
  });

  it('should render disabled service normally', () => {
    const disabledService = { ...defaultService };
    disabledService.status = PlanServiceStatus.Disabled;
    render(
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <PlanServiceItem service={disabledService} />
        </RecoilRoot>
      </QueryClientProvider>
    );

    const nameLabel = screen.queryByText(defaultService.name);
    const buttonIcon = screen.queryByTestId('action-button');

    expect(nameLabel).not.toBeInTheDocument();
    expect(buttonIcon).toBeNull();
  });

  it('should render selected service normally', () => {
    const disabledService = { ...defaultService };
    disabledService.status = PlanServiceStatus.Selected;
    render(
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <PlanServiceItem service={disabledService} />
        </RecoilRoot>
      </QueryClientProvider>
    );

    const nameLabel = screen.queryByText(defaultService.name);
    const buttonIcon = screen.queryByTestId('check-circle-icon');

    expect(nameLabel).not.toBeInTheDocument();
    expect(buttonIcon).not.toBeInTheDocument();
  });

  it('should render enable service normally', () => {
    const disabledService = { ...defaultService };
    disabledService.status = PlanServiceStatus.Enable;
    render(
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <PlanServiceItem service={disabledService} />
        </RecoilRoot>
      </QueryClientProvider>
    );

    const nameLabel = screen.queryByText(defaultService.name);
    const buttonIcon = screen.queryByTestId('action-button');

    expect(nameLabel).not.toBeInTheDocument();
    expect(buttonIcon).toBeNull();
  });
});
