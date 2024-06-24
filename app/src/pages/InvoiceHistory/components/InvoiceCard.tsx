import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { DATE_SEPARATE_YEAR_FORMAT, DATE_TIME_FORMAT } from 'constants/datetime';
import { toDollars } from 'helpers';
import { DatetimeHelper } from 'helpers/datetime';
import Button from 'shared/components/Button';
import { Appointment } from 'types/request';
import InvoiceInformation from 'pages/InvoiceHistory/components/InvoiceInformation';
import { useRecoilValue } from 'recoil';
import { expandedInvoiceIdState } from 'app-recoil/atoms/expanded-invoice-id';
import { useTrackingClick } from 'shared/hooks/useTrackingClick';
import { customerInfoDataState } from 'app-recoil/atoms/customer-info';

interface InvoiceCardProps {
  invoice: any;
  customer: any;
  appointments: Appointment[];
  isDisableBorderBottom?: boolean;
}

export const InvoiceCard: React.FC<PropsWithChildren<InvoiceCardProps>> = ({ invoice, customer, appointments }) => {
  const { trackClick } = useTrackingClick();

  const { invoiceNumber, invoiceDate, customerId, subTotal, total, taxAmount, balance, appointmentId } = invoice.attributes;
  const { address, autoPay, billingInformation } = customer;
  const [toggleExpand, setToggleExpand] = useState(false);
  const isPayable: boolean = balance !== 0;
  const expandedInvoiceId = useRecoilValue(expandedInvoiceIdState);
  const customerInfoData = useRecoilValue(customerInfoDataState);

  useEffect(() => {
    setToggleExpand(expandedInvoiceId === invoice.id);
  }, [invoice.id, expandedInvoiceId]);

  const _getCustomerDataTimeService = () => {
    if (!invoice.attributes.appointmentDate) return '';
    const formatTimeStr = DatetimeHelper.format(invoice.attributes.appointmentDate, DATE_TIME_FORMAT);
    const timeStr = invoice.attributes.appointmentDate.split('T')[1];
    const hour = timeStr.split(':')[0];
    const min = timeStr.split(':')[1];
    const dayStr = formatTimeStr.split('@')[0];
    return `${dayStr} @ ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  const formattedBalance = useMemo(() => <>{toDollars(balance)} PAST-DUE</>, [balance]);

  return (
    <div className={toggleExpand ? `shadow-mode-1` : ''}>
      <div
        data-testid="container"
        className="border-b border-gray-300 flex justify-between items-start lg:items-center md:pb-6 md:pt-6 md:pl-8 md:pr-8 p-[16px]"
      >
        <div className="lg:w-1/3 flex flex-col lg:flex-row">
          {isPayable && <div className="block lg:hidden font-medium text-font-14px leading-16px text-red-500 mb-3">{formattedBalance}</div>}
          <div className="lg:w-3/5 mb-3">
            <div className="md:mb-0 mb-3">
              <h3 className="text-gray-900 font-medium text-font-14px lg:mb-3 mb-1.5" data-testid="invoice-number-title">
                Invoice number
              </h3>
              {invoiceNumber && (
                <div className="text-gray-500 text-font-14px leading-16px fs-exclude" data-testid="invoice-number-value">
                  {invoiceNumber}
                </div>
              )}
            </div>
          </div>
          <div className="lg:w-2/5 mb-3">
            <h3 className="text-gray-900 font-medium text-font-14px lg:mb-3 mb-1.5" data-testid="invoice-date-title">
              Billing Date
            </h3>
            {invoiceDate && (
              <div className="text-gray-500 text-font-14px leading-16px" data-testid="invoice-date-value">
                {DatetimeHelper.format(invoiceDate, DATE_SEPARATE_YEAR_FORMAT)}
              </div>
            )}
          </div>
        </div>
        <div className="lg:w-2/3 flex items-center justify-between">
          <div className={`hidden lg:block font-medium text-font-14px leading-16px text-${isPayable ? 'red' : 'gray'}-500 `}>
            {isPayable ? formattedBalance : 'Paid'}
          </div>
          <div
            onClick={() => {
              trackClick(`${toggleExpand ? 'collapse' : 'expand'}/from/invoice_card`);
              setToggleExpand(!toggleExpand);
            }}
            className="ml-4"
            data-testid="toggle-button"
          >
            <div className="mb-4">
              <Button label={toggleExpand ? `Collapse` : `Expand`} type="button" color="muted" />
            </div>
            {!isPayable && <div className={`lg:hidden font-medium text-center text-green-500 text-font-18px leading-16px`}>Paid</div>}
          </div>
        </div>
      </div>

      {toggleExpand && (
        <div data-testid="invoice-information">
          <InvoiceInformation
            customerID={customerId}
            customerName={`${customer.firstName} ${customer.lastName}`}
            customerAddress={address.address}
            customerPhone={billingInformation.phone}
            subtotal={`${subTotal}`}
            total={`${total}`}
            saleTax={`${taxAmount}`}
            customerDateTimeService={_getCustomerDataTimeService()}
            // pastDueBalance={`$${balance}`}
            customerState={address.state}
            isMakePayment={autoPay === 'No'}
            isPayable={isPayable}
            isOnMonthlyBilling={!!customerInfoData?.isOnMonthlyBilling}
            // thisInvoiceTotal={total}
          />
        </div>
      )}
    </div>
  );
};

export default InvoiceCard;
