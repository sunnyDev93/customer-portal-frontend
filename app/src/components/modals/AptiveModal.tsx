import React, { Fragment } from 'react';
import classnames from 'classnames';
import { Dialog, Transition } from '@headlessui/react';
import Button from 'shared/components/Button';
import { useTrackingClick } from '../../shared/hooks/useTrackingClick';

export interface ModalTrackingInfo {
  name: string;
  buttonApproval: string;
  buttonCancel: string;
}

interface ModalProps {
  icon?: string;
  title?: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  approveButtonText?: string;
  approveButtonClassName?: string;
  cancelButtonText?: string;
  approveButtonColor: 'primary' | 'secondary' | 'muted' | 'danger';
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  isLoading: boolean;
  confirmCallback?: () => void;
  cancelCallback?: () => void;
  trackingInfo?: ModalTrackingInfo;
}

const AptiveModal: React.FC<ModalProps> = ({
  icon,
  title,
  subTitle,
  description,
  approveButtonText,
  approveButtonClassName,
  cancelButtonText = 'Cancel',
  approveButtonColor,
  isOpen,
  setOpen,
  isLoading,
  confirmCallback,
  cancelCallback,
  trackingInfo,
}: ModalProps) => {
  const { trackClick } = useTrackingClick();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          leaveFrom="opacity-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveTo="opacity-0"
          enter="ease-out duration-300"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              leave="ease-in duration-200"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              enter="ease-out duration-300"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      {icon && (
                        <div className="flex fonr-sm items-center">
                          <img src={icon} className="img-fluid mx-auto w-12" alt="" />
                        </div>
                      )}
                    </Dialog.Title>
                    <div className="mt-2">
                      {title && (
                        <p className="text-lg text-500 font-bold mt-6" data-testid="modal-title">
                          {title}
                          <br />
                        </p>
                      )}
                      {subTitle && <div className="mt-2">{subTitle}</div>}
                      {description && <div className="mt-2">{description}</div>}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-center items-center">
                  {approveButtonText && (
                    <div className={classnames(cancelButtonText ? `mr-1.5` : '', approveButtonClassName)}>
                      <Button
                        className="w-full"
                        type="button"
                        label={approveButtonText}
                        onClick={() => {
                          trackClick(`${trackingInfo?.buttonApproval}/from/${trackingInfo?.name}`);
                          confirmCallback && confirmCallback();
                        }}
                        color={approveButtonColor}
                        disabled={isLoading}
                      />
                    </div>
                  )}

                  {cancelButtonText && (
                    <div className={approveButtonText ? `ml-1.5` : ''}>
                      <Button
                        type="button"
                        label={isLoading ? 'Loading...' : cancelButtonText}
                        onClick={() => {
                          trackClick(`${trackingInfo?.buttonCancel}/from/${trackingInfo?.name}`);
                          setOpen(false);
                          cancelCallback && cancelCallback();
                        }}
                        color="muted"
                        disabled={isLoading}
                      />
                    </div>
                  )}
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
