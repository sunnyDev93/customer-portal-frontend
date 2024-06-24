import { rest } from 'msw';
import { baseURL } from 'services/config';
import { getCustomerSpotsResponse } from 'mocks/responseMocks';

const url = `${baseURL}/customer/:accountNumber/spots`;

const defaultHandler = rest.post(url, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(getCustomerSpotsResponse));
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

export const getCustomerSpotsHandler = {
  defaultHandler,
  unauthorisedHandler,
  errorHandler,
};
