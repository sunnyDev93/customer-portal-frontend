import React from 'react';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlanCategories from 'pages/SubscriptionRenewal/SelectPlan/components/PlanCategories';
import { PLAN_CATEGORIES } from 'pages/SubscriptionRenewal/SelectPlan/constants/plan-categories';

describe('PlanServiceItem', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('happy case', () => {
    it('should render normally', () => {
      render(<PlanCategories />);

      const categoryElements = screen.getAllByTestId('plan-category');

      expect(categoryElements).toHaveLength(PLAN_CATEGORIES.length);
    });
  });
});
