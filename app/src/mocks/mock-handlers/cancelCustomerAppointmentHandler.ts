import { rest } from 'msw';
import { baseURL } from 'services/config';

const url = `${baseURL}/customer/:accountId/appointments/:appointmentId`;

const defaultHandler = rest.delete(url, (req, res, ctx) => {
  return res(ctx.status(204));
});

const unauthorisedHandler = rest.delete(url, (req, res, ctx) => res(ctx.status(401)));

const errorHandler = rest.delete(url, (req, res, ctx) =>
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

export const cancelCustomerAppointmentHandler = {
  defaultHandler,
  unauthorisedHandler,
  errorHandler,
};
