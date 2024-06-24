import React, { useMemo, useState } from 'react';
import { AxiosError } from 'axios';
import classNames from 'classnames';
import AptiveModal from 'components/modals/AptiveModal';
import InfoIcon from 'images/info-icon.png';
import { useRemovePaymentProfile } from 'pages/PaymentSettings/hooks/useRemovePaymentProfile';
import Button from 'shared/components/Button';
import { useTrackingClick } from 'shared/hooks/useTrackingClick';
import { getPaymentMethodAvatar, getPaymentMethodType } from 'utils/TypeToImageUtils';

export type PaymentMethodProps = {
  id: string;
  accountId: string;
  bankName: string;
  isAutoPay: boolean;
  isExpired: boolean;
  lastFour: string;
  paymentMethodType: string; // CC or ACH
  accountType: string; // if it is ACH --> checking, saving
  cardType: string; // if it is CC --> visa, AE, Discover, etc
};
interface PaymentMethodItemProps {
  paymentMethod: PaymentMethodProps;
  onError: (err: AxiosError) => void;
  isSelectionEnabled: boolean;
  showButtons: boolean;
  onSelectPaymentMethod: (selectedPaymentMethod: PaymentMethodProps) => void;
  selectedPaymentMethod?: any;
}

export const PaymentMethodItem = ({
  paymentMethod,
  onError,
  isSelectionEnabled,
  showButtons,
  onSelectPaymentMethod,
  selectedPaymentMethod,
}: PaymentMethodItemProps) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const { isLoading, removePaymentProfileMutate } = useRemovePaymentProfile();
  const { trackClick } = useTrackingClick();

  const title = useMemo(
    () => (
      <>
        Are you sure you want to remove payment method ending in <span className="fs-exclude">{paymentMethod.lastFour}</span>?
      </>
    ),
    [paymentMethod.lastFour]
  );

  const showModal = () => {
    trackClick('payment_method_remove/from/methods');
    setIsShowModal(true);
  };

  const removePaymentProfile = () => {
    removePaymentProfileMutate(
      { accountId: paymentMethod.accountId, paymentProfileId: paymentMethod.id },
      {
        onSettled: () => setIsShowModal(false),
        onError,
      }
    );
  };

  return (
    <>
      <li>
        <div className="flex-col lg:flex-row w-full flex p-4 lg:items-center justify-between">
          <div className="w-auto lg:mb-0 mb-4">
            <div className="w-full flex items-center">
              {isSelectionEnabled && (
                <input
                  id={paymentMethod.id}
                  data-testid={paymentMethod.id}
                  type="radio"
                  className="w-4 h-4 mt-1 p-2"
                  name="payment_profile"
                  onChange={() => {
                    onSelectPaymentMethod(paymentMethod);
                  }}
                  disabled={paymentMethod.isExpired}
                  value={paymentMethod.id}
                  onClick={() => trackClick('choose_payment_method/from/methods')}
                  checked={selectedPaymentMethod?.id === paymentMethod.id}
                />
              )}
              <img src={getPaymentMethodAvatar(paymentMethod)} className="img-fluid mr-2 ml-4 w-[70px] h-[41px]" alt="" />

              <div className="text-sm ml-3">
                <div className="text-gray-900 text-base leading-tight">{paymentMethod.bankName}</div>
                <div
                  className={classNames('text-gray-500 text-sm leading-tight', paymentMethod.isExpired && 'text-red-500')}
                  data-testid="card-number"
                >
                  {getPaymentMethodType(paymentMethod)} - ****** <span className="fs-exclude">{paymentMethod.lastFour}</span>
                </div>
              </div>
            </div>
          </div>

          {paymentMethod.isExpired && (
            <div className="w-full lg:w-1/3 flex justify-start lg:justify-end lg:mb-0 mb-4">
              <label className="text-base text-red-500">Card Expired. Please Edit.</label>
            </div>
          )}

          <div className="w-full lg:w-1/3 flex items-center justify-center lg:justify-end">
            {/*<Button className="mr-4" label="Edit" type="button" color="muted" />*/}
            {showButtons && <Button disabled={paymentMethod.isAutoPay} label="Remove" type="button" color="muted" onClick={showModal} />}
          </div>
        </div>
      </li>

      <AptiveModal
        icon={InfoIcon}
        title={title}
        description={paymentMethod?.bankName}
        approveButtonText="Delete Payment Method"
        approveButtonColor="danger"
        isOpen={isShowModal}
        setOpen={setIsShowModal}
        isLoading={isLoading}
        confirmCallback={removePaymentProfile}
      />
    </>
  );
};
