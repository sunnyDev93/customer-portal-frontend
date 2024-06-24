import React, { Fragment } from 'react';
import Cookies from 'universal-cookie';
import classNames from 'classnames';

import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import useLogout from 'shared/hooks/useLogout';
import { formatName } from 'helpers/format';

const cookies = new Cookies();

interface User {
  accountId: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserDropdownProps {
  user?: User;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const { logout } = useLogout();

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            data-testid="dropdown-button"
            className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700"
          >
            <span data-testid="full-name-desktop" className="hidden lg:block fs-exclude text-left">
              {user?.firstName} {user?.lastName}
            </span>
            <span data-testid="full-name-mobile" className="block lg:hidden fs-exclude text-left">
              {formatName(user?.firstName)} {formatName(user?.lastName)}
            </span>
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <span
                    data-testid="logout-item"
                    onClick={logout}
                    className={classNames(
                      'cursor-pointer',
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Logout
                  </span>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default UserDropdown;
