import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Input from '../components/form/Input';

import Button from 'shared/components/Button';

import SignInBg from '../images/login.png';

const CreateAccountPage: React.FC = () => {
  const [apiErrors, setApiErrors] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit(async data => null);

  return (
    <div className="flex w-full">
      <div className="flex w-full">
        <div className="flex w-full md:w-1/2 pb-20">
          <div className="flex flex-col ml-auto md:w-[450px] w-full xl:mr-32 lg:mr-10 md:mr-10 md:pt-32 lg:pl-4 px-4 pt-3">
            <div className="flex flex-col space-y-3">
              <h2 className="md:text-4xl text-3xl font-bold">Create an Aptive Portal account</h2>
              <div className="text-gray-600">
                Already have an account?{' '}
                <Link to="/sign-in" className="text-aptive-link">
                  Back to login.
                </Link>
              </div>
            </div>

            <div className="text-gray-600 mt-10">
              Enter the email address that you used to create your Aptive account below. We will email you a link to complete the
              registration process.
            </div>

            <form onSubmit={onSubmit} data-testid="signin-form" className="space-y-5 mt-6">
              <div className="col-span-6">
                <Input
                  name="billing_address_line_1"
                  label="Email address"
                  register={register}
                  errors={errors}
                  apiErrors={apiErrors}
                  required
                />
              </div>

              <Button label="Send me the link" type="submit" className="w-full mb-10" />
            </form>
          </div>
        </div>
        <div className="md:flex flex-col hidden w-1/2 pt-5 pr-5">
          <img src={SignInBg} className="w-full max-w-[865px]" alt="Sign In Bg" />
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
