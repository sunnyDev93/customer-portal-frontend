import React, { Fragment } from 'react';
import classNames from 'classnames';

import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useRecoilValue } from 'recoil';
import useSessionStorageState from 'use-session-storage-state';
import { aptiveUserState } from 'app-recoil/atoms/auth/aptive-user';
import { StringHelper } from 'helpers/string';
import { useTrackingClick } from '../shared/hooks/useTrackingClick';

interface AccountSwitcherProps {
  accounts: any;
}

const AccountSwitcher: React.FC<AccountSwitcherProps> = ({ accounts }) => {
  const aptiveUser = useRecoilValue(aptiveUserState);
  const { trackClick } = useTrackingClick();

  const [aptiveUserIndex, setAptiveUserIndex] = useSessionStorageState<number>('aptiveUserIndex', { defaultValue: 0 });

  const addresses = accounts.map((account: any) => {
    const address = account.attributes.address;

    return {
      address1: address.address,
      address2: StringHelper.formatAddress(address.address, address.city, address.state, address.zip),
      id: account.id,
      data: account,
    };
  });

  const switchAccount = (index: number) => {
    if (aptiveUserIndex !== index) {
      trackClick('switch', 'account');
      setAptiveUserIndex(index);
      window.location.href = '/dashboard';
    }
  };

  const selectedAddress = addresses?.find((address: any) => address.id === aptiveUser?.accountId);

  if (!selectedAddress) {
    return <></>;
  }

  return (
    <>
      <Menu as="div" className="relative inline-block text-left ">
        <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50  focus:ring-blue-600 fs-exclude">
            <span className="overflow-hidden line-clamp-1 text-left max-w-[145px]">
              {selectedAddress.address1 ? selectedAddress.address1 : selectedAddress.address2}
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
          <Menu.Items className="z-50 origin-top-right absolute md:right-0 right-[50%] mt-2 md:translate-x-0 translate-x-[50%] w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
            {addresses.map((address: any, index: number) => (
              <div className="py-1" key={index}>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => switchAccount(index)}
                      className={classNames(
                        active ? 'text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm w-full text-left fs-exclude'
                      )}
                    >
                      {address.address2}
                    </button>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default AccountSwitcher;
