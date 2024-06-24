import React, { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataTable from './DataTable';
import { DataTableFieldType } from 'types';

const mockFields: DataTableFieldType[] = [
  {
    key: '1',
    heading: 'test1',
    link: 'test',
    downloadable: true,
    className: 'test',
    headerClassName: 'test',
    itemClassName: 'test',
    itemShouldRender: (item: any) => <></>,
    headerShouldRender: () => <></>,
  },
  {
    key: '2',
    heading: 'test2',
    link: 'test',
    downloadable: true,
    className: 'test',
    headerClassName: 'test',
    itemClassName: 'test',
    itemShouldRender: (item: any) => <></>,
    headerShouldRender: () => <></>,
  },
  {
    key: '3',
    heading: 'test3',
    link: 'test',
    downloadable: true,
    className: 'test',
    headerClassName: 'test',
    itemClassName: 'test',
    itemShouldRender: (item: any) => <></>,
    headerShouldRender: () => <></>,
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

describe('DataTable component', () => {
  it(`should have DataTable component`, async () => {
    render(<DataTable fields={mockFields} />);
    const dataTable = screen.queryByTestId('data-table');
    expect(dataTable).toBeInTheDocument();
  });
  it(`should have ${mockFields.length} items rendered`, async () => {
    render(<DataTable fields={mockFields} />);
    const dataTable = screen.getAllByTestId('field-item');
    expect(dataTable).toHaveLength(mockFields.length);
  });

  it(`should have current table data rendered`, async () => {
    render(<DataTable fields={mockFields} data={mockData} />);
    const dataTable = screen.queryByTestId('current-table');
    expect(dataTable).toBeInTheDocument();
  });
  it(`should have NOT current table data rendered if there is no field data`, async () => {
    render(<DataTable data={mockData} />);
    const dataTable = screen.queryByTestId('current-table');
    expect(dataTable).toBeInTheDocument();
  });
  it(`should have current data items render `, async () => {
    render(<DataTable fields={mockFields} data={mockData} />);
    const data = screen.getAllByTestId('data-table-item');
    expect(data.length).toBe(3);
  });

  it(`should have pagination render `, async () => {
    render(<DataTable fields={mockFields} data={mockData} />);
    const data = screen.queryByTestId('pagination-table');
    expect(data).toBeInTheDocument();
  });

  it(`should have NOT pagination render if there is no data`, async () => {
    render(<DataTable fields={mockFields} />);
    const data = screen.queryByTestId('pagination-table');
    expect(data).not.toBeInTheDocument();
  });
});
