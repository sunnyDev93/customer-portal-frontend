import React, { useState, useEffect } from 'react';

import { FieldErrors, FieldName, FieldValue, UseFormRegister, Validate } from 'react-hook-form';

interface ErrorsObject {
  [key: string]: any;
}

interface SwitchProps {
  name: FieldName<any>;
  label?: string;
  defaultValue?: boolean;
  register: UseFormRegister<any>;
  validate?: any;
  errors?: FieldErrors<any>;
  apiErrors?: ErrorsObject;
  errorMessage?: string;
  validateErrorMessage?: string;
  required?: boolean;
}

const Switch: React.FC<SwitchProps> = ({
  name,
  label,
  defaultValue,
  register,
  errors,
  apiErrors,
  errorMessage = 'This field is required',
  validate = {},
  validateErrorMessage,
  required = false,
}) => {
  const [internalToggle, setInternalToggle] = useState(defaultValue);
  useEffect(() => {
    setInternalToggle(defaultValue);
  }, [defaultValue]);

  return (
    <>
      <label data-testid="label-wrapper" htmlFor={name} className="inline-flex relative items-center cursor-pointer">
        <input
          type="checkbox"
          id="auto_pay"
          className="sr-only peer"
          {...register(name, {
            required: required,
          })}
          defaultChecked={internalToggle}
          onChange={(e: any) => {
            setInternalToggle(e.target.checked);
          }}
        />
        <div className="relative">
          <div
            className={`${
              internalToggle
                ? 'bg-green-700 after:translate-x-[16px] after:border-white'
                : 'bg-gray-500 peer-checked:bg-green-700 peer-checked:after:translate-x-[16px] peer-checked:after:border-white'
            } w-[36px] h-[20px] border border-[#6A7381] peer-focus:outline-none rounded-full peer after:content-[''] after:absolute after:top-0 after:h-[20px] after:w-[20px] after:left-0 after:bg-white after:border-[#6A7381] after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-[#6A7381]`}
          />
        </div>
        <span data-testid="label" className="text-aptive-label-100 dark:text-neutral-900 ml-3 text-sm font-medium">
          {label}
        </span>
      </label>

      {apiErrors && apiErrors[name] && <p className="text-red-800 text-sm">{apiErrors[name]}</p>}

      {errors && errors[name] && <div>{errors[name]?.type === 'required' && <p className="text-red-800 text-sm">{errorMessage}</p>}</div>}
    </>
  );
};

export default Switch;
