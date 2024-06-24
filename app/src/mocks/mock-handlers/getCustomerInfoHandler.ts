import { rest } from 'msw';
import { baseURL } from 'services/config';
import { getCustomerInfoResponse } from 'mocks/responseMocks';

const url = `${baseURL}/customer/:accountId`;

const defaultHandler = rest.get(url, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(getCustomerInfoResponse));
});

const unauthorisedHandler = rest.get(url, (req, res, ctx) => res(ctx.status(401)));

const errorHandler = rest.get(url, (req, res, ctx) =>
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

export const getCustomerInfoHandler = {
  defaultHandler,
  unauthorisedHandler,
  errorHandler,
};
