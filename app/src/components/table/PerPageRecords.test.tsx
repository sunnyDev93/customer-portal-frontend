import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PerPageRecords from './PerPageRecords';

const mockPageChange = jest.fn();
const mockSetPerPage = jest.fn();
describe('PerPageRecords component', () => {
  it(`should have PerPageRecords component`, async () => {
    render(<PerPageRecords perPage={8} setPerPage={mockSetPerPage} onPageChange={mockPageChange} />);
    const com = screen.queryAllByTestId('record-items');
    expect(com).toHaveLength(10);
  });

  it(`should have select record have default value of 10 component`, async () => {
    render(<PerPageRecords perPage={8} setPerPage={mockSetPerPage} onPageChange={mockPageChange} />);
    const com = screen.queryByTestId('select-record');
    expect(com).toHaveValue('10');
  });
});
