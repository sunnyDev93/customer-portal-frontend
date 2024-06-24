import React from 'react';

import { render, screen } from '@testing-library/react';
import ServicePreviewCard from './ServicePreviewCard';
import '@testing-library/jest-dom';

const defaultData = {
  serviceImage: 'https://i.ibb.co/nCGxM1C/image-1.png',
  name: 'test name',
  price: 'test name',
  des: 'test des',
  serviceDate: 'test des',
};

const fixedConfig = {};

const isElementExistedWithContent = (id: string, content: string) => {
  const element = screen.getByTestId(id);
  expect(element).toBeTruthy();
  expect(element).toHaveTextContent(content);
};

describe('ServicePreviewCard', () => {
  const setup = (props: any) => render(<ServicePreviewCard {...props} />);
  it('Should have service image', () => {
    setup(defaultData);
    const element = screen.getByTestId('service-image');
    expect(element).toHaveAttribute('src', defaultData.serviceImage);
  });
  it('Should have service name', () => {
    setup(defaultData);
    isElementExistedWithContent('service-name', defaultData.name);
  });
  it('Should have service price', () => {
    setup(defaultData);
    isElementExistedWithContent('service-price', defaultData.price);
  });
  it('Should have service des', () => {
    setup(defaultData);
    isElementExistedWithContent('service-des', defaultData.des);
  });
  it('Should have service date', () => {
    setup(defaultData);
    isElementExistedWithContent('service-date', defaultData.serviceDate);
  });
});
