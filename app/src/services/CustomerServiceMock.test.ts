import {
    getTransactionBySlugMock,
    submitCustomerBillingInfoMock,
    submitCustomerACHInformationMock,
  } from './CustomerServiceMock'; // Replace with the correct path to your mock file
  
  // Example Jest test suite for the provided mock data
  describe('Mock API Tests', () => {
    describe('getTransactionBySlugMock', () => {
      test('should return success response', () => {
        expect(getTransactionBySlugMock.success.status).toBe('success');
        expect(getTransactionBySlugMock.success.data.status).toBe('initiated');
      });
  
      test('should return complete response', () => {
        expect(getTransactionBySlugMock.completed.data.status).toBe('complete');
      });
  
      test('should return failed authorization response', () => {
        expect(getTransactionBySlugMock.failed_authorization.data.status).toBe('failed_authorization');
      });
  
      test('should return 404 for invalid slug', () => {
        expect(getTransactionBySlugMock.invalid_slug.status).toBe(404);
      });
  
      test('should return 410 for expired link', () => {
        expect(getTransactionBySlugMock.expired_link.status).toBe(410);
      });
    });
  
    describe('submitCustomerBillingInfoMock', () => {
      test('should return success response with a URL', () => {
        expect(submitCustomerBillingInfoMock.success.status).toBe(200);
        expect(submitCustomerBillingInfoMock.success.data.url).toBeDefined();
      });
  
      test('should return 500 for fail response', () => {
        expect(submitCustomerBillingInfoMock.fail.status).toBe(500);
      });
  
      test('should return validation error with specific message', () => {
        expect(submitCustomerBillingInfoMock.validation_error.status).toBe(422);
        expect(submitCustomerBillingInfoMock.validation_error.data.errors.billing_name).toContain('The billing name field is required.');
      });
    });
  
    describe('submitCustomerACHInformationMock', () => {
      test('should return success response', () => {
        expect(submitCustomerACHInformationMock.success.status).toBe(200);
      });
  
      test('should return 500 for fail response', () => {
        expect(submitCustomerACHInformationMock.fail.status).toBe(500);
      });
  
      test('should return validation error with specific message', () => {
        expect(submitCustomerACHInformationMock.validation_error.status).toBe(422);
        expect(submitCustomerACHInformationMock.validation_error.data.errors.account_number).toContain('Account Numbers must match');
      });
    });
  });
  