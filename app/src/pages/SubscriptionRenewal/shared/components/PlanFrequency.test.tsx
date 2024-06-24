import React from 'react';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlanFrequency from 'pages/SubscriptionRenewal/shared/components/PlanFrequency';
import { mockPlanList } from 'mocks/responseMocks';

const plan = mockPlanList[0];

describe('PlanFrequency', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('happy case', () => {
    it('should render normally', () => {
      render(<PlanFrequency plan={plan} />);

      const label = screen.getByText('Treatment Frequency');
      const frequency = screen.getByText('Jan - Dec: Every 50-80 days');

      expect(label).toBeInTheDocument();
      expect(frequency).toBeInTheDocument();
    });
  });
});
