import { rest } from 'msw';
import { magicLinkTokenResponse } from 'mocks/responseMocks';
import { baseURL } from 'services/config';

const url = `${baseURL}/magicjwt`;

const defaultHandler = rest.post(url, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(magicLinkTokenResponse));
});
const expiredTokenHandler = rest.post(url, (req, res, ctx) => {
  return res(ctx.status(461));
});
const invalidTokenHandler = rest.post(url, (req, res, ctx) => {
  return res(ctx.status(460));
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

export const verifyMagicLinkTokenHandler = {
  defaultHandler,
  expiredTokenHandler,
  invalidTokenHandler,
  unauthorisedHandler,
  errorHandler,
};
