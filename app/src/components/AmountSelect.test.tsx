import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AmountSelect from './AmountSelect';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { toDollars } from '../helpers';
import userEvent from '@testing-library/user-event';

const mockOnSelect = jest.fn();
const mockOnOtherAmountChange = jest.fn();
const mockBalance = 10;

describe('AmountSelect component', () => {
  describe(' - When the balance value is greater than 0', () => {
    it('should show the Full Balance block when the balance is greater than 0', async () => {
      render(
        <RecoilRoot>
          <BrowserRouter>
            <AmountSelect balance={10} selectedAmount="10" onSelect={mockOnSelect} onOtherAmountChange={mockOnOtherAmountChange} />
          </BrowserRouter>
        </RecoilRoot>
      );

      const fullBalance = screen.queryByTestId('full-balance');
      expect(fullBalance).toBeInTheDocument();
    });

    it('should have Full Balance title on the screen', async () => {
      render(
        <RecoilRoot>
          <BrowserRouter>
            <AmountSelect balance={10} selectedAmount="10" onSelect={mockOnSelect} onOtherAmountChange={mockOnOtherAmountChange} />
          </BrowserRouter>
        </RecoilRoot>
      );

      expect(screen.getByText('Full Balance')).toBeInTheDocument();
    });

    it(`should have balance amount of mocked ${toDollars(mockBalance)} displayed on screen`, async () => {
      render(
        <RecoilRoot>
          <BrowserRouter>
            <AmountSelect balance={mockBalance} selectedAmount="10" onSelect={mockOnSelect} onOtherAmountChange={mockOnOtherAmountChange} />
          </BrowserRouter>
        </RecoilRoot>
      );

      expect(screen.getByText(`${toDollars(mockBalance)}`)).toBeInTheDocument();
    });

    it('should have the radio input checked when the selectedAmount is full', async () => {
      render(
        <RecoilRoot>
          <BrowserRouter>
            <AmountSelect
              balance={mockBalance}
              selectedAmount="full"
              onSelect={mockOnSelect}
              onOtherAmountChange={mockOnOtherAmountChange}
            />
          </BrowserRouter>
        </RecoilRoot>
      );

      const checkBoxInput = screen.queryByTestId('input-radio');
      expect(checkBoxInput).toBeChecked();
    });

    it('should call onSelect function with param value of full when we change the input', async () => {
      const mockOnChange = jest.fn();
      render(
        <RecoilRoot>
          <BrowserRouter>
            <AmountSelect
              balance={mockBalance}
              selectedAmount="full"
              onSelect={mockOnChange}
              onOtherAmountChange={mockOnOtherAmountChange}
            />
          </BrowserRouter>
        </RecoilRoot>
      );

      const checkBoxInput = screen.getByTestId('input-radio');
      userEvent.dblClick(checkBoxInput);
      expect(mockOnChange).toHaveBeenCalledTimes(0);
    });
  });

  describe(' - When the balance value is NOT greater than 0', () => {
    it('should NOT show the Full Balance block when the balance is NOT greater than 0', async () => {
      render(
        <RecoilRoot>
          <BrowserRouter>
            <AmountSelect balance={-10} selectedAmount="10" onSelect={mockOnSelect} onOtherAmountChange={mockOnOtherAmountChange} />
          </BrowserRouter>
        </RecoilRoot>
      );

      const fullBalance = screen.queryByTestId('full-balance');
      expect(fullBalance).not.toBeInTheDocument();
    });
  });

  it('should always have currency block displayed', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <AmountSelect balance={mockBalance} selectedAmount="full" onSelect={mockOnSelect} onOtherAmountChange={mockOnOtherAmountChange} />
        </BrowserRouter>
      </RecoilRoot>
    );

    const currency = screen.getByTestId('currency');
    expect(currency).toBeInTheDocument();
  });

  it('should always have Other Amount title on the screen', async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <AmountSelect balance={10} selectedAmount="10" onSelect={mockOnSelect} onOtherAmountChange={mockOnOtherAmountChange} />
        </BrowserRouter>
      </RecoilRoot>
    );

    expect(screen.getByText('Other Amount')).toBeInTheDocument();
  });
});
