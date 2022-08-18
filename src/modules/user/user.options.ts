import { RSOWH } from '../../types';
import { errorHandler } from '../../utils';
import { loginHandler, registerHandler } from './user.controller';
import { $ref, LoginRoute, RegisterRoute } from './user.schema';

export const registerOpts: RSOWH<RegisterRoute> = {
  schema: {
    body: $ref('registerSchema'),
    response: {
      201: $ref('replySchema'),
    },
  },
  handler: registerHandler,
  errorHandler,
};

export const loginOpts: RSOWH<LoginRoute> = {
  schema: {
    body: $ref('loginSchema'),
    response: {
      200: $ref('replySchema'),
    },
  },
  handler: loginHandler,
  errorHandler,
};

export type RegisterHandler = typeof registerOpts.handler;
export type LoginHandler = typeof loginOpts.handler;
