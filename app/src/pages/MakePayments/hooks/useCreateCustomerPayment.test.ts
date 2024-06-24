import { TestRoot } from 'config/test/react-query';
import { createCustomerPaymentProfilesHandler } from 'mocks/mock-handlers';
import { server } from 'mocks/server';
import { useCreateCustomerPayment } from 'pages/MakePayments/hooks/useCreateCustomerPayment';
import { act, waitFor, renderHook } from '@testing-library/react';

const payload = {
  amount_cents: 993326,
  payment_method: 'CC',
  payment_profile_id: 3993326,
};
const accountId = '123';

describe('useCreateCustomerPayment', () => {
  describe('when request succeeded', () => {
    it('should create customer payment', async () => {
      const { result } = renderHook(() => useCreateCustomerPayment(), { wrapper: TestRoot });

      act(() => {
        result.current.createCustomerPaymentMutation({ accountId, payload });
      });

      await waitFor(() => {
        expect(result.current.isSubmittingForm).toBe(false);
      });
    });
  });

  describe('when request failed', () => {
    it('should redirect to 500 error page', async () => {
      server.use(createCustomerPaymentProfilesHandler.errorHandler);
      const url = '/server-error';
      const { result } = renderHook(() => useCreateCustomerPayment(), { wrapper: TestRoot });

      act(() => {
        result.current.createCustomerPaymentMutation({ accountId, payload });
      });

      await waitFor(() => {
        expect(result.current.isSubmittingForm).toBe(false);
      });
      await waitFor(() => {
        expect(window.location.href).toBe(url);
      });
    });
  });
});
