import React from 'react';

import { render, screen } from '@testing-library/react';
import AdditionalServicesStep from 'pages/SubscriptionRenewal/AdditionalServicesStep/AdditionalServicesStep';
import '@testing-library/jest-dom';
import { TestRoot } from 'config/test/react-query';

const propsValue = {};

describe('AdditionalServicesStep component', () => {
  const setup = (props: any) => render(<AdditionalServicesStep {...props} />, { wrapper: TestRoot });

  it('Should have title: Select additional services (optional)', () => {
    setup(propsValue);
    const element = screen.getByTestId('as-page-title');
    expect(element).toHaveTextContent('Select additional services (optional)');
  });

  it('Should have guidance text: All plans come with the following ...', () => {
    setup(propsValue);
    const element = screen.getByTestId('as-guidance');
    expect(element).toHaveTextContent('All plans come with the following ...');
  });

  it('Should have guidance text: All plans come with the following ...', () => {
    setup(propsValue);
    const element = screen.getByTestId('as-guidance');
    expect(element).toHaveTextContent('All plans come with the following ...');
  });

  it('Should have Subscription Infomation component', () => {
    setup(propsValue);
    const element = screen.getByTestId('as-sub-info');
    expect(element).toBeInTheDocument();
  });

  // it('Should have Outdoor wasp traps block', () => {
  //   setup(propsValue);
  //   const element = screen.getByTestId('as-outdoor-traps');
  //   expect(element).toBeInTheDocument();
  // });

  // it('Should have  Fleas & Ticks block', () => {
  //   setup(propsValue);
  //   const element = screen.getByTestId('as-flea-ticks');
  //   expect(element).toBeInTheDocument();
  // });

  // it('Should have Indoor Fly Traps block', () => {
  //   setup(propsValue);
  //   const element = screen.getByTestId('as-indoor-traps');
  //   expect(element).toBeInTheDocument();
  // });

  // it('Should have Pantry Pests block', () => {
  //   setup(propsValue);
  //   const element = screen.getByTestId('as-pantry-pests');
  //   expect(element).toBeInTheDocument();
  // });

  // it('Should have Rodents (exterior) block', () => {
  //   setup(propsValue);
  //   const element = screen.getByTestId('as-rodents');
  //   expect(element).toBeInTheDocument();
  // });

  // it('Should have Snails/Slugs/Aphids block', () => {
  //   setup(propsValue);
  //   const element = screen.getByTestId('as-Snails');
  //   expect(element).toBeInTheDocument();
  // });

  // it('Should have Mosquito block', () => {
  //   setup(propsValue);
  //   const element = screen.getByTestId('as-Mosquito');
  //   expect(element).toBeInTheDocument();
  // });

  // it('Should have German Cockroach block', () => {
  //   setup(propsValue);
  //   const element = screen.getByTestId('as-Cockroach');
  //   expect(element).toBeInTheDocument();
  // });
});
