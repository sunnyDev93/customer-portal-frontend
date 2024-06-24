import { rest } from 'msw';
import { getCustomerPaymentProfilesResponse, getCustomerPaymentProfilesResponseV2 } from 'mocks/responseMocks';
import { generateApiUrlByVersion } from 'services/CustomerService';

const url = (apiVersion: number) => `${generateApiUrlByVersion(apiVersion)}/customer/:accountId/paymentprofiles`;

const defaultHandler = rest.get(url(1), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(getCustomerPaymentProfilesResponse));
});
const withAutoPayExpiredHandler = rest.get(url(1), (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      ...getCustomerPaymentProfilesResponse,
      '5078812': {
        ...getCustomerPaymentProfilesResponse['5078812'],
        isExpired: true,
      },
    })
  );
});
const defaultHandlerV2 = rest.get(url(2), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(getCustomerPaymentProfilesResponseV2));
});

const unauthorisedHandler = rest.get(url(1), (req, res, ctx) => res(ctx.status(401)));

const badRequestHandler = rest.get(url(1), (req, res, ctx) =>
  res(
    ctx.status(400),
    ctx.json({
      success: false,
      error: {
        message: 'Bad Request',
        code: 400,
      },
    })
  )
);
const errorHandler = rest.get(url(1), (req, res, ctx) =>
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
const errorHandlerV2 = rest.get(url(2), (req, res, ctx) =>
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

export const getCustomerPaymentProfilesHandler = {
  defaultHandler,
  withAutoPayExpiredHandler,
  defaultHandlerV2,
  unauthorisedHandler,
  badRequestHandler,
  errorHandler,
  errorHandlerV2,
};
