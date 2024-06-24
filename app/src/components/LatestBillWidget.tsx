import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import LatestBillWidgetSkeleton from 'components/loading/LatestBillWidgetSkeleton';
import LoadingSpinner from 'components/LoadingSpinner';
import { DATE_ORDER_FORMAT } from 'constants/datetime';
import { toDollars } from 'helpers';
import Button from 'shared/components/Button';
import clockIcon from 'images/clock-icon.png';
import { useGetCustomerInvoices } from 'shared/hooks/useGetInvoices';
import { useRecoilValue } from 'recoil';
import { customerInfoDataState } from 'app-recoil/atoms/customer-info';
import { useSetRecoilState } from 'recoil';
import { expandedInvoiceIdState } from 'app-recoil/atoms/expanded-invoice-id';
import { useGetSubscriptions } from 'shared/hooks/useGetSubscriptions';
import { InvoiceType } from 'types/request';
import { useTrackingClick } from 'shared/hooks/useTrackingClick';
import { useFeatureFlag } from 'configcat-react';

/*
overdue payment uses aptiveUserData.balance. If > 0, show it

$ amount in latest bill is the subscription
Need to call subscription (recurringCharge)
serviceType for the subscription plan name (Pro Plus, etc)

show/hide autopay message depending on aptiveUserData.autoPay

hide make payment button when overdue payment is showing

*/

interface LatestBillWidgetProps {
  accountId: string;
  autoPay: boolean;
  balance: number;
  isShowingLatestBill?: boolean;
}

