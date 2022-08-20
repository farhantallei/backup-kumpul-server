import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { CreatePartyHandler, JoinPartyHandler } from './party.controller';
import { CreatePartySchema, JoinPartySchema } from './party.schema';

const partyRoutes: FastifyPluginAsyncTypebox = async (route) => {
  route.post('/', {
    schema: CreatePartySchema,
    handler: CreatePartyHandler,
  });
  route.post('/:partyId', {
    schema: JoinPartySchema,
    handler: JoinPartyHandler,
  });
};

export default partyRoutes;
