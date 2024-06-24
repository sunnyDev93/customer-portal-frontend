import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import Button from 'shared/components/Button';
import { toDollars } from 'helpers';
import { formatPhoneNumber } from 'helpers/format';
import { useTrackingClick } from 'shared/hooks/useTrackingClick';
import { useRecoilValue } from 'recoil';
import { customerInfoDataState } from 'app-recoil/atoms/customer-info';
import { useFeatureFlag } from 'configcat-react';

interface InvoiceInfomationProps {
  customerName?: string;
  customerID?: string;
  customerAddress?: string;
  customerPhone?: string;
  customerDateTimeService?: string;
  subtotal?: string;
  saleTax?: string;
  total?: string;
  customerState?: string;
  isMakePayment?: boolean;
  isPayable?: boolean;
  isOnMonthlyBilling?: boolean;
}

export const InvoiceInformation: React.FC<PropsWithChildren<InvoiceInfomationProps>> = ({
  customerName,
  customerID,
  customerAddress,
  customerPhone,
  customerDateTimeService,
  subtotal,
  saleTax,
  total,
  isMakePayment,
  customerState,
  isPayable,
  isOnMonthlyBilling,
}) => {
  const { value: isMonthlyBillingEnabled } = useFeatureFlag('isMonthlyBillingEnabled', false);
  const { trackClick } = useTrackingClick();

  const invoiceStatus = isPayable ? isMakePayment ? <span className="text-red-500">Payment Due</span> : 'AutoPay is enabled' : ' Paid';

  return (
    <>
      <div className="flex justify-between items-center border-b border-gray-300 md:pb-6 md:pt-6 md:pl-8 md:pr-8 pt-6 pb-4 pr-[16px] pl-[16px]">
        <h3 className="lg:w-1/3 text-gray-500 text-font-14px leading-16px font-medium" data-testid="customer-name-title">
          Customer Name
        </h3>
        <div className="lg:w-2/3 text-gray-900 text-font-14px leading-16px font-medium fs-exclude" data-testid="customer-name-value">
          {customerName}
        </div>
      </div>
      <div className="flex justify-between items-center border-b border-gray-300 md:pb-6 md:pt-6 md:pl-8 md:pr-8 pt-6 pb-4 pr-[16px] pl-[16px]">
        <h3 className="lg:w-1/3 text-gray-500 text-font-14px leading-16px font-medium" data-testid="customer-id-title">
          Customer ID
        </h3>
        <div className="lg:w-2/3 text-gray-900 text-font-14px leading-16px font-medium fs-exclude" data-testid="customer-id-value">
          {customerID}
        </div>
      </div>
      <div className="flex justify-between items-center border-b border-gray-300 md:pb-6 md:pt-6 md:pl-8 md:pr-8 pt-6 pb-4 pr-[16px] pl-[16px]">
        <h3 className="lg:w-1/3 text-gray-500 text-font-14px leading-16px font-medium" data-testid="customer-address-title">
          Customer Address
        </h3>
        <div className="lg:w-2/3 text-gray-900 text-font-14px leading-16px font-medium fs-exclude" data-testid="customer-address-value">
          {customerAddress}
        </div>
      </div>
      <div className="flex justify-between items-center border-b border-gray-300 md:pb-6 md:pt-6 md:pl-8 md:pr-8 pt-6 pb-4 pr-[16px] pl-[16px]">
        <h3 className="lg:w-1/3 text-gray-500 text-font-14px leading-16px font-medium" data-testid="customer-phone-title">
          Customer Phone
        </h3>
        {customerPhone && (
          <div className="lg:w-2/3 text-gray-900 text-font-14px leading-16px font-medium fs-exclude" data-testid="customer-phone-value">
            {formatPhoneNumber(customerPhone)}
          </div>
        )}
      </div>
      {(!isMonthlyBillingEnabled || (isMonthlyBillingEnabled && !isOnMonthlyBilling)) && (
        <div className="flex justify-between items-center border-b border-gray-300 md:pb-6 md:pt-6 md:pl-8 md:pr-8 pt-6 pb-4 pr-[16px] pl-[16px]">
          <h3 className="lg:w-1/3 text-gray-500 text-font-14px leading-16px font-medium" data-testid="customer-date-time-service-title">
            Date & Time of Treatment
          </h3>
          <div className="lg:w-2/3  text-gray-900 text-font-14px leading-16px font-medium" data-testid="customer-date-time-service-value">
            {customerDateTimeService}
          </div>
        </div>
      )}
      {/* <div className="flex justify-between items-center border-b border-gray-300 pb-6 pt-6 pl-8 pr-8">
                <h3 className="w-1/4 text-gray-500 text-font-14px leading-16px font-medium" data-testid="customer-payment-method-title">Payment Method</h3>
                <div className="w-3/4 text-gray-900 text-font-14px leading-16px font-medium" data-testid="customer-payment-method-value">
                    <span data-testid="customer-payment-method-type-value" className="text-font-14px leading-16px font-bold text-gray-900 mr-1">{customerPaymentMethodType}</span>
                    <span data-testid="customer-payment-method-ending-value" className="text-font-14px leading-16px text-gray-900">ending in {customerPaymentMethodEnding}</span>
                </div>
            </div> */}
      {/* <div className="border-b border-gray-300 pb-6 pt-6 pl-8 pr-8">
                <ServicePreviewCard />
            </div>
            <div className="border-b border-gray-300 pb-6 pt-6 pl-8 pr-8">
                <ServicePreviewCard />
            </div> */}
      <div className="border-b border-gray-300 pb-6 pt-6 md:pl-8 md:pr-8 pr-[16px] pl-[16px]">
        <div className="flex justify-between items-center mb-5">
          <div data-testid="customer-subtitle-title" className="text-font-14px leading-16px text-black">
            Subtotal
          </div>
          <div data-testid="customer-subtotal-value" className="text-font-14px leading-16px text-black font-medium">
            {toDollars(subtotal)}
          </div>
        </div>
        <div className="flex justify-between items-center mb-5">
          <div data-testid="customer-saletax-title" className="text-font-14px leading-16px text-black">
            Sales Tax - <span className="fs-exclude">{customerState}</span>
          </div>
          <div data-testid="customer-saletax-value" className="text-font-14px leading-16px text-black font-medium">
            {toDollars(saleTax)}
          </div>
        </div>
        {/* <div className="flex justify-between items-center mb-5">
                    <div data-testid="customer-thisinvoice-title" className="text-font-14px leading-16px text-black">Total this invoice</div>
                    <div data-testid="customer-thisinvoice-value" className="text-font-14px leading-16px text-black font-medium">{thisInvoiceTotal}</div>
                </div> */}
        {/* <div className="flex justify-between items-center mb-5">
                    <div data-testid="customer-past-due-balance-title" className="text-font-14px leading-16px text-red-500">PAST-DUE BALANCE</div>
                    <div data-testid="customer-past-due-balance-value" className="text-font-14px leading-16px text-red-500 font-medium">{pastDueBalance}</div>
                </div> */}
        <div className="flex justify-between items-center">
          <div data-testid="customer-total-title" className="text-font-18px leading-16px text-black font-medium">
            Total
          </div>
          <div data-testid="customer-total-value" className="text-font-18px leading-16px text-black font-medium">
            {toDollars(total)}
          </div>
        </div>
        {isMakePayment && isPayable && (
          <div data-testid="customer-make-payment-btn" className="flex justify-end items-center mt-5">
            <Link to={`/billing/make-payments`}>
              <Button label="Make Payment" type="button" onClick={() => trackClick('make_payment/from/invoice_card')} />
            </Link>
          </div>
        )}
        <div className="mt-14 text-black text-font-18px leading-16px text-black font-medium">
          <span data-testid="customer-payment-method-tool-title" className="text-green-500">
            {invoiceStatus}
          </span>
        </div>
      </div>
    </>
  );
};

export default InvoiceInformation;
