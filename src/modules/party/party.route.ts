import { FastifyPluginAsync } from 'fastify';
import { createPartyOpts } from './party.options';

const partyRoutes: FastifyPluginAsync = async (route) => {
  route.get('/', () => 'join party');
  route.post('/', createPartyOpts);
};

export default partyRoutes;
