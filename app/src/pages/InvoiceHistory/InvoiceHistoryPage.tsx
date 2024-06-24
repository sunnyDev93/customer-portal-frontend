import React, { useMemo } from 'react';

import LoadingSpinner from 'components/LoadingSpinner';
import PageTitle from 'components/PageTitle';
import InvoiceCard from 'pages/InvoiceHistory/components/InvoiceCard';
import LoadingInvoice from 'pages/InvoiceHistory/components/LoadingInvoice';
import LatestBillWidget from 'components/LatestBillWidget';

import { withAuthenticationRequired } from '../../shared/hooks/AptiveAuth';
import { useGetCustomerInvoices } from 'shared/hooks/useGetInvoices';
import { useRecoilValue } from 'recoil';
import { aptiveUserDataState } from 'app-recoil/atoms/auth/aptive-user-data';
import { useGetCustomerAppointmentsHistory } from 'shared/hooks/useApointmentsHistory';
import aptiveUserAccountId from 'app-recoil/selectors/aptive-user-account-id';
import { useTrackingView } from '../../shared/hooks/useTrackingView';
import { customerInfoDataState } from 'app-recoil/atoms/customer-info';

const InvoiceHistoryPage: React.FC = () => {
  useTrackingView();
  const accountId = useRecoilValue(aptiveUserAccountId);
  const aptiveUserData = useRecoilValue(aptiveUserDataState);
  const customerInfo = useRecoilValue(customerInfoDataState);

  const { isLoading: isLoadingInvoices, data: invoices } = useGetCustomerInvoices();
  const { data: historyAppointments } = useGetCustomerAppointmentsHistory();

  const activeInvoices = useMemo(() => (invoices ? invoices.filter((invoice: any) => invoice.attributes.active === 1) : []), [invoices]);

  return (
    <div data-testid="history-page">
      <PageTitle title="Invoice History" />

      <LatestBillWidget
        isShowingLatestBill={false}
        accountId={accountId}
        autoPay={aptiveUserData?.autoPay === 'Yes'}
        balance={customerInfo?.balanceCents || 0}
      />

      {!isLoadingInvoices && (
        <>
          {activeInvoices.length === 0 ? (
            <div className="border-t border-black pt-12 text-font-14px leading-16px text-black">
              No invoices found for this account. Call or text 855-BUG-FREE (855-284-373) for personal assistance.
            </div>
          ) : (
            <ul className="bg-white border border-gray-300 rounded-lg overflow-hidden mb-16">
              {activeInvoices.map((invoice: any, index: number) => (
                <li key={invoice.id}>
                  <InvoiceCard invoice={invoice} customer={aptiveUserData} appointments={historyAppointments} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {isLoadingInvoices && <LoadingInvoice />}
    </div>
  );
};

export default withAuthenticationRequired(InvoiceHistoryPage, {
  onRedirecting: () => <LoadingSpinner centered />,
});
