import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Input from 'components/form/Input';
import Select from 'components/form/Select';
import Switch from 'components/form/Switch';
import Button from 'shared/components/Button';
import AddCreditCardForm, { TokenexData } from 'pages/AddPaymentMethods/components/AddCreditCardForm';
import { CustomerBillingPayload, ErrorsObject } from 'types';
import states from 'helpers/states.json';
import { useRecoilValue } from 'recoil';
import aptiveUserAccountId from 'app-recoil/selectors/aptive-user-account-id';
import { useTrackingClick } from 'shared/hooks/useTrackingClick';
import useSubmitCustomerBillingInfo, {
  useSubmitTokenexCustomerBillingInfo,
} from 'pages/AddPaymentMethods/hooks/useSubmitCustomerBillingInfo';
import { useFeatureFlag } from 'configcat-react';

interface Props {
  setShowForm: (value: boolean) => void;
  paymentMethod: CustomerBillingPayload;
}

const convertCCType = (ccType: 'Discover' | 'Visa' | 'Mastercard' | 'Amex') => {
  switch (ccType) {
    case 'Discover':
      return 'DISCOVER';
    case 'Visa':
      return 'VISA';
    case 'Mastercard':
      return 'MASTERCARD';
    case 'Amex':
      return 'AMEX';
    default:
      return 'OTHER';
  }
};

