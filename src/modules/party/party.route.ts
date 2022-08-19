import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { CreatePartyHandler } from './party.controller';
import { CreatePartySchema } from './party.schema';

const partyRoutes: FastifyPluginAsyncTypebox = async (route) => {
  route.get('/', () => 'join party');
  route.post('/', {
    schema: CreatePartySchema,
    handler: CreatePartyHandler,
  });
};

export default partyRoutes;
