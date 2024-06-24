import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Select from './Select';
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

describe('form/Select component', () => {
  const mockName = 'mock-name';
  const mockLabel = 'mock label';
  const mockPlaceholder = 'mock placeholder';
  const mockDefaultValue = 'mock default value';
  const mockRegister = jest.fn();
  const mockValidate = jest.fn();

  it(`should render label for input if we pass value for label props with value ${mockLabel}`, async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Select
            name={mockName}
            label={mockLabel}
            placeholder={mockPlaceholder}
            defaultValue={mockDefaultValue}
            register={mockRegister}
            validate={mockValidate}
            required={false}
            options={[]}
          />
        </BrowserRouter>
      </RecoilRoot>
    );

    const element = screen.queryByTestId('label');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(mockLabel);
  });

  it(`should NOT render label for input if we DONT pass value for label props`, async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Select
            name={mockName}
            placeholder={mockPlaceholder}
            defaultValue={mockDefaultValue}
            register={mockRegister}
            validate={mockValidate}
            required={false}
            options={[]}
          />
        </BrowserRouter>
      </RecoilRoot>
    );

    const element = screen.queryByTestId('label');
    expect(element).not.toBeInTheDocument();
  });

  it(`should render select input type if we pass type props select`, async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Select
            type="select"
            name={mockName}
            placeholder={mockPlaceholder}
            defaultValue={mockDefaultValue}
            register={mockRegister}
            validate={mockValidate}
            required={false}
            options={[]}
          />
        </BrowserRouter>
      </RecoilRoot>
    );

    const element = screen.queryByTestId(`${mockName}-select`);
    expect(element).toBeInTheDocument();
  });

  it(`should render radio input type if we pass type props radio`, async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Select
            type="radio"
            name={mockName}
            placeholder={mockPlaceholder}
            defaultValue={mockDefaultValue}
            register={mockRegister}
            validate={mockValidate}
            required={false}
            options={[]}
          />
        </BrowserRouter>
      </RecoilRoot>
    );

    const element = screen.queryByTestId(`radio`);
    expect(element).toBeInTheDocument();
  });

  it(`should render radio input type if we pass type props radio`, async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Select
            type="radio"
            name={mockName}
            placeholder={mockPlaceholder}
            defaultValue={mockDefaultValue}
            register={mockRegister}
            validate={mockValidate}
            required={false}
            options={[]}
          />
        </BrowserRouter>
      </RecoilRoot>
    );

    const element = screen.queryByTestId(`radio`);
    expect(element).toBeInTheDocument();
  });
  it(`should render checkbox input type if we pass type props checkbox`, async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Select
            type="checkbox"
            name={mockName}
            placeholder={mockPlaceholder}
            defaultValue={mockDefaultValue}
            register={mockRegister}
            validate={mockValidate}
            required={false}
            options={[]}
          />
        </BrowserRouter>
      </RecoilRoot>
    );

    const element = screen.queryByTestId(`checkbox`);
    expect(element).toBeInTheDocument();
  });
});
