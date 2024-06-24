import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserDropdown from './UserDropdown';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

const testUser = {
  accountId: '1122343',
  firstName: 'Cuong',
  lastName: 'Hoang',
  email: 'cuonghv91@gmail.com',
};

describe('UserDropdown component', () => {
  it(`should display first name and last name version in desktop or big device`, async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <UserDropdown user={testUser} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const fullNameDesktop = screen.queryByTestId('full-name-desktop');
    expect(fullNameDesktop).toHaveClass('hidden lg:block');
  });

  it(`should display first name and last name version in mobile`, async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <UserDropdown user={testUser} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const fullNameMobile = screen.queryByTestId('full-name-mobile');
    expect(fullNameMobile).toHaveClass('block lg:hidden');
  });

  it(`should display full name in all device`, async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <UserDropdown user={testUser} />
        </BrowserRouter>
      </RecoilRoot>
    );
    const fullNameDesktop = screen.queryByTestId('full-name-desktop');
    const fullNameMobile = screen.queryByTestId('full-name-mobile');
    expect(fullNameDesktop).toHaveTextContent(`${testUser.firstName} ${testUser.lastName}`);
    expect(fullNameMobile).toHaveTextContent(`${testUser.firstName} ${testUser.lastName}`);
  });

  it(`should show the log out bar when we click full name button`, async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <UserDropdown user={testUser} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const dropdownButton = screen.getByTestId('dropdown-button');
    fireEvent.click(dropdownButton);

    await waitFor(() => {
      const dropdownButton = screen.getByTestId('dropdown-button');
      fireEvent.click(dropdownButton);
      const logoutItem = screen.getByTestId('logout-item');
      expect(logoutItem).toBeInTheDocument();
    });
  });
});
