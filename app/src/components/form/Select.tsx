import React, { useState } from 'react';

import { DeepMap, FieldError, FieldValue, FieldValues, get, Path, UseFormRegister, Validate } from 'react-hook-form';

export interface Option {
  name: string;
  value: string;
}

interface ErrorsObject {
  [key: string]: any;
}

interface SelectProps<InputFields extends FieldValues> {
  name: Path<InputFields>;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  options: Array<Option>;
  type?: 'select' | 'radio' | 'checkbox';
  register: UseFormRegister<InputFields>;
  validate?: any;
  required?: boolean;
  errors?: Partial<DeepMap<InputFields, FieldError>>;
  apiErrors?: ErrorsObject;
  errorMessage?: string;
}

const Select = <InputFields extends FieldValues>({
  name,
  label,
  placeholder,
  defaultValue,
  options,
  type = 'select',
  register,
  required = false,
  errors,
  apiErrors,
  errorMessage = 'This field is required',
  validate,
}: SelectProps<InputFields>) => {
  const [initialValue, setInitialValue] = useState<string>(defaultValue ?? '');
  const errorMessages = get(errors, name);

  const renderSelect = () => (
    <select
      {...register(name, {
        required: required,
        validate: validate,
      })}
      defaultValue={defaultValue}
      data-testid={`${name}-select`}
      id={name}
      className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm p-2 border border-gray-300 rounded-md fs-exclude"
    >
      <option value="">{placeholder}</option>
      {options.map((option: Option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );

  const renderRadio = () => (
    <div data-testid={`radio`} className="flex flex-wrap  mt-[4px]">
      {options.map((option: Option, index: number) => (
        <div key={`${name}-${index}`} className="flex items-center mb-[8px] mr-4">
          <input
            id={`${name}-${index}`}
            {...register(name, {
              required: required,
            })}
            type="radio"
            className="w-4 h-4 text-green-500 p-2 border border-gray-300 focus:ring-green-400"
            value={option.value}
            checked={option.value === initialValue}
            onChange={e => setInitialValue(e.target.value)}
          />
          <label htmlFor={`${name}-${index}`} className="block ml-3 text-sm font-medium text-aptive-label-100">
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );

  const renderCheckbox = () => (
    <div data-testid={`checkbox`} className="mt-2 space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
      {options.map((option: Option, index: number) => (
        <div className="flex items-center" key={`${name}-${index}`}>
          <input
            id={`${name}-${index}`}
            {...register(name, {
              required: required,
            })}
            type="checkbox"
            className="w-4 h-4 text-green-500 p-2 border border-gray-300 focus:ring-green-400"
            value={option.value}
          />
          <label htmlFor={`${name}-${index}`} className="block ml-3 text-sm font-medium text-gray-700">
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {label && (
        <label data-testid="label" htmlFor={name} className="block text-sm font-medium text-gray-900">
          {label}
        </label>
      )}

      {type === 'select' && renderSelect()}

      {type === 'radio' && renderRadio()}

      {type === 'checkbox' && renderCheckbox()}

      {apiErrors && apiErrors[name] && <p className="text-red-800 text-sm">{apiErrors[name]}</p>}

      {errors && errorMessages && <div>{errorMessages?.type === 'required' && <p className="text-red-800 text-sm">{errorMessage}</p>}</div>}
    </>
  );
};

export default Select;
