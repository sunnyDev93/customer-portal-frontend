import { rest } from 'msw';
import { generateApiUrlByVersion } from 'services/CustomerService';

const url = (apiVersion = 1) =>
  `${generateApiUrlByVersion(apiVersion)}/${apiVersion === 2 ? 'customer' : 'user/accounts'}/:accountId/paymentprofiles/:paymentProfileId`;

const defaultHandler = rest.delete(url(), (req, res, ctx) => {
  return res(ctx.status(204));
});

const unauthorisedHandler = rest.delete(url(), (req, res, ctx) => res(ctx.status(401)));

const errorHandler = rest.delete(url(), (req, res, ctx) =>
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

export const removeCustomerPaymentProfileHandler = {
  defaultHandler,
  unauthorisedHandler,
  errorHandler,
};
