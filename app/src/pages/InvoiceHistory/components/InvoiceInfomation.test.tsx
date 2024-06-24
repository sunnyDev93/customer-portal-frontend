import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { InvoiceInformation } from './InvoiceInformation';
import { formatPhoneNumber } from 'helpers/format';
import { toDollars } from 'helpers';
import { TestRoot } from 'config/test/react-query';
import { mockTrackClick } from '../../../setupTests';
import { useFeatureFlag } from 'configcat-react';

jest.mock('helpers', () => ({
  toDollars: jest.fn(),
}));
jest.mock('helpers/format', () => ({
  formatPhoneNumber: jest.fn(),
}));
jest.mock('configcat-react');
const mockUseFeatureFlag = useFeatureFlag as jest.Mock;
let isOn = true;

beforeAll(() => {
  mockUseFeatureFlag.mockImplementation(() => {
    return {
      loading: false,
      value: isOn,
    };
  });
});
const defaultProps = {
  customerName: 'John Doe',
  customerID: '1234',
  customerAddress: '123 Main St.',
  customerPhone: '555-555-5555',
  customerDateTimeService: '2022-01-01T01:00:00.000Z',
  subtotal: '100',
  saleTax: '10',
  total: '110',
  customerState: 'NY',
  isMakePayment: true,
  isPayable: true,
};

describe('<InvoiceInformation/>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (formatPhoneNumber as jest.Mock).mockReturnValue('555-555-5555');
    (toDollars as jest.Mock).mockReturnValue('$100.00');
  });

  it('should render customer name', () => {
    render(<InvoiceInformation {...defaultProps} />, { wrapper: TestRoot });
    expect(screen.getByTestId('customer-name-title')).toHaveTextContent('Customer Name');
    expect(screen.getByTestId('customer-name-value')).toHaveTextContent('John Doe');

    expect(screen.getByTestId('customer-id-title')).toHaveTextContent('Customer ID');
    expect(screen.getByTestId('customer-id-value')).toHaveTextContent('1234');

    expect(screen.getByTestId('customer-address-title')).toHaveTextContent('Customer Address');
    expect(screen.getByTestId('customer-address-value')).toHaveTextContent('123 Main St.');

    expect(screen.getByTestId('customer-phone-title')).toHaveTextContent('Customer Phone');
    expect(formatPhoneNumber).toHaveBeenCalledWith('555-555-5555');
    expect(screen.getByTestId('customer-phone-value')).toHaveTextContent('555-555-5555');

    expect(screen.getByTestId('customer-date-time-service-title')).toHaveTextContent('Date & Time of Treatment');
    expect(screen.getByTestId('customer-date-time-service-value')).toHaveTextContent('2022-01-01T01:00:00.000Z');
  });

  it('should not render customer phone number if not provided', () => {
    const props = { ...defaultProps, customerPhone: undefined };
    render(<InvoiceInformation {...props} />, { wrapper: TestRoot });
    expect(screen.getByTestId('customer-phone-title')).toHaveTextContent('Customer Phone');
    expect(screen.queryByTestId('customer-phone-value')).not.toBeInTheDocument();
  });

  it('should render correct invoice status', () => {
    const props = { ...defaultProps, isPayable: true };
    const { rerender } = render(<InvoiceInformation {...props} />, { wrapper: TestRoot });
    expect(screen.getByTestId('customer-payment-method-tool-title')).toHaveTextContent('Payment Due');
    const newProps = { ...defaultProps, isPayable: true, isMakePayment: false };
    rerender(<InvoiceInformation {...newProps} />);
    expect(screen.getByTestId('customer-payment-method-tool-title')).toHaveTextContent('AutoPay is enabled');
    rerender(<InvoiceInformation {...defaultProps} isPayable={false} isMakePayment={false} />);
    expect(screen.getByTestId('customer-payment-method-tool-title')).toHaveTextContent('Paid');
  });

  it('tracks clicks on the "Make Payment" button', () => {
    const props = { ...defaultProps };

    render(<InvoiceInformation {...props} />, { wrapper: TestRoot });

    const makePaymentButton = screen.getByRole('button', { name: 'Make Payment' });
    fireEvent.click(makePaymentButton);

    expect(mockTrackClick).toHaveBeenCalledWith('make_payment/from/invoice_card');
  });

  it('should not show "Date & Time of Treatment" when feature flag is on and user is  monthly billing', () => {
    isOn = true;
    render(<InvoiceInformation {...defaultProps} isOnMonthlyBilling={true} />, { wrapper: TestRoot });
    expect(screen.queryByText('Date & Time of Treatment')).not.toBeInTheDocument();
  });
  it('should show "Date & Time of Treatment" when feature flag is on and user is not monthly billing', () => {
    isOn = true;
    render(<InvoiceInformation {...defaultProps} isOnMonthlyBilling={false} />, { wrapper: TestRoot });
    expect(screen.getByText('Date & Time of Treatment')).toBeInTheDocument();
  });
  it('should show "Date & Time of Treatment" when feature flag is off', () => {
    isOn = false;
    render(<InvoiceInformation {...defaultProps} />, { wrapper: TestRoot });
    expect(screen.getByText('Date & Time of Treatment')).toBeInTheDocument();
  });
});