const AddCCPaymentMethodForm: React.FC<Props> = ({ setShowForm, paymentMethod }: Props) => {
  const navigate = useNavigate();
  const { trackClick } = useTrackingClick();

  const accountId = useRecoilValue(aptiveUserAccountId);

  const [apiErrors, setApiErrors] = useState<ErrorsObject>();
  const [isTokenizing, setIsTokenizing] = useState(false);
  const [tokenexData, setTokenexData] = useState<TokenexData>();

  const { value: useLegacyPaymentProvider, loading: useLegacyPaymentProviderLoading } = useFeatureFlag('useLegacyPaymentProvider', false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerBillingPayload>({
    mode: 'onBlur',
  });

  const { isLoading: legacyPaymentProviderLoading, mutate: legacyPaymentProviderMutate } = useSubmitCustomerBillingInfo(
    useLegacyPaymentProvider ? 1 : 2
  );
  const { isLoading: tokenexLoading, mutate: tokenexMutate } = useSubmitTokenexCustomerBillingInfo();

  const onSubmitCreditCardInfo = handleSubmit(async (formData: CustomerBillingPayload) => {
    if (useLegacyPaymentProvider) {
      legacyPaymentProviderMutate(
        { accountId, payload: formData },
        {
          onSuccess: data => {
            window.location.href = data.uri;
          },
          onError: data => {
            setApiErrors(data.response?.data.errors);
          },
        }
      );
    } else if (tokenexData) {
      tokenexMutate(
        {
          accountId,
          payload: {
            ...formData,
            card_type: tokenexData.cardType,
            cc_type: convertCCType(tokenexData.cardType),
            cc_token: tokenexData.token,
            cc_expiration_month: Number(tokenexData.expirationMonth),
            cc_expiration_year: Number(tokenexData.expirationYear),
            cc_last_four: tokenexData.lastFour,
          },
        },
        {
          onSuccess: data => {
            navigate('/billing/payment-settings');
          },
          onError: data => {
            setApiErrors(data.response?.data.errors);
          },
        }
      );
    }
  });

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 grid-cols-1">
      <div
        id="cc-payment-wrapper"
        className="p-[16px] bg-white 2xl:col-span-1 xl:col-span-1 md:col-span-3 shadow overflow-hidden sm:rounded-md mb-5"
      >
        <form onSubmit={onSubmitCreditCardInfo}>
          <div className="mx-auto">
            <div className="grid grid-cols-1 gap-6 mt-3">
              <div className="col-span-12 text-gray-500 font-normal text-sm mb-0">Credit Card Billing Address</div>

              <div data-testid="billing_name" className="col-span-12">
                <Input<CustomerBillingPayload>
                  name="billing_name"
                  defaultValue={paymentMethod.billing_name}
                  label="Name"
                  errors={errors}
                  register={register}
                  required={true}
                  apiErrors={apiErrors}
                />
              </div>

              <div data-testid="billing_address_line_1" className="col-span-12">
                <Input<CustomerBillingPayload>
                  name="billing_address_line_1"
                  defaultValue={paymentMethod.billing_address_line_1}
                  label="Address Line 1"
                  errors={errors}
                  register={register}
                  required={true}
                  apiErrors={apiErrors}
                />
              </div>

              <div data-testid="billing_address_line_2" className="col-span-12">
                <Input<CustomerBillingPayload>
                  name="billing_address_line_2"
                  label="Address Line 2"
                  defaultValue={paymentMethod.billing_address_line_2}
                  errors={errors}
                  register={register}
                  apiErrors={apiErrors}
                />
              </div>
              <div data-testid="billing_city" className="col-span-12">
                <Input<CustomerBillingPayload>
                  label="City"
                  name="billing_city"
                  defaultValue={paymentMethod.billing_city}
                  register={register}
                  apiErrors={apiErrors}
                  errors={errors}
                  required={true}
                />
              </div>
              <div className="col-span-12 flex">
                <div data-testid="billing_state" className="w-32 pr-3">
                  <Select<CustomerBillingPayload>
                    name="billing_state"
                    defaultValue={paymentMethod.billing_state}
                    label="State"
                    placeholder="ALL"
                    options={states}
                    errors={errors}
                    apiErrors={apiErrors}
                    register={register}
                    required
                  />
                </div>

                <div data-testid="billing_zip" className="">
                  <Input<CustomerBillingPayload>
                    type="number"
                    name="billing_zip"
                    defaultValue={paymentMethod.billing_zip}
                    label="Zip"
                    register={register}
                    apiErrors={apiErrors}
                    errors={errors}
                    required={true}
                  />
                </div>
              </div>
            </div>

            {!useLegacyPaymentProviderLoading && !useLegacyPaymentProvider && (
              <AddCreditCardForm isTokenizing={isTokenizing} onSubmit={data => setTokenexData(data)} setIsTokenizing={setIsTokenizing} />
            )}

            <div className="grid grid-cols-1 gap-6 mt-[24px]">
              <div className="col-span-12">
                <div data-testid="auto_pay" className="flex justify-left">
                  <Switch
                    name="auto_pay"
                    defaultValue={paymentMethod?.auto_pay}
                    label="Use this account for auto payments"
                    register={register}
                    errors={errors}
                    apiErrors={apiErrors}
                  />
                </div>
              </div>

              <div className="col-span-12">
                <p data-testid="description" className="text-[14px] text-gray-500 font-medium sm:mt-0">
                  By enabling autopay you authorize Aptive or its assignee(s) to charge the amount indicated above to this account at the
                  time of each treatment, or the 1st day of each month if you selected Aptive&apos;s monthly payment plan under your Service
                  Agreement. You can revoke your authorization at anytime by disabling Autopay, calling us at 844-573-7111, writing us at{' '}
                  <a href="mailto:customersupport@goaptive.com" className="text-green-600 underline">
                    customersupport@goaptive.com
                  </a>{' '}
                  or 5123 N 300 W, Provo UT 84601
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="divide-y divide-gray-200 pt-7">
                <div data-testid="save-button" className="flex justify-center">
                  <Button
                    label="Save Account"
                    type="submit"
                    className="mr-3"
                    disabled={useLegacyPaymentProvider ? legacyPaymentProviderLoading : !tokenexData || tokenexLoading || isTokenizing}
                    onClick={() => trackClick('save_account/from/cc_form')}
                  />
                </div>
              </div>

              <div className="divide-y divide-gray-200 pt-7">
                <div data-testid="add_ach" className="flex justify-center">
                  <Link key="Add an ACH Instead" to="#">
                    <Button
                      onClick={() => {
                        setShowForm(true);
                        trackClick('add_ach_instead/from/cc_form');
                      }}
                      label={'Add an ACH Instead'}
                      type="button"
                      color="muted"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddCCPaymentMethodForm;
