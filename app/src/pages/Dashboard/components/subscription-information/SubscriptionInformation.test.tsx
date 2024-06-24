import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SubscriptionInformation from 'pages/Dashboard/components/subscription-information/SubscriptionInformation';
import { TestRoot } from 'config/test/react-query';

const mockPlanType = 'Pro - 12 month';
const mockPlanPrice = '33';
const mockDate = 'Oct 11, 2023';
const mockDayRemaining = '356';
const mockSpecialtyPests = ['Rodent Outdoor pest'];
describe('SubscriptionInformation component', () => {
  it(`should have head title`, () => {
    render(<SubscriptionInformation />, { wrapper: TestRoot });
    const element = screen.getByTestId('head-title');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('SUBSCRIPTION INFORMATION');
  });

  it(`should have Service Plan section`, () => {
    render(<SubscriptionInformation />, { wrapper: TestRoot });
    const element = screen.getByTestId('service-plan-section');
    expect(element).toBeInTheDocument();
  });

  it(`should have head title of service plan Service Plan`, () => {
    render(<SubscriptionInformation />, { wrapper: TestRoot });
    const element = screen.getByTestId('service-plan-title');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Service Plan');
  });

  it(`should have service plan type with value ${mockPlanType}`, () => {
    render(<SubscriptionInformation serviceType={mockPlanType} />, { wrapper: TestRoot });
    const element = screen.getByTestId('service-plan-type');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(mockPlanType);
  });

  it(`should have service plan price with value $${mockPlanPrice}/treatment`, () => {
    render(<SubscriptionInformation pricePerTreatment={mockPlanPrice} />, { wrapper: TestRoot });
    const element = screen.getByTestId('service-plan-price');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(`$${mockPlanPrice}/treatment`);
  });

  it(`should have Agreement Effective Date section`, () => {
    render(<SubscriptionInformation />, { wrapper: TestRoot });
    const element = screen.getByTestId('agreement-effective-date-section');
    expect(element).toBeInTheDocument();
  });

  it(`should have Agreement Effective Date title with content Agreement Effective Date`, () => {
    render(<SubscriptionInformation />, { wrapper: TestRoot });
    const element = screen.getByTestId('agreement-effective-date-title');
    expect(element).toHaveTextContent('Agreement Effective Date');
    expect(element).toBeInTheDocument();
  });

  it(`should have Agreement Effective Date value of ${mockDate}`, () => {
    render(<SubscriptionInformation />, { wrapper: TestRoot });
    const element = screen.getByTestId('agreement-effective-date-value');
    expect(element).toHaveTextContent(mockDate);
    expect(element).toBeInTheDocument();
  });

  it(`should have Specialty Pests section`, () => {
    render(<SubscriptionInformation />, { wrapper: TestRoot });
    const element = screen.getByTestId('specialty-pests-section');
    expect(element).toBeInTheDocument();
  });

  it(`should have button section to redirect to other page`, () => {
    render(<SubscriptionInformation />, { wrapper: TestRoot });
    const element = screen.getByTestId('button-section');
    expect(element).toBeInTheDocument();
  });

  it(`should have head title of Specialty Pests`, () => {
    render(<SubscriptionInformation />, { wrapper: TestRoot });
    const element = screen.getByTestId('specialty-pests-head');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Specialty Pests');
  });

  it(`should have Specialty Pests with value of ${mockSpecialtyPests}`, () => {
    render(<SubscriptionInformation specialtyPests={mockSpecialtyPests} />, { wrapper: TestRoot });
    const element = screen.getByTestId('specialty-pests-value');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(mockSpecialtyPests[0]);
  });

  it(`should have a question to ask user before redirect`, () => {
    render(<SubscriptionInformation specialtyPests={mockSpecialtyPests} />, { wrapper: TestRoot });
    const element = screen.getByTestId('redirec-question');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Did you know that we cover other pests at an additional cost?');
  });

  it(`should have a a button to redirect to another page`, () => {
    render(<SubscriptionInformation specialtyPests={mockSpecialtyPests} />, { wrapper: TestRoot });
    const element = screen.getByTestId('redirect-btn');
    expect(element).toBeInTheDocument();
  });
});
