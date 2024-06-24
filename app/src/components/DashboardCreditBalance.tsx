import React from 'react';
import { toDollars } from '../helpers';

interface CreditBalanceProps {
  userData: any;
}

const DashboardCreditBalance: React.FC<CreditBalanceProps> = ({ userData }: CreditBalanceProps) => {
  return (
    <>
      {userData && userData?.responsibleBalance < 0 && (
        <div data-testid="dashboard-credit-balance-1" className="bg-white shadow overflow-hidden sm:rounded-md mb-5">
          <ul className="divide-y divide-gray-200">
            <li>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center">
                  <div className="flex items-center w-full space-x-4">
                    <div>
                      <p className=" font-bold mb-2">Credit Balance</p>
                      <div className="flex items-center text-gray-700 sm:mt-0">
                        <div className="">
                          <span data-testid="dashboard-balance-1" className="font-bold text-2xl">
                            {toDollars(userData.responsibleBalance)}
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
