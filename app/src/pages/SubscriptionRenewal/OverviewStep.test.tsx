import React from 'react';

import { render, screen } from '@testing-library/react';
import OverviewStep, { TAX_RATE } from './OverviewStep';
import '@testing-library/jest-dom';
import useSelectSubscriptionPlan from './hooks/useSelectSubscriptionPlan';
import useAdditionalServices from './hooks/useAdditionalServices';
import { mockPlanList } from '../../mocks/responseMocks';
import { TestRoot } from '../../config/test/react-query';
import { formatCurrency } from '../../helpers/format';
import { PlanAddon, PlanServiceStatus } from '../../types/plan';

jest.mock('./hooks/useSelectSubscriptionPlan');
jest.mock('./hooks/useAdditionalServices');

const selectedPlan = mockPlanList[2];

const addon: PlanAddon = {
  id: '7',
  name: 'Mosquito',
  description: '$199 initial & $99 / per service',
  status: PlanServiceStatus.Enable,
  price: 99,
  initialTreatmentPrice: 199,
  iconName: 'wasp-traps',
  addonId: '12',
};

const additionalServices: PlanAddon[] = [addon];

describe('OverviewStep component', () => {
  beforeEach(() => {
    (useSelectSubscriptionPlan as jest.Mock).mockReturnValue({
      selectedPlan: selectedPlan,
    });
    (useAdditionalServices as jest.Mock).mockReturnValue({
      additionalServices,
    });
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });
  const setup = () =>
    render(<OverviewStep />, {
      wrapper: TestRoot,
    });

  it('Should have title: Overview', () => {
    setup();
    const element = screen.getByTestId('sr-overview-title');
    expect(element).toHaveTextContent('Overview');
  });

  it('Should have SubscriptionInfo component', () => {
    setup();
    const element = screen.getByTestId('sr-overview-SubscriptionInfo');
    expect(element).toBeInTheDocument();
  });

  it('Should have summary with title Subscription Summary', () => {
    setup();
    const element = screen.getByTestId('sr-overview-summary-title');
    expect(element).toHaveTextContent(`Subscription Summary`);
  });

  it('Should have plan title with content Plan', () => {
    setup();
    const element = screen.getByTestId('sr-overview-plan-title');
    expect(element).toHaveTextContent(`Plan:`);
  });

  it(`Should have plan value with content ${selectedPlan.name}`, () => {
    setup();
    const element = screen.getByTestId('sr-overview-plan-value');
    expect(element).toHaveTextContent(`${selectedPlan.name}`);
    expect(screen.getByTestId('sr-overview-plan-price')).toHaveTextContent(`${formatCurrency(selectedPlan?.pricePerService || 0)} per treatment`);
  });

  it(`Should show additional services normally`, () => {
    setup();
    const element = screen.getByTestId('sr-overview-Specialty-Pests-value');
    expect(element).toHaveTextContent(additionalServices[0].name);
    expect(screen.getByTestId('sr-overview-Specialty-Pests-price')).toHaveTextContent(`${formatCurrency(addon.recurringPrice || 0)} per treatment`);
  });

   it(`Should calculate and show total correctly`, () => {
     setup();
     const subTotal = selectedPlan.pricePerService + (addon.initialTreatmentPrice || 0);
     const tax = subTotal * TAX_RATE;
     const total = subTotal + tax;

     expect(screen.getByTestId('sr-overview-sub-total-value')).toHaveTextContent(formatCurrency(subTotal));
     expect(screen.getByTestId('sr-overview-tax-value')).toHaveTextContent(formatCurrency(tax));
     expect(screen.getByTestId('sr-overview-total-due-value')).toHaveTextContent(formatCurrency(total));
   });
});
