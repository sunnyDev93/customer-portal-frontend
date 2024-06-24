import React from 'react';
import AptiveModal from 'components/modals/AptiveModal';

const WarningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="23.5" fill="#FDE8E8" stroke="#EE0022" />
    <path
      d="M24 20V24M24 28H24.01M33 24C33 28.9706 28.9706 33 24 33C19.0294 33 15 28.9706 15 24C15 19.0294 19.0294 15 24 15C28.9706 15 33 19.0294 33 24Z"
      stroke="#EE0022"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
type Props = {
  isOpen: boolean;
  onClose: () => void;
};
const UnavailableSpotModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const renderContent = () => (
    <div className="flex items-center flex-col ">
      <WarningIcon />

      <div className="title mt-6 mb-2 font-medium text-lg">Oops, that appointment isn’t available</div>

      <div className="message">
        The appointment spot you’ve attempted to schedule is no longer available. Please attempt to schedule another appointment or contact
        our scheduling team by phone at{' '}
        <a className="text-aptive-link" href="tel:1-855-BUG-FREE">
          1-855-BUG-FREE
        </a>
        .
      </div>
    </div>
  );
  return (
    <AptiveModal
      description={renderContent()}
      approveButtonText="Schedule another appointment"
      approveButtonColor="primary"
      approveButtonClassName="w-full"
      isOpen={isOpen}
      setOpen={onClose}
      isLoading={false}
      confirmCallback={onClose}
      cancelButtonText={''}
    />
  );
};

export default UnavailableSpotModal;
