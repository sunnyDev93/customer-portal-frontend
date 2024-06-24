import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './Input';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { DeepMap, FieldError, FieldValue, FieldValues, get, Path, UseFormRegister, Validate } from 'react-hook-form';

describe('form/Input component', () => {
  const mockName = 'mock name';
  const mockLabel = 'mock label';
  const mockPlaceholder = 'mock placeholder';
  const mockDefaultValue = 'mock default value';
  const mockRegister = jest.fn();
  const mockValidate = jest.fn();
  it(`should render label for input if we pass value for label props with value ${mockLabel}`, async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Input
            name={mockName}
            label={mockLabel}
            placeholder={mockPlaceholder}
            defaultValue={mockDefaultValue}
            register={mockRegister}
            validate={mockValidate}
            required={false}
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
          <Input
            name={mockName}
            placeholder={mockPlaceholder}
            defaultValue={mockDefaultValue}
            register={mockRegister}
            validate={mockValidate}
            required={false}
          />
        </BrowserRouter>
      </RecoilRoot>
    );

    const element = screen.queryByTestId('label');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('');
  });

  it('should always have input', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Input
            name={mockName}
            label={mockLabel}
            placeholder={mockPlaceholder}
            defaultValue={mockDefaultValue}
            register={mockRegister}
            validate={mockValidate}
            required={false}
          />
        </BrowserRouter>
      </RecoilRoot>
    );

    const element = screen.queryByTestId('input');
    expect(element).toBeInTheDocument();
  });

  it(`should have placeholder if we pass value to placeholder props: mockPlaceholder = ${mockPlaceholder}`, async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Input
            name={mockName}
            label={mockLabel}
            placeholder={mockPlaceholder}
            defaultValue={mockDefaultValue}
            register={mockRegister}
            validate={mockValidate}
            required={false}
          />
        </BrowserRouter>
      </RecoilRoot>
    );

    const element = screen.queryByTestId('input');
    expect(element).toHaveAttribute('placeholder', mockPlaceholder);
  });

  it(`should NOT have placeholder if we DONT pass value to placeholder `, async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Input
            name={mockName}
            label={mockLabel}
            defaultValue={mockDefaultValue}
            register={mockRegister}
            validate={mockValidate}
            required={false}
          />
        </BrowserRouter>
      </RecoilRoot>
    );

    const element = screen.queryByTestId('input');
    expect(element).not.toHaveAttribute('placeholder');
  });

  it(`should have placeholder if we pass value to defaultValue props: mockDefaultValue = ${mockDefaultValue}`, async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Input
            name={mockName}
            label={mockLabel}
            placeholder={mockPlaceholder}
            defaultValue={mockDefaultValue}
            register={mockRegister}
            validate={mockValidate}
            required={false}
          />
        </BrowserRouter>
      </RecoilRoot>
    );

    const element = screen.queryByTestId('input');
    expect(element).toHaveValue(mockDefaultValue);
  });

  it(`should NOT have placeholder if we DONT pass value to defaultValue`, async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Input
            name={mockName}
            label={mockLabel}
            placeholder={mockPlaceholder}
            register={mockRegister}
            validate={mockValidate}
            required={false}
          />
        </BrowserRouter>
      </RecoilRoot>
    );

    const element = screen.queryByTestId('input');
    expect(element).not.toHaveValue(mockDefaultValue);
  });
});
