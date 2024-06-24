import React from 'react';

import { DeepMap, FieldError, FieldValue, FieldValues, get, Path, UseFormRegister, Validate } from 'react-hook-form';

interface ErrorsObject {
  [key: string]: any;
}

interface InputProps<InputFields extends FieldValues> {
  name: Path<InputFields>;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  register: UseFormRegister<InputFields>;
  validate?: any;
  required?: boolean;
  errors?: Partial<DeepMap<InputFields, FieldError>>;
  apiErrors?: ErrorsObject;
  errorMessage?: string;
  validateErrorMessage?: string;
  type?: string;
}
const Input = <InputFields extends FieldValues>({
  name,
  label,
  placeholder,
  defaultValue,
  register,
  required = false,
  errors,
  apiErrors,
  errorMessage = 'This field is required',
  validate,
  type = 'text',
}: InputProps<InputFields>) => {
  const errorMessages = get(errors, name);
  return (
    <>
      <label data-testid="label" htmlFor={name} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        data-testid="input"
        onKeyPress={event => {
          if (type === 'number') {
            const regex = new RegExp(/(^\d*$)|(Backspace|Tab|Delete|ArrowLeft|ArrowRight)/);

            return !event.key.match(regex) && event.preventDefault();
          }
        }}
        onPaste={event => {
          if (type === 'number') {
            const clipboardData = event.clipboardData;
            const pastedData = clipboardData.getData('Text');
            if (isNaN(+pastedData)) {
              event.stopPropagation();
              event.preventDefault();
            }
          }
        }}
        placeholder={placeholder}
        {...register(name, {
          required: required,
          validate: validate,
        })}
        defaultValue={defaultValue}
        id={name}
        className="mt-1 block w-full shadow-sm sm:text-sm p-2 border border-gray-300 rounded-md fs-exclude"
      />
      {apiErrors && apiErrors[name] && <p className="text-red-800 text-sm">{apiErrors[name]}</p>}

      {errors && errorMessages && <div>{errorMessages?.type === 'required' && <p className="text-red-800 text-sm">{errorMessage}</p>}</div>}
    </>
  );
};

export default Input;
