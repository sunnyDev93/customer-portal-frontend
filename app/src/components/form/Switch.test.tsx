import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Switch from './Switch';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

// name: Path<InputFields>;
// label?: string;
// placeholder?: string;
// defaultValue?: string;
// options: Array<Option>;
// type?: 'select' | 'radio' | 'checkbox';
// register: UseFormRegister<InputFields>;
// validate?: Validate<FieldValue<InputFields>>;
// required?: boolean;
// errors?: Partial<DeepMap<InputFields, FieldError>>;
// apiErrors?: ErrorsObject;
// errorMessage?: string;

describe('form/Switch component', () => {
  const mockName = 'mock-name';
  const mockLabel = 'mock label';
  const mockPlaceholder = 'mock placeholder';
  const mockDefaultValue = 'mock default value';
  const mockRegister = jest.fn();
  const mockValidate = jest.fn();

  it(`should render label with htmlFor value of ${mockName}`, async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Switch name={mockName} label={mockLabel} register={mockRegister} validate={mockValidate} required={false} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const element = screen.queryByTestId('label-wrapper');
    expect(element).toBeInTheDocument();
  });

  it(`should render label with content value of ${mockLabel}`, async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Switch name={mockName} label={mockLabel} register={mockRegister} validate={mockValidate} required={false} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const element = screen.queryByTestId('label');
    expect(element).toHaveTextContent(mockLabel);
  });
});
