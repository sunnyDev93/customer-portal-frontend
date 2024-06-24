import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddressDropdown from './AddressDropdown';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockSetShowForm = jest.fn();
const mockAddresses = [
  {
    id: '0',
    address1: 'address1',
    address2: 'address2',
  },
  {
    id: '1',
    address1: 'address1',
    address2: 'address2',
  },
  {
    id: '2',
    address1: 'address1',
    address2: 'address2',
  },
  {
    id: '3',
    address1: 'address1',
    address2: 'address2',
  },
];
describe('AddressDropdown component', () => {
  it('should always the address 1 name of the first array item displayed', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <AddressDropdown addresses={mockAddresses} />
        </BrowserRouter>
      </RecoilRoot>
    );

    expect(screen.getByText(`${mockAddresses[0].address1}`)).toBeInTheDocument();
  });

  it(`should have list of ${mockAddresses.length} address in the dropdown when clicking the dropdown`, async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <AddressDropdown addresses={mockAddresses} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const head = screen.getByTestId('head');
    userEvent.click(head);

    await waitFor(() => {
      const addressItems = screen.queryAllByTestId('address-item');
      expect(addressItems.length).toBe(mockAddresses.length);
    });
  });
});
