import React from 'react';

interface WarningProps {
  headTitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  actionButton?: string | React.ReactNode;
}

const Warning: React.FC<WarningProps> = ({ headTitle, description, actionButton }) => {
  return (
    <>
      <div className="bg-red-100 border-red-500 text-red-700 border shadow overflow-hidden sm:rounded-md mb-5">
        <ul className="divide-y divide-gray-200">
          <li>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center">
                <div className="flex items-center w-full space-x-4">
                  <div>
                    {headTitle && <p className=" font-bold mb-2">{headTitle}</p>}
                    <div className="flex items-center text-red-700 sm:mt-0">{description && <div className="">{description}</div>}</div>
                  </div>
                </div>
                <div className="ml-2 flex-shrink-0 flex mt-5 md:mt-0">
                  <div className="space-x-2 flex">{actionButton}</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Warning;
