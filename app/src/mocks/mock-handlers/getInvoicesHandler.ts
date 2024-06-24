import { rest } from 'msw';
import { baseURL } from 'services/config';
import { getInvoicesResponse } from 'mocks/responseMocks';

const url = `${baseURL}/customer/:accountId/invoices`;

const defaultHandler = rest.get(url, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(getInvoicesResponse));
});
const noActiveInvoicesHandler = rest.get(url, (req, res, ctx) => {
  const noActiveInvoices = {
    ...getInvoicesResponse,
    data: [{ ...getInvoicesResponse.data[0], attributes: { ...getInvoicesResponse.data[0].attributes, active: 0 } }],
  };
  return res(ctx.status(200), ctx.json(noActiveInvoices));
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

export const getInvoicesHandler = {
  defaultHandler,
  noActiveInvoicesHandler,
  unauthorisedHandler,
  errorHandler,
};
