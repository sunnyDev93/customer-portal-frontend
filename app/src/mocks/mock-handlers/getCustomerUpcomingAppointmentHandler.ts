import { rest } from 'msw';
import { baseURL } from 'services/config';
import { getCustomerUpcomingAppointmentResponse } from 'mocks/responseMocks';

const url = `${baseURL}/customer/:accountId/appointments/upcoming`;

const defaultHandler = rest.get(url, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(getCustomerUpcomingAppointmentResponse));
});

const notInitialAppointmentHandler = rest.get(url, (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      ...getCustomerUpcomingAppointmentResponse,
      data: [
        {
          ...getCustomerUpcomingAppointmentResponse.data[0],
          attributes: { ...getCustomerUpcomingAppointmentResponse.data[0].attributes, isInitial: false },
        },
      ],
    })
  );
});
const cancelableAppointmentHandler = rest.get(url, (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      ...getCustomerUpcomingAppointmentResponse,
      data: [
        {
          ...getCustomerUpcomingAppointmentResponse.data[0],
          attributes: { ...getCustomerUpcomingAppointmentResponse.data[0].attributes, canBeCanceled: true, isInitial: false },
        },
      ],
    })
  );
});

const noUpcomingAppointmentHandler = rest.get(url, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json({ ...getCustomerUpcomingAppointmentResponse, data: [] }));
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

export const getCustomerUpcomingAppointmentHandler = {
  defaultHandler,
  notInitialAppointmentHandler,
  cancelableAppointmentHandler,
  noUpcomingAppointmentHandler,
  unauthorisedHandler,
  errorHandler,
};
