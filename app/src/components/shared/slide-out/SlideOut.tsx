import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { CloseIcon } from 'components/shared/icons/CloseIcon';

interface SlideOutProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
  customChildContainerClass?: string;
}

const SlideOut: React.FC<SlideOutProps> = ({ children, isOpen = false, onClose, customChildContainerClass }) => {
  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <div className="fixed inset-0" />

          <div className="fixed left-0 overflow-hidden">
            <div className="absolute left-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-[-100vw]"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-[-100vw]"
                >
                  <Dialog.Panel className="pointer-events-auto w-[656px]">
                    <div className="flex h-[100vh] flex-col overflow-auto bg-white shadow-xl">
                      <div className="absolute w-full">
                        <div>
                          <button
                            style={{ outline: 'none', boxShadow: 'none' }}
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <div data-testid="slideout-close-icon" onClick={onClose} className="absolute right-[24px] top-[28px] bg-white">
                              <CloseIcon />
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="p-[24px]">{children}</div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default SlideOut;