export const LatestBillWidget: React.FC<LatestBillWidgetProps> = ({ accountId, autoPay, balance, isShowingLatestBill = true }) => {
  const { value: isMonthlyBillingEnabled, loading: isMonthlyBillingEnabledLoading } = useFeatureFlag('isMonthlyBillingEnabled', false);
  const customer = useRecoilValue(customerInfoDataState);
  const setExpandedInvoiceId = useSetRecoilState(expandedInvoiceIdState);

  const { isLoading: isLoadingInvoices, data: invoices } = useGetCustomerInvoices();
  const { isLoading: isLoadingSubscriptions, data: subscriptions } = useGetSubscriptions();

  const [isLoadingCustomerAccount, setIsLoadingCustomerAccount] = useState(false);

  const activeInvoices = useMemo(() => invoices?.filter((invoice: InvoiceType) => invoice.attributes.active === 1), [invoices]);
  const navigate = useNavigate();
  const { trackClick } = useTrackingClick();
  const isLoading = isLoadingInvoices || isLoadingSubscriptions;

  const pastDue = balance > 0;
  let latestInvoice: InvoiceType | null = null;
  let latestInvoiceDate: any;
  let recurringCharge = 0;

  if (invoices?.length && activeInvoices?.length) {
    //Sort invoices by invoice date to get newest first
    activeInvoices?.sort((a: InvoiceType, b: InvoiceType) => {
      return moment(b.attributes.dateCreated).diff(moment(a.attributes.dateCreated));
    });

    latestInvoice = activeInvoices[0];
    latestInvoiceDate = moment(latestInvoice?.attributes.invoiceDate);
    recurringCharge = latestInvoice?.attributes.total ?? 0;
  }

  let serviceType = 'Unavailable';
  if (subscriptions?.length) {
    serviceType = subscriptions[0].attributes.serviceType;
  }

  const formattedInvoiceDateString = () => {
    if (latestInvoiceDate) {
      return `${latestInvoiceDate.format(DATE_ORDER_FORMAT)}`;
    }
  };
  const getMessage = () => {
    if (!customer?.autoPay || !latestInvoice) {
      return 'If you have previously authorized automatic fund transfers or auto pay using a credit card, payment will be charged at the time of treatment.';
    }
    if (customer.autoPay && customer.isOnMonthlyBilling) {
      return isMonthlyBillingEnabled
        ? 'Autopay enabled. Your payment will be charged each month on your designated billing date.'
        : 'If you have previously authorized automatic fund transfers or auto pay using a credit card, your payment will be charged on the first day of the month';
    }
    if (customer.autoPay && !customer.isOnMonthlyBilling) {
      return 'Autopay enabled. Your payment will be charged at the time of treatment.';
    }
  };

  const onHandleVIewBill = () => {
    trackClick('view_bill/from/latest_bill');
    setExpandedInvoiceId(latestInvoice?.id || null);
    return navigate(`/billing/invoice-history`);
  };

  if (isLoading || isLoadingCustomerAccount) {
    return <LatestBillWidgetSkeleton />;
  }

  return (
    <>
      {subscriptions?.length && !isLoading && !isLoadingCustomerAccount ? (
        <>
          {pastDue && (
            <div className="p-[16px] sm:py-4 sm:px-6 bg-red-100 flex items-center justify-start md:justify-between flex-col md:flex-row border-red-500 text-red-700 border shadow overflow-hidden sm:rounded-md mb-5">
              <div className="w-full">
                <p className=" font-bold mb-2">Past Due Balance</p>
                <div className="text-red-700 sm:mt-0">
                  Your account has a past due balance of <span className="font-bold ml-[4px]">{toDollars(balance / 100)}</span>
                </div>
              </div>
              <div className="md:ml-2 flex-shrink-0 flex mt-[12px] md:mt-0">
                <Link to={`/billing/make-payments`}>
                  <Button
                    label="Make Payment"
                    type="button"
                    color="danger"
                    onClick={() => {
                      trackClick('make_payment/from/past_due_balance');
                    }}
                  />
                </Link>
              </div>
            </div>
          )}

          {isShowingLatestBill && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md mb-5 md:divide-y md:divide-gray-200">
              <div className="p-[16px] flex flex-col items-center justify-between sm:py-4 sm:px-6 breakpoint-1162:flex-row">
                <div className="flex items-start justify-between w-full mb-[16px] breakpoint-1162:mb-0 breakpoint-1162:w-1/2">
                  <div>
                    <p className="text-xl font-medium mb-1">Latest Bill</p>
                    {latestInvoice ? (
                      <p className="text-sm font-medium text-gray-500">{formattedInvoiceDateString()}</p>
                    ) : (
                      <p className="text-sm font-medium text-gray-500">Your latest bill is not available. Please check back later.</p>
                    )}
                  </div>
                  <div className="md:hidden space-x-4">
                    <p className="text-end text-xl font-bold">{toDollars(recurringCharge)}</p>
                    <p className="text-end text-sm font-medium text-gray-500">{serviceType}</p>
                  </div>
                </div>

                <div className="flex justify-center items-center w-full breakpoint-1162:justify-end breakpoint-1162:w-1/2">
                  <div className="space-x-2 flex ml-2 flex-shrink-0 flex mt-5 md:mt-0">
                    <Button onClick={onHandleVIewBill} label="View Bill" type="button" color="muted" disabled={!latestInvoice} />
                  </div>

                  <div className="ml-2 flex-shrink-0 flex mt-5 md:mt-0 space-x-2">
                    <Button
                      label="Make Payment"
                      type="button"
                      color="primary"
                      onClick={() => {
                        trackClick('make_payment/from/latest_bill');
                        navigate('/billing/make-payments');
                      }}
                      disabled={(customer && customer.balanceCents <= 0) || !latestInvoice?.attributes?.balance}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-0 md:pt-4 px-4 pb-4 sm:px-6 flex flex-col md:flex-row items-start justify-end">
                <div className="hidden md:flex md:flex-col items-start w-full md:w-[25%] breakpoint-1162:w-1/4">
                  <p className="text-xl font-bold">{toDollars(recurringCharge)}</p>
                  <p className="text-sm font-medium text-gray-500">{serviceType}</p>
                </div>
                <div className="ml-2 flex mt-0 text-sm font-medium text-gray-500 breakpoint-1162:w-3/4 justify-end w-full md:w-[75%]">
                  <img alt="" src={clockIcon} className="w-5 h-5 mr-[8px]" />
                  <span>{getMessage()}</span>
                </div>
              </div>
            </div>
          )}
        </>
      ) : null}

      {isLoading && <LoadingSpinner label="Loading Latest Bill..." centered />}
    </>
  );
};

export default LatestBillWidget;
