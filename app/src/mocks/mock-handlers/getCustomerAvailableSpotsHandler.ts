import { rest } from 'msw';
import { getCustomerAvailableSpotsResponse } from 'mocks/responseMocks';
import { generateApiUrlByVersion } from 'services/CustomerService';

const url = `${generateApiUrlByVersion(2)}/customer/:accountNumber/spots`;

const defaultHandler = rest.get(url, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(getCustomerAvailableSpotsResponse));
});
const noAvailableSpotsHandler = rest.get(url, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json({ data: [] }));
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

export const getCustomerAvailableSpotsHandler = {
  defaultHandler,
  unauthorisedHandler,
  errorHandler,
  noAvailableSpotsHandler,
};
