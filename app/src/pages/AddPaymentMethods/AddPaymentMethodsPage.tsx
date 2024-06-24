import React, { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { AddACHPaymentMethodForm, AddACHPaymentMethodFormV2 } from '../../components/AddACHPaymentMethodForm/index';
import { Link } from 'react-router-dom';
import { ACH, ACHV2, CustomerBillingPayload } from 'types';
import AddCCPaymentMethodForm from './components/AddCCPaymentMethodForm';
import { useRecoilValue } from 'recoil';
import { aptiveUserState } from 'app-recoil/atoms/auth/aptive-user';
import { useTrackingClick } from '../../shared/hooks/useTrackingClick';
import { useTrackingView } from '../../shared/hooks/useTrackingView';
import { useFeatureFlag } from 'configcat-react';

const AddPaymentMethodsPage: React.FC = () => {
  const { trackClick } = useTrackingClick();
  const { value: isUseLegacyPaymentProvider, loading: isLoadingUseLegacyPaymentProvider } = useFeatureFlag(
    'useLegacyPaymentProvider',
    false
  );
  useTrackingView();
  const aptiveUser = useRecoilValue(aptiveUserState);
  const [showACHForm, setShowACHForm] = useState<boolean>(true);

  const ACHOptions: ACH = {
    customer_id: aptiveUser?.accountId?.toString() ?? '',
    billing_name: '',
    billing_address_line_1: '',
    billing_address_line_2: '',
    billing_city: '',
    billing_state: '',
    billing_zip: '',
    bank_name: '',
    routing_number: '',
    account_number: '',
    account_number_confirmation: '',
    check_type: 0,
    account_type: 0,
    auto_pay: 1,
  };

  const ACHOptionsV2: ACHV2 = {
    customer_id: aptiveUser?.accountId?.toString() ?? '',
    billing_name: '',
    billing_address_line_1: '',
    billing_address_line_2: '',
    billing_city: '',
    billing_state: '',
    billing_zip: '',
    bank_name: '',
    routing_number: '',
    account_number: '',
    account_number_confirmation: '',
    check_type: 0,
    account_type: 'personal_checking',
    auto_pay: 1,
    cc_type: 'VISA',
  };

  const CCOptions: CustomerBillingPayload = {
    billing_name: '',
    billing_address_line_1: '',
    billing_address_line_2: '',
    billing_city: '',
    billing_state: '',
    billing_zip: '',
    auto_pay: true,
  };

  return (
    <>
      <PageTitle title="Add Payment Method" />
      <>
        <div className="text-gray-500 text-sm mb-5 pl-[16px] md:pl-[0px]">
          {showACHForm && (
            <>
              Please provide your bank account information below. <br />
              For alternative payment methods{' '}
              <Link
                to="#"
                onClick={() => {
                  showACHForm ? setShowACHForm(false) : setShowACHForm(true);
                  trackClick('click_here/from/ach_form');
                }}
                className="md:text-green-600 font-medium text-aptive-link"
                data-testid="to-cc-form"
              >
                click here.
              </Link>
            </>
          )}
          {!showACHForm && (
            <>
              ACH (direct bank debit) is our preferred payment method.{' '}
              <Link
                to="#"
                onClick={() => {
                  showACHForm ? setShowACHForm(false) : setShowACHForm(true);
                  trackClick('click_here/from/cc_form');
                }}
                className="md:text-green-700 font-medium text-aptive-link"
              >
                Click here
              </Link>{' '}
              to enter your bank information instead of a credit card.
            </>
          )}
        </div>
        {showACHForm ? (
          <>
            {!isUseLegacyPaymentProvider && <AddACHPaymentMethodFormV2 setShowForm={setShowACHForm} paymentMethod={ACHOptionsV2} />}
            {isUseLegacyPaymentProvider && <AddACHPaymentMethodForm setShowForm={setShowACHForm} paymentMethod={ACHOptions} />}
          </>
        ) : (
          <AddCCPaymentMethodForm setShowForm={setShowACHForm} paymentMethod={CCOptions} />
        )}
      </>
    </>
  );
};

export default AddPaymentMethodsPage;
