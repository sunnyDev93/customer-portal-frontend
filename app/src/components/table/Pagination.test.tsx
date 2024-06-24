import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination';

const mockFields = [
  {
    key: '1',
    heading: 'test1',
    link: 'test',
    downloadable: true,
    className: 'test',
    headerClassName: 'test',
    itemClassName: 'test',
    itemShouldRender: (item: any) => {},
    headerShouldRender: () => {},
  },
  {
    key: '2',
    heading: 'test2',
    link: 'test',
    downloadable: true,
    className: 'test',
    headerClassName: 'test',
    itemClassName: 'test',
    itemShouldRender: (item: any) => {},
    headerShouldRender: () => {},
  },
  {
    key: '3',
    heading: 'test3',
    link: 'test',
    downloadable: true,
    className: 'test',
    headerClassName: 'test',
    itemClassName: 'test',
    itemShouldRender: (item: any) => {},
    headerShouldRender: () => {},
  },
];

const mockData = [
  {
    id: '1',
    type: 'test',
    officeId: 1,
    customerId: 1,
    dateAdded: '2012-12-12',
    addedBy: 1,
    showCustomer: true,
    showTech: true,
    appointmentId: 1,
    prefix: 'test',
    description: 'test',
    formDescription: 'test',
    documentLink: 'test',
  },
];
const mockPageChange = jest.fn();
const mockSetPerPage = jest.fn();
describe('Pagination component', () => {
  it(`should have Pagination component`, async () => {
    render(
      <Pagination onPageChange={mockPageChange} totalCount={10} siblingCount={1} currentPage={1} perPage={8} setPerPage={mockSetPerPage} />
    );
    const com = screen.queryByTestId('pagination-com');
    expect(com).toBeInTheDocument();
  });
  it(`should have Total Record component`, async () => {
    render(
      <Pagination onPageChange={mockPageChange} totalCount={10} siblingCount={1} currentPage={1} perPage={8} setPerPage={mockSetPerPage} />
    );
    const com = screen.queryByTestId('total-record-coms');
    expect(com).toBeInTheDocument();
  });
});
