import { rest } from 'msw';
import { getCustomerProductUpgradesResponse } from 'mocks/responseMocks';
import { baseURL } from 'services/config';

const url = `${baseURL}/customer/:accountNumber/upgrades`;

const defaultHandler = rest.get(url, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(getCustomerProductUpgradesResponse));
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

export const getCustomerProductUpgradesHandler = {
  defaultHandler,
  unauthorisedHandler,
  errorHandler,
};
