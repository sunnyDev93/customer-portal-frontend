import { rest } from 'msw';
import { generateApiUrlByVersion } from 'services/CustomerService';

const url = `${generateApiUrlByVersion(2)}/customer/:accountNumber/appointments`;

const defaultHandler = rest.post(url, (req, res, ctx) => {
  return res(ctx.status(201));
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

export const scheduleCustomerAppointmentHandler = {
  defaultHandler,
  unauthorisedHandler,
  errorHandler,
};
