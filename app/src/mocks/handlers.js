import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost/api/v1/customer/mockedUser', (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.json({
        id: 993326,
        name: 'John Doe',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@doe.com',
        phone_number: '2587415877',
        status_name: 'Active',
        office_id: 1,
        officeID: 1,
        is_phone_number_valid: false,
        is_email_valid: false,
        auto_pay: false,
        auto_pay_profile_last_four: '1234',
        balance_cents: 2000,
      })
    );
  }),

  rest.get('http://localhost/api/v1/customer/mockedUser/paymentprofile', (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.json([
        {
          id: 993326,
          customer_id: 2550260,
          description: 'This is description',
          billing_name: 'CC For Payment',
          payment_method: 'CC',
          lastFour: '1234',
        },

        {
          id: 993327,
          customer_id: 2550260,
          description: 'Payment Profile 2',
          billing_name: 'John Doe',
          payment_method: 'ACH',
          lastFour: '2525',
        },
      ])
    );
  }),

  rest.post('http://localhost/api/v1/customer/mockedUser/payments', (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.json({
        id: 993326,
        customer_id: 2550260,
        amount_cents: 4995,
        payment_method: 'CC',
        date: '2022-06-22 03:40:54',
      })
    );
  }),

  // NEW CREDIT CARD
  rest.get('http://localhost/api/v1/transaction-setup/mockedSlug', (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.json({
        id: 993326,
        slug: 'TG25lX',
        account_number: 2550260,
        transaction_setup_id: 'string',
        status: 'initiated',
        last_4: '4321',
        billing_name: 'John Doe',
        billing_address_line_1: '1234 Main St',
        billing_address_line_2: 'Unit 2',
        billing_city: 'Orlando',
        billing_state: 'FL',
        billing_zip: '34787',
        auto_pay: false,
        created_at: '2022-07-27T14:37:40.408Z',
        updated_at: '2022-07-27T14:37:40.408Z',
        deleted_at: '2022-07-27T14:37:40.408Z',
        customer: {
          id: 993326,
          name: 'John Doe',
          first_name: 'John',
          last_name: 'Doe',
          email: 'john@doe.com',
          phone_number: '2587415877',
          status_name: 'Active',
          office_id: 1,
          officeID: 1,
          is_phone_number_valid: false,
          is_email_valid: false,
          auto_pay: false,
          auto_pay_profile_last_four: '1234',
          balance_cents: 1099,
        },
      })
    );
  }),
];
