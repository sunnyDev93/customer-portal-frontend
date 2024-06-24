import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Input from 'components/form/Input';
import Button from 'shared/components/Button';
import SignInBg from '../images/login.png';

const SignInPage: React.FC = () => {
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
              <h2 className="md:text-4xl text-3xl font-bold">Sign in to your account</h2>
              <div className="text-gray-600">
                Don&apos;t have an account?{' '}
                <a href="https://goaptive.com/build-a-plan" className="text-aptive-link">
                  Get a quote!
                </a>
              </div>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 text-gray-500 bg-white">Or continue with</span>
              </div>
            </div>

            <form onSubmit={onSubmit} data-testid="signin-form" className="space-y-5">
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

              <div className="col-span-6">
                <Input name="billing_address_line_2" label="Password" register={register} errors={errors} apiErrors={apiErrors} />
              </div>

              <div className="flex items-center">
                <label>
                  <input type="checkbox" />
                  <span className="ml-2">Remember me</span>
                </label>

                <a href="#!" className="ml-auto md:text-gray-900 text-aptive-link">
                  Forgot your password?
                </a>
              </div>

              <Button label="Sign in" type="submit" className="w-full mb-10" />
            </form>

            <div className="relative mt-10 mb-6">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 text-gray-500 bg-white">Need to register?</span>
              </div>
            </div>

            <Link to="/create-account" className="w-full block">
              <Button label="Create an Aptive customer portal account" type="button" color="muted" className="w-full" />
            </Link>
          </div>
        </div>
        <div className="md:flex flex-col hidden w-1/2 pt-5 pr-5">
          <img src={SignInBg} className="w-full max-w-[865px]" alt="Sign In Bg" />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
