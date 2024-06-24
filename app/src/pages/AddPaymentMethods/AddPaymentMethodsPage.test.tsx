import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import AddPaymentMethodsPage from './AddPaymentMethodsPage';
import { useTrackingClick } from '../../shared/hooks/useTrackingClick';
import { TestRoot } from '../../config/test/react-query';

const mockTrackClick = jest.fn();

jest.mock('configcat-react', () => ({
  useFeatureFlag: () => ({ value: true }),
}));
beforeEach(() => {
  (useTrackingClick as jest.Mock).mockReturnValue({
    trackClick: mockTrackClick,
  });
});
describe('AddPaymentMethodsPage', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('Render component', () => {
    it('should render ACH Form by default', () => {
      render(<AddPaymentMethodsPage />, {
        wrapper: TestRoot,
      });
      expect(screen.getByText(/Billing Address/i)).toBeTruthy();
    });

    it('should render CC Form after switch', () => {
      render(<AddPaymentMethodsPage />, {
        wrapper: TestRoot,
      });
      fireEvent.click(screen.getByTestId('to-cc-form'));
      expect(screen.getByText(/Credit Card Billing Address/i)).toBeTruthy();
    });

    it('should render CC Form after click Add a Credit Card Instead', () => {
      render(<AddPaymentMethodsPage />, {
        wrapper: TestRoot,
      });
      fireEvent.click(screen.getByText('Add a Credit Card Instead'));
      expect(screen.getByText(/Credit Card Billing Address/i)).toBeTruthy();
    });
  });

  describe('Handle submit', () => {
    // it('should show error required', () => {
    //   render(<AddPaymentMethodsPage />, {
    //     wrapper: TestRoot,
    //   });
    //   fireEvent.submit(screen.getByTestId('Save Account'));
    //   expect(screen.getAllByDisplayValue(/This field is required/i).length).toEqual(9);
    // });
  });
});
