import React from 'react';

import { render, screen } from '@testing-library/react';
import SubscriptionInfo from 'pages/SubscriptionRenewal/shared/components/SubscriptionInfo';
import '@testing-library/jest-dom';
import { mockPlanList } from 'mocks/responseMocks';

const selectedPlan = mockPlanList[2];

describe('SubscriptionInfo component', () => {
  it('Should render label normally', () => {
    render(<SubscriptionInfo selectedPlan={selectedPlan} />);
    const element = screen.getByTestId('si-title');
    expect(element).toHaveTextContent('SUBSCRIPTION INFORMATION');
    expect(screen.getByText('Service Plan')).toBeInTheDocument();
  });

  it('Should render selectedPlan normally', () => {
    render(<SubscriptionInfo selectedPlan={selectedPlan} />);
    expect(screen.getByTestId('si-plan-name')).toHaveTextContent(selectedPlan.name);
    expect(screen.getByTestId('si-service-plan-period')).toHaveTextContent(`${selectedPlan?.name} - ${selectedPlan?.agreementLength}`);
    expect(screen.getByTestId('si-service-plan-price')).toHaveTextContent(`$${selectedPlan?.pricePerService}/treatment`);
  });

  it('Should not render Specialty pets', () => {
    render(<SubscriptionInfo selectedPlan={selectedPlan} />);
    expect(screen.queryByTestId('si-service-specialty-pests-title')).not.toBeInTheDocument();
  });

  it('Should render Specialty pets normally', () => {
    render(<SubscriptionInfo selectedPlan={selectedPlan} showSpecialtyPests />);
    expect(screen.queryByTestId('si-service-specialty-pests-title')).not.toBeInTheDocument();
  });
  it('Should render title normally', () => {
    render(<SubscriptionInfo selectedPlan={selectedPlan} title="Title" />);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });
});
