import { rest } from 'msw';
import { createCustomerPaymentResponse } from 'mocks/responseMocks';
import { baseURL } from 'services/config';

const url = `${baseURL}/customer/:accountId/payments`;

const defaultHandler = rest.post(url, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(createCustomerPaymentResponse));
});

const unauthorisedHandler = rest.post(url, (req, res, ctx) => res(ctx.status(401)));

const errorHandler = rest.post(url, (req, res, ctx) =>
  res(
    ctx.status(500),
    ctx.json({
      success: false,
      error: {
        message: 'Internal server error',
        code: 500,
      },
    })
  )
);
const paymentRequiredErrorHandler = rest.post(url, (req, res, ctx) =>
  res(
    ctx.status(402),
    ctx.json({
      success: false,
      error: {
        message: 'Payment Required error',
        code: 402,
      },
    })
  )
);
const badRequestErrorHandler = rest.post(url, (req, res, ctx) =>
  res(
    ctx.status(400),
    ctx.json({
      success: false,
      error: {
        message: 'Bad request error',
        code: 400,
      },
    })
  )
);

export const createCustomerPaymentProfilesHandler = {
  defaultHandler,
  unauthorisedHandler,
  errorHandler,
  paymentRequiredErrorHandler,
  badRequestErrorHandler,
};
