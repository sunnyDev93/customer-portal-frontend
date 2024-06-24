import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'shared/components/Button';
import { PaymentMethodItem, PaymentMethodProps } from 'components/PaymentMethodItem';
import { useTrackingClick } from 'shared/hooks/useTrackingClick';
import classNames from 'classnames';
import { AxiosError } from 'axios';

interface PaymentMethodsProps {
  className?: string;
  paymentMethods: PaymentMethodProps[];
  onSelectPaymentMethod?: (paymentMethod: PaymentMethodProps) => void;
  isSelectionEnabled: boolean;
  showButtons: boolean;
  onError?: (err: AxiosError) => void;
  selectedPaymentMethod?: any;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  className,
  paymentMethods,
  onSelectPaymentMethod,
  isSelectionEnabled,
  showButtons,
  onError,
  selectedPaymentMethod,
}) => {
  const { trackClick } = useTrackingClick();

  if (!paymentMethods || paymentMethods.length === 0) {
    return <div className="text-slate-400 font-light text-sm text-center mt-2">Please add a new payment method to make a payment.</div>;
  }

  return (
    <div className={classNames('bg-white shadow overflow-hidden', className)}>
      <ul className="divide-y divide-gray-200">
        <li key="Payment Methods">
          <div className="px-4 py-6 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="space-y-1">
                <p className="text-[16px] font-medium">Payment Methods</p>
                {showButtons && <p className="flex text-[14px] items-center text-gray-500 sm:mt-0">Add or remove payment methods</p>}
              </div>

              <div className="ml-0 md:ml-2 flex-shrink-0 flex mt-5 sm:mt-0">
                <div className="space-x-2 flex">
                  <Link to="/billing/add-payment-methods">
                    <Button
                      label="Add a Payment Method"
                      type="button"
                      color="muted"
                      onClick={() => {
                        trackClick('payment_method_add/from/methods');
                      }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </li>

        {paymentMethods?.map(method => (
          <PaymentMethodItem
            key={method.id}
            paymentMethod={method}
            onSelectPaymentMethod={(selectedPaymentMethod: PaymentMethodProps) => onSelectPaymentMethod?.(selectedPaymentMethod)}
            isSelectionEnabled={isSelectionEnabled}
            onError={(error: AxiosError) => onError?.(error)}
            showButtons={showButtons}
            selectedPaymentMethod={selectedPaymentMethod}
          />
        ))}
      </ul>
    </div>
  );
};

export default PaymentMethods;
