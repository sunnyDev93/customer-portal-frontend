import { setupServer } from 'msw/node';
import * as handlers from './mock-handlers';
import type { RestHandler } from 'msw';

type AppHandler = Record<string, RestHandler>;
type HandlerScopes = Record<string, AppHandler>;
type RegisteredHandlers = Record<string, string[]>;

const registeredHandlers: RegisteredHandlers = {};

const registerHandlers = (handlers: HandlerScopes) => {
  const handlerScopes = Object.keys(handlers);

  return handlerScopes.map(scope => {
    registeredHandlers[scope] = Object.keys(handlers[scope]);

    return handlers[scope]['defaultHandler'];
  });
};

export const server = setupServer(...registerHandlers(handlers));
