import React from 'react';

interface SendLinkButton {
  label: string;
  onClick: () => void;
}

const SendLinkButton: React.FC<SendLinkButton> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aptive-900 hover:bg-aptive-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aptive-900 p-2 lg:px-4 block text-center w-full"
      type="button"
    >
      {label}
    </button>
  );
};

export default SendLinkButton;
