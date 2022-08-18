import { RSOWH } from '../../types';
import { errorHandler } from '../../utils';
import { createPartyHandler } from './party.controller';
import { $ref, CreatePartyRoute } from './party.schema';

export const createPartyOpts: RSOWH<CreatePartyRoute> = {
  schema: {
    body: $ref('createPartySchema'),
    response: {
      201: $ref('replySchema'),
    },
  },
  handler: createPartyHandler,
  errorHandler,
};

export type CreatePartyHandler = typeof createPartyOpts.handler;
