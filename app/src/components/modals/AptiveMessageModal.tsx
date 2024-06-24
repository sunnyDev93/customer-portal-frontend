import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from 'shared/components/Button';
import { ModalTrackingInfo } from './AptiveModal';
import { useTrackingClick } from '../../shared/hooks/useTrackingClick';

interface ModalProps {
  icon?: string;
  title: string;
  subTitle?: string;
  description?: any;
  approveButtonText: string;
  approveButtonColor: 'primary' | 'secondary' | 'muted' | 'danger';
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  confirmCallback: () => void;
  isLoading?: boolean;
  trackingInfo?: ModalTrackingInfo;
}

const AptiveModal: React.FC<ModalProps> = ({
  icon,
  title,
  subTitle,
  description,
  approveButtonText,
  approveButtonColor,
  isOpen,
  setOpen,
  confirmCallback,
  isLoading,
  trackingInfo,
}: ModalProps) => {
  const { trackClick } = useTrackingClick();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enterFrom="opacity-0"
          leaveFrom="opacity-100"
          leave="ease-in duration-200"
          enterTo="opacity-100"
          enter="ease-out duration-300"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto z-10">
          <div className="flex min-h-full justify-center items-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              leave="ease-in duration-200"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              enter="ease-out duration-300"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      {icon && (
                        <div className="flex fonr-sm items-center">
                          <img src={icon} className="img-fluid mx-auto w-24" alt="" />
                        </div>
                      )}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-lg font-bold mt-6 text-500">{title}</p>
                      {subTitle && <div className="mt-2">{subTitle}</div>}
                      {description && <div className="mt-2">{description}</div>}
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 grid grid-flow-row-dense grid-cols-1 gap-3">
                  <Button
                    label={isLoading ? 'Loading...' : approveButtonText}
                    type="button"
                    color={approveButtonColor}
                    onClick={() => {
                      trackClick(`${trackingInfo?.buttonApproval}/from/${trackingInfo?.name}`);
                      confirmCallback && confirmCallback();
                    }}
                    disabled={isLoading}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AptiveModal;
