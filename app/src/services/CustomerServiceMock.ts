const getTransactionBySlugResponse = {
  id: 993326,
  slug: 'TG25lX',
  account_number: 2550260,
  transaction_setup_id: 'string',
  status: 'initiated',
  last_4: 'string',
  billing_name: 'string',
  billing_address_line_1: 'string',
  billing_address_line_2: 'string',
  billing_city: 'string',
  billing_state: 'string',
  billing_zip: 'string',
  created_at: '2022-06-15T04:17:51.416Z',
  updated_at: '2022-06-15T04:17:51.416Z',
  deleted_at: '2022-06-15T04:17:51.416Z',
  customer: {
    id: 993326,
    name: 'Dan',
    first_name: 'Dan',
    last_name: 'Gracious',
    email: 'dang@test.com',
    phone_number: '2587415877',
    status_name: 'Active',
    office_id: 1,
    officeID: 1,
    is_phone_number_valid: false,
    is_email_valid: false,
  },
};

export const getTransactionBySlugMock = {
  success: {
    status: 'success',
    data: { ...getTransactionBySlugResponse },
  },
  completed: {
    status: 200,
    data: { ...getTransactionBySlugResponse, status: 'complete' },
  },
  failed_authorization: {
    status: 200,
    data: { ...getTransactionBySlugResponse, status: 'failed_authorization' },
  },
  invalid_slug: {
    status: 404,
    data: {},
  },
  expired_link: {
    status: 410,
    data: {},
  },
};

export const submitCustomerBillingInfoMock = {
  success: {
    status: 200,
    data: {
      url: 'http://localhost:8000/external-credit-card-link/12345',
    },
  },
  fail: {
    status: 500,
    data: {},
  },
  validation_error: {
    status: 422,
    data: {
      errors: {
        billing_name: ['The billing name field is required.'],
      },
    },
  },
};

export const submitCustomerACHInformationMock = {
  success: {
    status: 200,
    data: {},
  },
  fail: {
    status: 500,
    data: {},
  },
  validation_error: {
    status: 422,
    data: {
      errors: {
        account_number: ['Account Numbers must match'],
      },
    },
  },
};
