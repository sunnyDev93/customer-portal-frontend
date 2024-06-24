import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Appointment } from 'types/request';
import { InvoiceCard } from './InvoiceCard';
import { TestRoot } from 'config/test/react-query';
import { useFeatureFlag } from 'configcat-react';

jest.mock('configcat-react');

const mockUseFeatureFlag = useFeatureFlag as jest.Mock;
let isOn = false;

const invoice = {
  id: '1',
  attributes: {
    invoiceNumber: '123',
    invoiceDate: new Date().toISOString(),
    customerId: '456',
    subTotal: 100,
    total: 120,
    taxAmount: 20,
    balance: 20,
    appointmentId: 789,
  },
};

const customer = {
  firstName: 'John',
  lastName: 'Doe',
  address: {
    address: '123 Main St.',
    state: 'CA',
  },
  billingInformation: {
    phone: '123-456-7890',
  },
  autoPay: 'No',
};

const appointments: Appointment[] = [
  {
    id: '789',
    attributes: {
      start: new Date().toISOString(),
    },
  },
] as unknown as Appointment[];

beforeAll(() => {
  mockUseFeatureFlag.mockImplementation(() => {
    return {
      loading: false,
      value: isOn,
    };
  });
});

describe('InvoiceCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders invoice number and billing date', () => {
    render(<InvoiceCard invoice={invoice} customer={customer} appointments={appointments} />, { wrapper: TestRoot });

    expect(screen.getByTestId('invoice-number-value')).toHaveTextContent('123');
    expect(screen.getByTestId('invoice-date-value')).toHaveTextContent(new Date().getFullYear().toString());
  });

  it('expands and collapses', () => {
    render(<InvoiceCard invoice={invoice} customer={customer} appointments={appointments} />, { wrapper: TestRoot });

    const toggleButton = screen.getByTestId('toggle-button');
    expect(screen.queryByTestId('invoice-information')).not.toBeInTheDocument();
    fireEvent.click(toggleButton);
    expect(screen.getByTestId('invoice-information')).toBeInTheDocument();
    fireEvent.click(toggleButton);
    expect(screen.queryByTestId('invoice-information')).not.toBeInTheDocument();
  });

  it('renders "Paid" when balance is 0', () => {
    const invoiceWithZeroBalance = {
      ...invoice,
      attributes: {
        ...invoice.attributes,
        balance: 0,
      },
    };

    render(<InvoiceCard invoice={invoiceWithZeroBalance} customer={customer} appointments={appointments} />, { wrapper: TestRoot });

    expect(screen.getAllByText('Paid')[0]).toBeInTheDocument();
  });

  it('renders past due balance when balance is not 0', () => {
    render(<InvoiceCard invoice={invoice} customer={customer} appointments={appointments} />, { wrapper: TestRoot });

    expect(screen.getAllByText('$20.00 PAST-DUE')[0]).toBeInTheDocument();
  });
  it('renders customer data time service correctly', async () => {
    const { rerender } = render(<InvoiceCard invoice={invoice} customer={customer} appointments={appointments} />, { wrapper: TestRoot });
    fireEvent.click(screen.getByTestId('toggle-button'));

    expect(screen.getByTestId('customer-date-time-service-value')).toHaveTextContent('');
    rerender(
      <InvoiceCard
        invoice={{
          ...invoice,
          attributes: {
            ...invoice.attributes,
            appointmentDate: '2024-01-31T12:30:00',
          },
        }}
        customer={customer}
        appointments={appointments}
      />
    );
    await waitFor(() => expect(screen.getByText(/January 31, 2024 @ PM/)).toBeInTheDocument());
    rerender(
      <InvoiceCard
        invoice={{
          ...invoice,
          attributes: {
            ...invoice.attributes,
            appointmentDate: '2024-01-31T08:30:00',
          },
        }}
        customer={customer}
        appointments={appointments}
      />
    );
    await waitFor(() => expect(screen.getByText(/January 31, 2024 @ AM/)).toBeInTheDocument());
  });
});
