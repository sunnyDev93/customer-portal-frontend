import React from 'react';
import { toDollars } from '../helpers';

interface BalanceProps {
  userData: any;
}

const DashboardCreditBalance: React.FC<BalanceProps> = ({ userData }: BalanceProps) => {
  return (
    <>
      {userData?.balance > 0 && (
        <div
          data-testid="dashboard-credit-balance"
          className="bg-red-100 border-red-500 text-red-700 border shadow overflow-hidden sm:rounded-md mb-5"
        >
          <ul className="divide-y divide-gray-200">
            <li>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center">
                  <div className="flex items-center w-full space-x-4">
                    <div>
                      <p className=" font-bold mb-2">Past Due Balance</p>
                      <div className="flex items-center text-red-700 sm:mt-0">
                        <div className="">
                          Your account has a past due balance of{' '}
                          <span data-testid="balance" className="font-bold">
                            {toDollars(userData.balance)}.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-2 flex-shrink-0 flex">
                    <div className="space-x-2 flex"></div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default DashboardCreditBalance;
