import React, { PropsWithChildren } from 'react';

export type MessageBoxAttributes = {
  title: string;
  subTitle: string;
  class: MessageBoxTypes;
};

export enum MessageBoxTypes {
  primary = 'bg-white-100 border-white-500 text-white-700 border shadow overflow-hidden sm:rounded-md mb-5',
  secondary = 'bg-gray-100 border-red-500 text-gray-700 border shadow overflow-hidden sm:rounded-md mb-5',
  muted = 'bg-gray-100 border-gray-500 text-gray-700 border shadow overflow-hidden sm:rounded-md mb-5',
  danger = 'bg-red-100 border-red-500 text-red-700 border shadow overflow-hidden sm:rounded-md mb-5',
}

interface MessageBoxProps {
  title: string;
  subtitle?: string | React.ReactNode;
  className?: MessageBoxTypes;
}

const MessageBox: React.FC<PropsWithChildren<MessageBoxProps>> = ({ title = '', subtitle = '', className = MessageBoxTypes.primary }) => {
  return (
    <div data-testid="message-box" className={className}>
      <ul className="divide-y divide-gray-200">
        <li>
          <div className="px-4 py-6 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="space-y-1">
                <p className="text-xl font-medium" data-testid="title">
                  {title}
                </p>
                {subtitle && (
                  <p data-testid="subtitle" className="flex items-center text-gray-500 sm:mt-0">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MessageBox;
