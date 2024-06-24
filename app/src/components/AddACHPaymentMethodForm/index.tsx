import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Input from 'components/form/Input';
import Select from 'components/form/Select';
import Switch from 'components/form/Switch';
import Button from 'shared/components/Button';
import { ACH, ACHV2 } from 'types';
import states from 'helpers/states.json';
import { useTrackingClick } from 'shared/hooks/useTrackingClick';
import { useACHPaymentMethod } from './hook/useACHPaymentMethod';
import useAuth from 'shared/hooks/useAuth';
import WarningMessage from '../WarningMessage';

interface Props {
  setShowForm: (value: boolean) => void;
  paymentMethod: ACH;
}

interface PropsV2 {
  setShowForm: (value: boolean) => void;
  paymentMethod: ACHV2;
}

const AddACHPaymentMethodForm: React.FC<Props> = ({ setShowForm, paymentMethod }: Props) => {
  const { trackClick } = useTrackingClick();
  const { add, getPayload, isLoading } = useACHPaymentMethod(paymentMethod.customer_id);
  const [apiErrors, setApiErrors] = useState<Array<string>>([]);
  const [routingNumberError, setRoutingNumberError] = useState(false);
  const navigate = useNavigate();
  const { refetchAuthInfo, refetchCustomerById } = useAuth();

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ACH>({
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit(async formData => {
    if (formData.account_number !== formData.account_number_confirmation) {
      setError('account_number_confirmation', {
        type: 'manual',
        message: 'Account number must be equal',
      });
    } else if (formData.billing_zip.length !== 5) {
      setError('billing_zip', {
        type: 'manual',
        message: 'Zip code must have 5 digits',
      });
    } else {
      add(getPayload(formData))
        .then(async res => {
          await refetchAuthInfo();
          await refetchCustomerById();
          navigate(res?.data?.url || '/billing/payment-settings');
        })
        .catch(error => {
          const { status } = error.response;
          if (status === 422) {
            setApiErrors(error.data.errors);
          }
          if (status === 402) {
            setRoutingNumberError(true);
          }
        });
    }
  });

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 grid-cols-1">
      <div
        id="ach-payment-wrapper"
        className="p-[16px] bg-white shadow  2xl:col-span-1 xl:col-span-1 md:col-span-3  overflow-hidden sm:rounded-md mb-5"
      >
        {routingNumberError && (
          <WarningMessage
            onClose={() => setRoutingNumberError(false)}
            type="error"
            message="The routing number was not recognized. Please check the routing number and try again."
            isCloseable
            description=""
          />
        )}
        <form onSubmit={onSubmit} data-testid="payment-method-form">
          <div className="mx-auto">
            <div className="grid grid-cols-1 gap-6 mt-3">
              <div className="col-span-12 text-gray-500 font-normal text-sm mb-0">Billing Address</div>
              <div data-testid="billing_name" className="col-span-12">
                <Input<ACH>
                  name="billing_name"
                  label="Name"
                  defaultValue={paymentMethod.billing_name}
                  register={register}
                  errors={errors}
                  apiErrors={apiErrors}
                  required={true}
                />
              </div>
              <div data-testid="billing_address_line_1" className="col-span-12">
                <Input<ACH>
                  name="billing_address_line_1"
                  label="Address Line 1"
                  defaultValue={paymentMethod.billing_address_line_1}
                  register={register}
                  errors={errors}
                  apiErrors={apiErrors}
                  required={true}
                />
              </div>
              <div data-testid="billing_address_line_2" className="col-span-12">
                <Input<ACH>
                  name="billing_address_line_2"
                  label="Address Line 2"
                  defaultValue={paymentMethod.billing_address_line_2}
                  register={register}
                  errors={errors}
                  apiErrors={apiErrors}
                />
              </div>
              <div data-testid="billing_city" className="col-span-12">
                <Input<ACH>
                  name="billing_city"
                  label="City"
                  defaultValue={paymentMethod.billing_city}
                  register={register}
                  errors={errors}
                  apiErrors={apiErrors}
                  required={true}
                />
              </div>
              <div data-testid="billing_state" className="col-span-12 flex">
                <div className="w-32 pr-3">
                  <Select<ACH>
                    name="billing_state"
                    label="State"
                    defaultValue={paymentMethod.billing_state}
                    placeholder="ALL"
                    options={states}
                    register={register}
                    errors={errors}
                    apiErrors={apiErrors}
                    required
                  />
                </div>

                <div className="">
                  <Input<ACH>
                    name="billing_zip"
                    label="Zip"
                    defaultValue={paymentMethod.billing_zip}
                    register={register}
                    errors={errors}
                    apiErrors={apiErrors}
                    type="number"
                    required={true}
                  />
                  {errors.billing_zip && <p className="text-red-800 text-sm">{errors.billing_zip.message}</p>}
                </div>
              </div>
            </div>

            <div className="text-gray-500 font-normal text-sm mb-5 mt-5">Account Information</div>

            <div className="grid grid-cols-1 gap-6 mt-3">
              <div data-testid="bank_name" className="col-span-12">
                <Input<ACH>
                  name="bank_name"
                  label="Bank Name"
                  defaultValue={paymentMethod.bank_name}
                  register={register}
                  errors={errors}
                  apiErrors={apiErrors}
                  required={true}
                />
              </div>

              <div data-testid="routing_number" className="col-span-12">
                <Input<ACH>
                  name="routing_number"
                  label="Routing Number"
                  defaultValue={paymentMethod.routing_number}
                  register={register}
                  errors={errors}
                  apiErrors={apiErrors}
                  required={true}
                  type="number"
                />
              </div>

              <div data-testid="account_number" className="col-span-12">
                <Input<ACH>
                  name="account_number"
                  label="Account Number"
                  defaultValue={paymentMethod.account_number}
                  register={register}
                  errors={errors}
                  apiErrors={apiErrors}
                  type="number"
                  required={true}
                />
              </div>

              <div data-testid="account_number_confirmation" className="col-span-12">
                <Input<ACH>
                  name="account_number_confirmation"
                  label="Confirm Account Number"
                  defaultValue={paymentMethod.account_number_confirmation}
                  register={register}
                  errors={errors}
                  apiErrors={apiErrors}
                  type="number"
                  required={true}
                />
                {errors.account_number_confirmation && <p className="text-red-800 text-sm">{errors.account_number_confirmation.message}</p>}
              </div>

              <div data-testid="account_type" className="col-span-12">
                <Select<ACH>
                  type="radio"
                  label="Account Type"
                  name="account_type"
                  options={[
                    { name: 'Checking', value: '0' },
                    { name: 'Savings', value: '1' },
                  ]}
                  defaultValue={paymentMethod.account_type?.toString()}
                  register={register}
                  errors={errors}
                  apiErrors={apiErrors}
                />
              </div>

              <div data-testid="auto_pay" className="col-span-12">
                <div className="flex justify-left">
                  <Switch
                    name="auto_pay"
                    label="Use this account for auto payments"
                    defaultValue={paymentMethod?.auto_pay ? true : false}
                    register={register}
                    errors={errors}
                    apiErrors={apiErrors}
                  />
                </div>
              </div>

              <div className="col-span-12" data-testid="description">
                <p className="text-[14px] text-gray-500 font-medium sm:mt-0">
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
              <div data-testid="save-button" className="divide-y divide-gray-200 pt-7">
                <div className="flex justify-center">
                  <Button
                    label="Save Account"
                    type="submit"
                    className="mr-3"
                    disabled={isLoading}
                    onClick={() => trackClick('save_account/from/ach_form')}
                    data-testid="save-account"
                  />
                </div>
              </div>

              <div className="divide-y divide-gray-200 pt-7">
                <div data-testid="add_credit_card" className="flex justify-center">
                  <Link key="Add a Credit Card Instead" to="#">
                    <Button
                      onClick={() => {
                        setShowForm(false);
                        trackClick('add_cc_instead/from/ach_form');
                      }}
                      label={'Add a Credit Card Instead'}
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

const AddACHPaymentMethodFormV2: React.FC<PropsV2> = ({ setShowForm, paymentMethod }: PropsV2) => {
  const { trackClick } = useTrackingClick();
  const { add, getPayload, isLoading } = useACHPaymentMethod(paymentMethod.customer_id, 2);
  const [apiErrors, setApiErrors] = useState<Array<string>>([]);
  const navigate = useNavigate();
  const { refetchAuthInfo, refetchCustomerById } = useAuth();

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ACH>({
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit(async formData => {
    if (formData.account_number !== formData.account_number_confirmation) {
      setError('account_number_confirmation', {
        type: 'manual',
        message: 'Account number must be equal',
      });
    } else if (formData.billing_zip.length !== 5) {
      setError('billing_zip', {
        type: 'manual',
        message: 'Zip code must have 5 digits',
      });
    } else if (formData.routing_number.length !== 9) {
      setError('routing_number', {
        type: 'manual',
        message: 'Routing number must have 9 digits',
      });
    } else {
      add(getPayload(formData))
        .then(async res => {
          await refetchAuthInfo();
          await refetchCustomerById();
          navigate(res?.data?.url || '/billing/payment-settings');
        })
        .catch(error => {
          if (error.status === 422) {
            setApiErrors(error.data.errors);
          }
          if (error.status === 402) {
            setApiErrors(error.data.errors);
          }
        });
    }
  });

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 grid-cols-1">
      <div
        id="ach-payment-wrapper"
        className="p-[16px] bg-white shadow  2xl:col-span-1 xl:col-span-1 md:col-span-3  overflow-hidden sm:rounded-md mb-5"
      >
        <form onSubmit={onSubmit} data-testid="payment-method-form">
          <div className="mx-auto">
            <div className="grid grid-cols-1 gap-6 mt-3">
              <div className="col-span-12 text-gray-500 font-normal text-sm mb-0">Billing Address</div>
              <div data-testid="billing_name" className="col-span-12">
                <Input<ACH>
                  name="billing_name"
                  label="Name"
                  defaultValue={paymentMethod.billing_name}
                  register={register}
                  errors={errors}
                  apiErrors={apiErrors}
                  required={true}
                />
              </div>
              <div data-testid="billing_address_line_1" className="col-span-12">
                <Input<ACH>
                  name="billing_address_line_1"
                  label="Address Line 1"
                  defaultValue={paymentMethod.billing_address_line_1}
                  register={register}
                  errors={errors}
                  apiErrors={apiErrors}
                  required={true}
                />
              </div>
              <div data-testid="billing_address_line_2" className="col-span-12">
                <Input<ACH>
                  name="billing_address_line_2"
                  label="Address Line 2"
                  defaultValue={paymentMethod.billing_address_line_2}
                  register={register}
                  errors={errors}
                  apiErrors={apiErrors}
                />
              </div>
              <div data-testid="billing_city" className="col-span-12">
                <Input<ACH>
                  name="billing_city"
                  label="City"
                  defaultValue={paymentMethod.billing_city}
                  register={register}
                  errors={errors}
                  apiErrors={apiErrors}
                  required={true}
                />
              </div>
              <div data-testid="billing_state" className="col-span-12 flex">
                <div className="w-32 pr-3">
                  <Select<ACH>
                    name="billing_state"
                    label="State"
                    defaultValue={paymentMethod.billing_state}
                    placeholder="ALL"
                    options={states}
                    register={register}
                    errors={errors}
                    apiErrors={apiErrors}
                    required
                  />
                </div>

                <div className="">
                  <Input<ACH>
                    name="billing_zip"
                    label="Zip"
                    defaultValue={paymentMethod.billing_zip}
                    register={register}
                    errors={errors}
                    apiErrors={apiErrors}
                    type="number"
                    required={true}
                  />
                  {errors.billing_zip && <p className="text-red-800 text-sm">{errors.billing_zip.message}</p>}
                </div>
              </div>
            </div>

            <div className="text-gray-500 font-normal text-sm mb-5 mt-5">Account Information</div>

            <div className="grid grid-cols-1 gap-6 mt-3">
              <div data-testid="bank_name" className="col-span-12">
                <Input<ACH>
                  name="bank_name"
                  label="Bank Name"
                  defaultValue={paymentMethod.bank_name}
                  register={register}
                  errors={errors}
                  apiErrors={apiErrors}
                  required={true}
                />
              </div>

              <div data-testid="routing_number" className="col-span-12">
                <Input<ACH>
                  name="routing_number"
                  label="Routing Number"
                  defaultValue={paymentMethod.routing_number}
                  register={register}
                  errors={errors}
                  apiErrors={apiErrors}
                  required={true}
                  type="number"
                />
                {errors.routing_number && <p className="text-red-800 text-sm">{errors.routing_number.message}</p>}
              </div>

              <div data-testid="account_number" className="col-span-12">
                <Input<ACH>
                  name="account_number"
                  label="Account Number"
                  defaultValue={paymentMethod.account_number}
                  register={register}
                  errors={errors}
                  apiErrors={apiErrors}
                  type="number"
                  required={true}
                />
              </div>

              <div data-testid="account_number_confirmation" className="col-span-12">
                <Input<ACH>
                  name="account_number_confirmation"
                  label="Confirm Account Number"
                  defaultValue={paymentMethod.account_number_confirmation}
                  register={register}
                  errors={errors}
                  apiErrors={apiErrors}
                  type="number"
                  required={true}
                />
                {errors.account_number_confirmation && <p className="text-red-800 text-sm">{errors.account_number_confirmation.message}</p>}
              </div>

              <div data-testid="account_type" className="col-span-12">
                <Select<ACH>
                  type="radio"
                  label="Account Type"
                  name="account_type"
                  options={[
                    { name: 'Personal Checking', value: 'personal_checking' },
                    { name: 'Personal Savings', value: 'personal_savings' },
                    { name: 'Business Checking', value: 'business_checking' },
                    { name: 'Business Savings', value: 'business_savings' },
                  ]}
                  defaultValue={paymentMethod.account_type?.toString()}
                  register={register}
                  errors={errors}
                  apiErrors={apiErrors}
                />
              </div>

              <div data-testid="auto_pay" className="col-span-12">
                <div className="flex justify-left">
                  <Switch
                    name="auto_pay"
                    label="Use this account for auto payments"
                    defaultValue={paymentMethod?.auto_pay ? true : false}
                    register={register}
                    errors={errors}
                    apiErrors={apiErrors}
                  />
                </div>
              </div>

              <div className="col-span-12" data-testid="description">
                <p className="text-[14px] text-gray-500 font-medium sm:mt-0">
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
              <div data-testid="save-button" className="divide-y divide-gray-200 pt-7">
                <div className="flex justify-center">
                  <Button
                    label="Save Account"
                    type="submit"
                    className="mr-3"
                    disabled={isLoading}
                    onClick={() => trackClick('save_account/from/ach_form')}
                    data-testid="save-account"
                  />
                </div>
              </div>

              <div className="divide-y divide-gray-200 pt-7">
                <div data-testid="add_credit_card" className="flex justify-center">
                  <Link key="Add a Credit Card Instead" to="#">
                    <Button
                      onClick={() => {
                        setShowForm(false);
                        trackClick('add_cc_instead/from/ach_form');
                      }}
                      label={'Add a Credit Card Instead'}
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

export { AddACHPaymentMethodForm, AddACHPaymentMethodFormV2 };
