import { rest } from 'msw';
import { baseURL } from 'services/config';
import { getCustomerAppointmentsHistoryResponse, getCustomerUpcomingAppointmentResponse } from 'mocks/responseMocks';

const url = `${baseURL}/customer/:accountId/appointments/history`;

const defaultHandler = rest.get(url, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(getCustomerAppointmentsHistoryResponse));
});
const noAppointmentHandler = rest.get(url, (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      ...getCustomerAppointmentsHistoryResponse,
      data: [],
    })
  );
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

export const getCustomerAppointmentsHistory = {
  defaultHandler,
  noAppointmentHandler,
  unauthorisedHandler,
  errorHandler,
};
