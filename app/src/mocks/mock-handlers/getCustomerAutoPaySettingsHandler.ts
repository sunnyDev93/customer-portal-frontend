import { rest } from 'msw';
import { baseURL } from 'services/config';
import { getCustomerAutoPaySettingsResponse, getCustomerAutoPaySettingsResponseV2 } from 'mocks/responseMocks';
import { generateApiUrlByVersion } from 'services/CustomerService';

const url = `${baseURL}/customer/:accountId/autopay`;

const defaultHandler = rest.get(url, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(getCustomerAutoPaySettingsResponse));
});
const defaultHandlerV2 = rest.get(`${generateApiUrlByVersion(2)}/customer/:accountId/autopay`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(getCustomerAutoPaySettingsResponseV2));
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

export const getCustomerAutoPaySettingsHandler = {
  defaultHandler,
  defaultHandlerV2,
  unauthorisedHandler,
  errorHandler,
};
