import { rest } from 'msw';
import { getCustomerProductsResponse } from 'mocks/responseMocks';
import { baseURL } from 'services/config';

const url = `${baseURL}/customer/:accountNumber/products`;

const defaultHandler = rest.get(url, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(getCustomerProductsResponse));
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

export const getCustomerProductsHandler = {
  defaultHandler,
  unauthorisedHandler,
  errorHandler,
};
