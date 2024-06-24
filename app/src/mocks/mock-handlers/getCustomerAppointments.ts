import { rest } from 'msw';
import { baseURL } from 'services/config';
import { getCustomerAppointmentsResponse } from 'mocks/responseMocks';

const url = `${baseURL}/customer/:accountId/appointments`;

const defaultHandler = rest.post(url, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(getCustomerAppointmentsResponse));
});

const noDataHandler = rest.post(url, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json({ data: [] }));
});

const unauthorisedHandler = rest.get(url, (req, res, ctx) => res(ctx.status(401)));

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

export const getCustomerAppointments = {
  defaultHandler,
  unauthorisedHandler,
  errorHandler,
  noDataHandler,
};