import React from 'react';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlanServiceList from 'pages/SubscriptionRenewal/SelectPlan/components/PlanServiceList';
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

describe('PlanServiceList', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('happy case', () => {
    it('should render normally', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <PlanServiceList services={[defaultService]} />
          </RecoilRoot>
        </QueryClientProvider>
      );

      const nameLabel = screen.queryByText(defaultService.name);
      const buttonIcon = screen.queryByText('check-circle-icon');

      expect(nameLabel).not.toBeInTheDocument();
      expect(buttonIcon).not.toBeInTheDocument();
    });

    it('should render correct number of service', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <PlanServiceList services={[defaultService, { ...defaultService, id: '1232' }]} />
          </RecoilRoot>
        </QueryClientProvider>
      );

      const planServiceItems = screen.queryAllByTestId('plan-service-item');
      const buttonIcons = screen.queryAllByTestId('check-circle-icon');

      expect(planServiceItems).toHaveLength(0);
      expect(buttonIcons).toHaveLength(0);
    });
  });
});
